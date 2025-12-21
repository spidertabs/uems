// src/app/api/exam-papers/route.ts
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { verifyAuth } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const session = await verifyAuth(request);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { role, id: user_id, department_id, college_id } = session;
    const { searchParams } = new URL(request.url);
    const course_id = searchParams.get('course_id');

    let sql = `
      SELECT 
        ep.id,
        ep.paper_code,
        ep.exam_type,
        ep.academic_year,
        ep.semester,
        ep.exam_date,
        ep.duration,
        ep.total_marks,
        ep.status,
        ep.created_at,
        ep.submitted_at,
        c.code AS course_code,
        c.title AS course_title,
        CONCAT(creator.first_name, ' ', creator.last_name) AS created_by_name,
        ep.created_by
      FROM exam_papers ep
      JOIN courses c ON ep.course_id = c.id
      LEFT JOIN users creator ON ep.created_by = creator.id
      WHERE 1=1
    `;

    const params: any[] = [];

    // Filter by course if specified
    if (course_id) {
      sql += ` AND ep.course_id = ?`;
      params.push(course_id);
    }

    // Filter based on role
    if (role === 'lecturer') {
      // Lecturers see their own papers or papers from courses they have permission for
      sql += `
        AND (ep.created_by = ? OR EXISTS (
          SELECT 1 FROM lecturer_permissions lp 
          WHERE lp.lecturer_id = ? 
          AND lp.course_id = ep.course_id 
          AND lp.is_active = TRUE
        ))
      `;
      params.push(user_id, user_id);
    } else if (role === 'hod') {
      // HODs see all papers in their department
      sql += ` AND c.department_id = ?`;
      params.push(department_id);
    } else if (role === 'dean') {
      // Deans see all papers in their college
      sql += ` AND c.college_id = ?`;
      params.push(college_id);
    }
    // Admin and exam_master see all papers

    sql += ` ORDER BY ep.created_at DESC`;

    const papers = await query<any[]>(sql, params);

    return NextResponse.json({
      success: true,
      papers,
      count: papers.length,
    });
  } catch (error) {
    console.error('GET /api/exam-papers error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch exam papers', details: String(error) },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await verifyAuth(request);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const {
      course_id,
      exam_type,
      academic_year,
      semester,
      exam_date,
      duration,
      instructions,
    } = body;

    // Validate required fields
    if (!course_id || !exam_type || !academic_year || !semester) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Generate paper code
    const courseResult = await query<any[]>(
      'SELECT code FROM courses WHERE id = ?',
      [course_id]
    );

    if (!courseResult || courseResult.length === 0) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 });
    }

    const courseCode = courseResult[0].code;
    const paper_code = `${courseCode}-${exam_type}-${academic_year}-S${semester}`;

    // Get HOD for the course
    const hodResult = await query<any[]>(
      `SELECT u.id 
       FROM users u 
       JOIN departments d ON u.department_id = d.id 
       JOIN courses c ON c.department_id = d.id 
       WHERE c.id = ? AND u.role = 'hod' 
       LIMIT 1`,
      [course_id]
    );

    const hod_id = hodResult.length > 0 ? hodResult[0].id : null;

    // Insert exam paper
    const insertSql = `
      INSERT INTO exam_papers (
        paper_code, course_id, created_by, exam_type,
        academic_year, semester, exam_date, duration,
        instructions, status, hod_id
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'draft', ?)
    `;

    const result = await query<any>(insertSql, [
      paper_code,
      course_id,
      session.id,
      exam_type,
      academic_year,
      semester,
      exam_date || null,
      duration || null,
      instructions || null,
      hod_id,
    ]);

    // Create workflow history entry
    await query(
      `INSERT INTO workflow_history (exam_paper_id, action, from_status, to_status, actor_id, actor_role)
       VALUES (?, 'created', NULL, 'draft', ?, ?)`,
      [result.insertId, session.id, session.role]
    );

    return NextResponse.json({
      success: true,
      paper_id: result.insertId,
      paper_code,
      message: 'Exam paper created successfully',
    });
  } catch (error) {
    console.error('POST /api/exam-papers error:', error);
    return NextResponse.json(
      { error: 'Failed to create exam paper', details: String(error) },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await verifyAuth(request);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Paper ID required' }, { status: 400 });
    }

    // Check if paper exists and user has permission
    const paperResult = await query<any[]>(
      'SELECT created_by, status FROM exam_papers WHERE id = ?',
      [id]
    );

    if (!paperResult || paperResult.length === 0) {
      return NextResponse.json({ error: 'Paper not found' }, { status: 404 });
    }

    const paper = paperResult[0];

    // Only allow deletion of draft papers by creator or admin
    if (paper.status !== 'draft') {
      return NextResponse.json(
        { error: 'Only draft papers can be deleted' },
        { status: 403 }
      );
    }

    if (paper.created_by !== session.id && session.role !== 'admin') {
      return NextResponse.json(
        { error: 'Not authorized to delete this paper' },
        { status: 403 }
      );
    }

    await query('DELETE FROM exam_papers WHERE id = ?', [id]);

    return NextResponse.json({
      success: true,
      message: 'Exam paper deleted successfully',
    });
  } catch (error) {
    console.error('DELETE /api/exam-papers error:', error);
    return NextResponse.json(
      { error: 'Failed to delete exam paper', details: String(error) },
      { status: 500 }
    );
  }
}