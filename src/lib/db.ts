// src/lib/db.ts
/* eslint-disable @typescript-eslint/no-explicit-any */
import mysql from 'mysql2/promise';

// Database connection pool configuration
const poolConfig = {
  host: process.env.DB_HOST || 'localhost',
  // port: parseInt(process.env.DB_PORT || '3306'),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'uems',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
};

// Create connection pool
let pool: mysql.Pool;

export function getPool(): mysql.Pool {
  if (!pool) {
    pool = mysql.createPool(poolConfig);
  }
  return pool;
}

// Database query helper with error handling
export async function query<T = any>(sql: string, params?: any[]): Promise<T> {
  try {
    const pool = getPool();
    const [rows] = await pool.execute(sql, params);
    return rows as T;
  } catch (error) {
    console.error('Database query error:', error);
    throw new Error('Database query failed');
  }
}

// Transaction helper
export async function transaction<T>(
  callback: (connection: mysql.PoolConnection) => Promise<T>
): Promise<T> {
  const pool = getPool();
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();
    const result = await callback(connection);
    await connection.commit();
    return result;
  } catch (error) {
    await connection.rollback();
    console.error('Transaction error:', error);
    throw error;
  } finally {
    connection.release();
  }
}

// Test database connection
export async function testConnection(): Promise<boolean> {
  try {
    const pool = getPool();
    const connection = await pool.getConnection();
    await connection.ping();
    connection.release();
    console.log('✅ Database connection successful');
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    return false;
  }
}

// Close pool (useful for graceful shutdown)
export async function closePool(): Promise<void> {
  if (pool) {
    await pool.end();
    console.log('Database pool closed');
  }
}

// Type definitions for common queries
export interface QueryResult {
  affectedRows: number;
  insertId: number;
  warningStatus: number;
}

// =====================================================
// ORGANIZATIONAL STRUCTURE TYPES
// =====================================================

export interface College {
  id: number;
  code: string;
  name: string;
  abbrv: string;
  description: string | null;
  created_at: Date;
  updated_at: Date;
}

export interface Department {
  id: number;
  college_id: number;
  code: string;
  name: string;
  abbrv: string;
  description: string | null;
  created_at: Date;
  updated_at: Date;
}

