 // src/lib/rbac.ts
 /* eslint-disable @typescript-eslint/no-explicit-any */
import { UserPayload } from './auth';
import { query } from './db';

// Define role hierarchy
export const ROLES = {
  ADMIN: 'admin',
  EXAM_MASTER: 'exam_master',
  DEAN: 'dean',
  HOD: 'hod',
  LECTURER: 'lecturer',
} as const;

// Define permissions for each role
export const ROLE_PERMISSIONS = {
  admin: [
    'manage_users',
    'manage_colleges',
    'manage_departments',
    'manage_courses',
    'view_all_papers',
    'manage_system',
  ],
  exam_master: ['view_all_papers', 'manage_printing', 'publish_papers', 'manage_exam_schedules'],
  dean: ['view_college_papers', 'approve_papers', 'view_reports', 'manage_college_courses'],
  hod: [
    'manage_department_courses',
    'create_study_units',
    'approve_questions',
    'approve_papers',
    'grant_lecturer_permissions',
    'view_department_papers',
    'create_questions',
  ],
  lecturer: ['create_questions', 'create_papers', 'view_own_papers', 'edit_own_questions'],
};

// Check if user has specific permission
export function hasPermission(user: UserPayload | null, permission: string): boolean {
  if (!user) return false;

  const permissions = ROLE_PERMISSIONS[user.role] || [];
  return permissions.includes(permission);
}

// Check if user has any of the specified permissions
export function hasAnyPermission(user: UserPayload | null, permissions: string[]): boolean {
  if (!user) return false;

  return permissions.some((permission) => hasPermission(user, permission));
}

// Check if user has all specified permissions
export function hasAllPermissions(user: UserPayload | null, permissions: string[]): boolean {
  if (!user) return false;

  return permissions.every((permission) => hasPermission(user, permission));
}

// Check if user can access a specific course
export async function canAccessCourse(userId: number, courseId: number): Promise<boolean> {
  try {
    // Get user details
    const users = await query<any[]>(
      `SELECT role, department_id, college_id FROM users WHERE id = ? LIMIT 1`,
      [userId]
    );

    if (!users || users.length === 0) return false;
    const user = users[0];

    // Admin can access everything
    if (user.role === 'admin') return true;

    // Get course details
    const courses = await query<any[]>(
      `SELECT department_id, college_id FROM courses WHERE id = ? LIMIT 1`,
      [courseId]
    );

    if (!courses || courses.length === 0) return false;
    const course = courses[0];

    // Check based on role
    switch (user.role) {
      case 'exam_master':
        return true; // Exam master can access all courses

      case 'dean':
        return user.college_id === course.college_id;

      case 'hod':
        return user.department_id === course.department_id;

      case 'lecturer':
        // Check if lecturer has permission for this course
        const permissions = await query<any[]>(
          `SELECT id FROM lecturer_permissions 
           WHERE lecturer_id = ? AND course_id = ? AND is_active = TRUE
           LIMIT 1`,
          [userId, courseId]
        );
        return permissions && permissions.length > 0;

      default:
        return false;
    }
  } catch (error) {
    console.error('Error checking course access:', error);
    return false;
  }
}

// Check if user can approve papers
export async function canApprovePaper(userId: number, paperId: number): Promise<boolean> {
  try {
    // Get user and paper details
    const [users, papers] = await Promise.all([
      query<any[]>(`SELECT role, department_id, college_id FROM users WHERE id = ? LIMIT 1`, [
        userId,
      ]),
      query<any[]>(
        `SELECT ep.*, c.department_id, c.college_id 
         FROM exam_papers ep
         JOIN courses c ON ep.course_id = c.id
         WHERE ep.id = ? LIMIT 1`,
        [paperId]
      ),
    ]);

    if (!users || users.length === 0 || !papers || papers.length === 0) {
      return false;
    }

    const user = users[0];
    const paper = papers[0];

    // Check based on role and paper status
    switch (user.role) {
      case 'hod':
        return (
          user.department_id === paper.department_id &&
          ['submitted', 'hod_review'].includes(paper.status)
        );

      case 'dean':
        return (
          user.college_id === paper.college_id &&
          ['hod_approved', 'dean_review'].includes(paper.status)
        );

      case 'admin':
        return true;

      default:
        return false;
    }
  } catch (error) {
    console.error('Error checking paper approval access:', error);
    return false;
  }
}

// Check if user can edit exam paper
export async function canEditPaper(userId: number, paperId: number): Promise<boolean> {
  try {
    const papers = await query<any[]>(
      `SELECT created_by, status FROM exam_papers WHERE id = ? LIMIT 1`,
      [paperId]
    );

    if (!papers || papers.length === 0) return false;
    const paper = papers[0];

    // Can only edit if user created it and it's still in draft
    return paper.created_by === userId && paper.status === 'draft';
  } catch (error) {
    console.error('Error checking paper edit access:', error);
    return false;
  }
}

// Check if lecturer has permission to add questions to a course
export async function hasQuestionPermission(
  lecturerId: number,
  courseId: number
): Promise<boolean> {
  try {
    // Check if lecturer or higher role
    const users = await query<any[]>(`SELECT role FROM users WHERE id = ? LIMIT 1`, [lecturerId]);

    if (!users || users.length === 0) return false;
    const user = users[0];

    // HOD, Dean, Admin can add questions to any course in their scope
    if (['hod', 'dean', 'admin'].includes(user.role)) {
      return await canAccessCourse(lecturerId, courseId);
    }

    // Lecturers need explicit permission
    const permissions = await query<any[]>(
      `SELECT id FROM lecturer_permissions 
       WHERE lecturer_id = ? AND course_id = ? 
       AND can_add_questions = TRUE 
       AND is_active = TRUE
       AND (expires_at IS NULL OR expires_at > NOW())
       LIMIT 1`,
      [lecturerId, courseId]
    );

    return permissions && permissions.length > 0;
  } catch (error) {
    console.error('Error checking question permission:', error);
    return false;
  }
}

// Get HOD for a department
export async function getDepartmentHOD(departmentId: number): Promise<number | null> {
  try {
    const hods = await query<any[]>(
      `SELECT id FROM users 
       WHERE department_id = ? AND role = 'hod' AND is_active = TRUE
       LIMIT 1`,
      [departmentId]
    );

    return hods && hods.length > 0 ? hods[0].id : null;
  } catch (error) {
    console.error('Error getting department HOD:', error);
    return null;
  }
}

// Get Dean for a college
export async function getCollegeDean(collegeId: number): Promise<number | null> {
  try {
    const deans = await query<any[]>(
      `SELECT id FROM users 
       WHERE college_id = ? AND role = 'dean' AND is_active = TRUE
       LIMIT 1`,
      [collegeId]
    );

    return deans && deans.length > 0 ? deans[0].id : null;
  } catch (error) {
    console.error('Error getting college dean:', error);
    return null;
  }
}
