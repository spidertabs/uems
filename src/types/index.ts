/* eslint-disable @typescript-eslint/no-explicit-any */
// ============================================================
// UEMS Type Definitions
// ============================================================

// User & Authentication Types
export type UserRole = 'lecturer' | 'hod' | 'dean' | 'exam_master' | 'admin';

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  role: UserRole;
  department_id: number | null;
  college_id: number | null;
  phone: string | null;
  is_active: boolean;
  last_login: Date | null;
  created_at: Date;
  updated_at: Date;
}

export interface UserPayload {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  role: UserRole;
  department_id: number | null;
  college_id: number | null;
}

export interface AuthResponse {
  success: boolean;
  user?: UserPayload;
  token?: string;
  error?: string;
  message?: string;
}

// College & Department Types
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

// Course & Study Unit Types
export interface Course {
  id: number;
  code: string;
  title: string;
  level: number;
  semester: number;
  credit_units: number;
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

// Question Bank Types
export type QuestionType =
  | 'multiple_choice'
  | 'true_false'
  | 'short_answer'
  | 'essay'
  | 'practical'
  | 'case_study';

export type DifficultyLevel = 'easy' | 'medium' | 'hard';

export type BloomTaxonomy = 'remember' | 'understand' | 'apply' | 'analyze' | 'evaluate' | 'create';

export interface Question {
  id: number;
  course_id: number;
  study_unit_id: number | null;
  created_by: number;
  question_type: QuestionType;
  difficulty_level: DifficultyLevel;
  question_text: string;
  options: string[] | null; // JSON array for MCQs
  correct_answer: string | null;
  marks: number;
  time_allocation: number | null;
  learning_outcome: string | null;
  keywords: string | null;
  bloom_taxonomy: BloomTaxonomy | null;
  tags: string[] | null; // JSON array
  usage_count: number;
  is_active: boolean;
  approved_by: number | null;
  approved_at: Date | null;
  created_at: Date;
  updated_at: Date;
}

export interface QuestionFormData {
  course_id: number;
  study_unit_id?: number;
  question_type: QuestionType;
  difficulty_level: DifficultyLevel;
  question_text: string;
  options?: string[];
  correct_answer?: string;
  marks: number;
  time_allocation?: number;
  learning_outcome?: string;
  keywords?: string;
  bloom_taxonomy?: BloomTaxonomy;
  tags?: string[];
}

// Exam Paper Types
export type ExamType = 'CAT' | 'FINAL';

export type PaperStatus =
  | 'draft'
  | 'submitted'
  | 'hod_review'
  | 'hod_approved'
  | 'hod_rejected'
  | 'dean_review'
  | 'dean_approved'
  | 'dean_rejected'
  | 'ready_for_print'
  | 'printing'
  | 'printed'
  | 'published';

export interface ExamPaper {
  id: number;
  paper_code: string;
  course_id: number;
  created_by: number;
  exam_type: ExamType;
  academic_year: number;
  semester: number;
  exam_date: Date | null;
  duration: number | null;
  total_marks: number;
  instructions: string | null;
  status: PaperStatus;
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
  metadata: Record<string, any> | null;
  created_at: Date;
  updated_at: Date;
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

export interface ExamPaperFormData {
  course_id: number;
  exam_type: ExamType;
  academic_year: number;
  semester: number;
  exam_date?: string;
  duration?: number;
  instructions?: string;
}

// Workflow Types
export type WorkflowAction =
  | 'created'
  | 'submitted'
  | 'hod_approved'
  | 'hod_rejected'
  | 'dean_approved'
  | 'dean_rejected'
  | 'ready_for_print'
  | 'printing_started'
  | 'printed'
  | 'published'
  | 'returned'
  | 'updated';

export interface WorkflowHistory {
  id: number;
  exam_paper_id: number;
  action: WorkflowAction;
  from_status: string | null;
  to_status: string;
  actor_id: number;
  actor_role: string;
  comments: string | null;
  metadata: Record<string, any> | null;
  created_at: Date;
}

export type CommentType =
  | 'feedback'
  | 'revision_request'
  | 'hod_approval_note'
  | 'dean_note'
  | 'print_instruction'
  | 'general';

export interface PaperComment {
  id: number;
  exam_paper_id: number;
  user_id: number;
  comment_type: CommentType;
  comment: string;
  is_resolved: boolean;
  parent_comment_id: number | null;
  created_at: Date;
  updated_at: Date;
}

// Notification Types
export type NotificationType =
  | 'paper_submitted'
  | 'paper_approved'
  | 'paper_rejected'
  | 'paper_returned'
  | 'permission_granted'
  | 'approval_required'
  | 'ready_for_print'
  | 'print_completed'
  | 'comment_added'
  | 'deadline_reminder'
  | 'general';

export type NotificationPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface Notification {
  id: number;
  user_id: number;
  type: NotificationType;
  title: string;
  message: string;
  related_paper_id: number | null;
  related_entity_type: string | null;
  related_entity_id: number | null;
  is_read: boolean;
  read_at: Date | null;
  priority: NotificationPriority;
  action_url: string | null;
  metadata: Record<string, any> | null;
  created_at: Date;
}

// Permission Types
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

// Audit Log Types
export interface AuditLog {
  id: number;
  user_id: number | null;
  action: string;
  entity_type: string;
  entity_id: number | null;
  old_values: Record<string, any> | null;
  new_values: Record<string, any> | null;
  ip_address: string | null;
  user_agent: string | null;
  created_at: Date;
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  errors?: Record<string, string[]>;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
    hasMore: boolean;
  };
}

// Form Types
export interface FormError {
  field: string;
  message: string;
}

export interface ValidationErrors {
  [key: string]: string;
}

// Dashboard Types
export interface DashboardStats {
  total_papers: number;
  pending_approvals: number;
  total_questions: number;
  recent_activity: any[];
}

// Search Types
export interface SearchResult {
  id: string;
  type: 'course' | 'paper' | 'question' | 'user';
  title: string;
  description?: string;
  url: string;
  metadata?: Record<string, any>;
}

// Filter & Sort Types
export interface FilterOptions {
  search?: string;
  status?: PaperStatus | PaperStatus[];
  exam_type?: ExamType;
  academic_year?: number;
  semester?: number;
  course_id?: number;
  department_id?: number;
  college_id?: number;
  created_by?: number;
}

export interface SortOptions {
  field: string;
  order: 'asc' | 'desc';
}

export interface PaginationOptions {
  page: number;
  pageSize: number;
}

// Component Props Types
export interface TableColumn<T> {
  key: keyof T | string;
  label: string;
  sortable?: boolean;
  render?: (value: any, row: T) => React.ReactNode;
}

export interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

// Extended Types with Relations
export interface QuestionWithRelations extends Question {
  course?: Course;
  study_unit?: StudyUnit;
  creator?: User;
  approver?: User;
}

export interface ExamPaperWithRelations extends ExamPaper {
  course?: Course;
  creator?: User;
  hod?: User;
  dean?: User;
  exam_master?: User;
  questions?: (ExamPaperQuestion & { question?: Question })[];
  comments?: PaperComment[];
  workflow_history?: WorkflowHistory[];
}

export interface UserWithRelations extends User {
  department?: Department;
  college?: College;
}

// Utility Types
export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};