export interface Programme {
  id: number;
  code: string;
  name: string;
  level: 'diploma' | 'bachelors' | 'masters' | 'phd';
  duration_years: number | null;
  department_id: number | null;
  college_id: number | null;
  description: string | null;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

// =====================================================
// USER MANAGEMENT TYPES
// =====================================================

export interface User {
  id: number;
  email: string;
  password_hash: string;
  first_name: string;
  last_name: string;
  role: 'lecturer' | 'hod' | 'dean' | 'exam_master' | 'admin';
  department_id: number | null;
  college_id: number | null;
  phone: string | null;
  is_active: boolean;
  last_login: Date | null;
  created_at: Date;
  updated_at: Date;
}

export interface Session {
  id: number;
  session_id: string;
  user_id: number;
  expires_at: Date;
  created_at: Date;
}

// =====================================================
// ACADEMIC CONTENT TYPES
// =====================================================

export interface Course {
  id: number;
  code: string;
  title: string;
  level: number | null;
  semester: number | null;
  credit_units: number | null;
  college_id: number | null;
  department_id: number | null;
  hod_id: number | null;
  description: string | null;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface StudyUnit {
  id: number;
  course_id: number;
  code: string;
  name: string;
  description: string | null;
  sequence_order: number;
  learning_outcomes: string | null;
  created_by: number;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

// =====================================================
// PERMISSIONS TYPES
// =====================================================

export interface LecturerPermission {
  id: number;
  lecturer_id: number;
  course_id: number;
  granted_by: number;
  can_add_questions: boolean;
  can_create_papers: boolean;
  can_edit_questions: boolean;
  granted_at: Date;
  expires_at: Date | null;
  is_active: boolean;
  notes: string | null;
}

// =====================================================
// QUESTION BANK TYPES
// =====================================================

export interface Question {
  id: number;
  course_id: number;
  study_unit_id: number | null;
  created_by: number;
  question_type: 'multiple_choice' | 'true_false' | 'short_answer' | 'essay' | 'practical' | 'case_study';
  difficulty_level: 'easy' | 'medium' | 'hard';
  question_text: string;
  options: string | null; // JSON string
  correct_answer: string | null;
  marks: number;
  time_allocation: number | null;
  learning_outcome: string | null;
  keywords: string | null;
  bloom_taxonomy: 'remember' | 'understand' | 'apply' | 'analyze' | 'evaluate' | 'create' | null;
  tags: string | null; // JSON string
  usage_count: number;
  is_active: boolean;
  approved_by: number | null;
  approved_at: Date | null;
  created_at: Date;
  updated_at: Date;
}

// =====================================================
// EXAM PAPER TYPES
// =====================================================

export interface ExamPaper {
  id: number;
  paper_code: string;
  course_id: number;
  created_by: number;
  exam_type: 'TEST' | 'CAT' | 'FINAL';
  academic_year: number;
  semester: number;
  exam_date: Date | null;
  duration: number | null;
  total_marks: number;
  instructions: string | null;
  status: 'draft' | 'submitted' | 'hod_review' | 'hod_approved' | 'hod_rejected' | 
          'dean_review' | 'dean_approved' | 'dean_rejected' | 
          'ready_for_print' | 'printing' | 'printed' | 'published';
  hod_id: number | null;
  hod_approved_at: Date | null;
  dean_id: number | null;
  dean_approved_at: Date | null;
  exam_master_id: number | null;
  printed_at: Date | null;
  print_quantity: number;
  submitted_at: Date | null;
  published_at: Date | null;
  version: number;
  is_locked: boolean;
  metadata: string | null; // JSON string
  created_at: Date;
  updated_at: Date;
}

export interface ExamPaperProgramme {
  id: number;
  exam_paper_id: number;
  programme_id: number;
  created_at: Date;
}

export interface ExamPaperQuestion {
  id: number;
  exam_paper_id: number;
  question_id: number;
  section: string;
  question_number: string;
  display_number: string | null;
  marks: number;
  sub_marks: string | null;
  is_required: boolean;
  is_choice: boolean;
  choice_group: string | null;
  sequence_order: number;
  parent_question_id: number | null;
  indentation_level: number;
  notes: string | null;
  created_at: Date;
  updated_at: Date;
}

// =====================================================
// WORKFLOW & APPROVALS TYPES
// =====================================================

export interface WorkflowHistory {
  id: number;
  exam_paper_id: number;
  action: 'created' | 'submitted' | 'hod_approved' | 'hod_rejected' | 
          'dean_approved' | 'dean_rejected' | 'ready_for_print' | 
          'printing_started' | 'printed' | 'published' | 'returned' | 'updated';
  from_status: string | null;
  to_status: string;
  actor_id: number;
  actor_role: string;
  comments: string | null;
  metadata: string | null; // JSON string
  created_at: Date;
}

export interface PaperComment {
  id: number;
  exam_paper_id: number;
  user_id: number;
  comment_type: 'feedback' | 'revision_request' | 'hod_approval_note' | 
                'dean_note' | 'print_instruction' | 'general';
  comment: string;
  is_resolved: boolean;
  parent_comment_id: number | null;
  created_at: Date;
  updated_at: Date;
}

// =====================================================
// NOTIFICATION TYPES
// =====================================================

export interface Notification {
  id: number;
  user_id: number;
  type: 'paper_submitted' | 'paper_approved' | 'paper_rejected' | 'paper_returned' |
        'permission_granted' | 'approval_required' | 'ready_for_print' | 
        'print_completed' | 'comment_added' | 'deadline_reminder' | 'general';
  title: string;
  message: string;
  related_paper_id: number | null;
  related_entity_type: string | null;
  related_entity_id: number | null;
  is_read: boolean;
  read_at: Date | null;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  action_url: string | null;
  metadata: string | null; // JSON string
  created_at: Date;
}

// =====================================================
// AUDIT & LOGGING TYPES
// =====================================================

export interface AuditLog {
  id: number;
  user_id: number | null;
  action: string;
  entity_type: string;
  entity_id: number | null;
  old_values: string | null; // JSON string
  new_values: string | null; // JSON string
  ip_address: string | null;
  user_agent: string | null;
  created_at: Date;
}

// =====================================================
// VIEW TYPES
// =====================================================

export interface HodPendingApproval {
  id: number;
  paper_code: string;
  status: string;
  exam_type: string;
  course_code: string;
  course_name: string;
  lecturer_name: string;
  submitted_at: Date | null;
  hod_id: number | null;
  department_name: string | null;
  programmes: string | null;
}

export interface PaperReadyForPrint {
  id: number;
  paper_code: string;
  status: string;
  exam_type: string;
  exam_date: Date | null;
  course_code: string;
  course_name: string;
  total_marks: number;
  duration: number | null;
  hod_approved_at: Date | null;
  print_quantity: number;
  department_name: string | null;
  college_name: string | null;
  programmes: string | null;
  programme_names: string | null;
}

export interface LecturerPermissionSummary {
  lecturer_id: number;
  lecturer_name: string;
  course_code: string;
  course_name: string;
  can_add_questions: boolean;
  can_create_papers: boolean;
  granted_at: Date;
  expires_at: Date | null;
  granted_by_name: string;
}

export interface PapersByStatusSummary {
  status: string;
  exam_type: string;
  count: number;
  oldest_paper: Date;
  newest_paper: Date;
}

export interface ProgrammeSummary {
  id: number;
  code: string;
  name: string;
  level: string;
  duration_years: number | null;
  department_name: string | null;
  college_name: string | null;
  total_exam_papers: number;
  is_active: boolean;
}

export interface PaperByProgramme {
  programme_code: string;
  programme_name: string;
  status: string;
  exam_type: string;
  academic_year: number;
  semester: number;
  course_code: string;
  course_title: string;
  paper_code: string;
  exam_date: Date | null;
  created_by_name: string;
}

export default getPool;