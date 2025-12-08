/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/api/courses/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { verifyAuth } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const user = await verifyAuth(req);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const departmentId = searchParams.get('department_id');
    const collegeId = searchParams.get('college_id');
    const isActive = searchParams.get('is_active');

    let sql = `
      SELECT 
        c.*,
        d.name as department_name,
        col.name as college_name,
        col.abbrv as college_abbreviation,
        CONCAT(u.first_name, ' ', u.last_name) as hod_name,
        (SELECT COUNT(*) FROM study_units WHERE course_id = c.id AND is_active = TRUE) as study_units_count
      FROM courses c
      LEFT JOIN departments d ON c.department_id = d.id
      LEFT JOIN colleges col ON c.college_id = col.id
      LEFT JOIN users u ON c.hod_id = u.id
      WHERE 1=1
    `;

    const params: any[] = [];

    if (departmentId) {
      sql += ' AND c.department_id = ?';
      params.push(departmentId);
    }

    if (collegeId) {
      sql += ' AND c.college_id = ?';
      params.push(collegeId);
    }

    if (isActive !== null && isActive !== undefined) {
      sql += ' AND c.is_active = ?';
      params.push(isActive === 'true' ? 1 : 0);
    }

    sql += ' ORDER BY c.code ASC';

    const courses = await query(sql, params);

    return NextResponse.json({ courses });
  } catch (error) {
    console.error('Courses fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch courses' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await verifyAuth(req);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Only HOD, Dean, and Admin can create courses
    if (!['hod', 'dean', 'admin'].includes(user.role)) {
      return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 });
    }

    const body = await req.json();
    const {
      code,
      title,
      level,
      semester,
      credit_units,
      college_id,
      department_id,
      description,
      is_active = true,
    } = body;

    // Validation
    if (!code || !title || !level || !semester || !credit_units) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if course code already exists
    const existing = await query(
      'SELECT id FROM courses WHERE code = ?',
      [code]
    );

    if (Array.isArray(existing) && existing.length > 0) {
      return NextResponse.json(
        { error: 'Course code already exists' },
        { status: 409 }
      );
    }

    const result = await query(
      `INSERT INTO courses (
        code, title, level, semester, credit_units,
        college_id, department_id, hod_id, description, is_active
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        code,
        title,
        level,
        semester,
        credit_units,
        college_id || null,
        department_id || null,
        user.id,
        description || null,
        is_active ? 1 : 0,
      ]
    );

    const courseId = (result as any).insertId;

    // Fetch the created course
    const courses = await query(
      `SELECT 
        c.*,
        d.name as department_name,
        col.name as college_name,
        CONCAT(u.first_name, ' ', u.last_name) as hod_name
      FROM courses c
      LEFT JOIN departments d ON c.department_id = d.id
      LEFT JOIN colleges col ON c.college_id = col.id
      LEFT JOIN users u ON c.hod_id = u.id
      WHERE c.id = ?`,
      [courseId]
    );

    const course = Array.isArray(courses) ? courses[0] : null;

    return NextResponse.json({ course }, { status: 201 });
  } catch (error) {
    console.error('Course creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create course' },
      { status: 500 }
    );
  }
}