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

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  role: 'lecturer' | 'hod' | 'dean' | 'exam_master' | 'admin';
  department_id: number | null;
  college_id: number | null;
  is_active: boolean;
}

export interface Course {
  id: number;
  code: string;
  title: string;
  level: number;
  semester: number;
  credit_units: number;
  department_id: number | null;
  college_id: number | null;
}

export interface ExamPaper {
  id: number;
  paper_code: string;
  course_id: number;
  created_by: number;
  exam_type: 'TEST' | 'CAT' | 'FINAL';
  status: string;
  academic_year: number;
  semester: number;
}

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

export interface WorkflowHistory {
  id: number;
  exam_paper_id: number;
  action: string;
  from_status: string | null;
  to_status: string;
  actor_id: number;
  actor_role: string;
  comments: string | null;
  metadata: string | null; // JSON string
  created_at: Date;
}

export interface Notification {
  id: number;
  user_id: number;
  type: string;
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

export default getPool;
