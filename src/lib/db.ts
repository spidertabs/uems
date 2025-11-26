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

export default getPool;
