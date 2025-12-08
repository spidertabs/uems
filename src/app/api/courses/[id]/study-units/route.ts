/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/api/courses/[id]/study-units/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { verifyAuth } from '@/lib/auth';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await verifyAuth(req);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const courseId = params.id;

    const studyUnits = await query(
      `SELECT 
        su.*,
        CONCAT(u.first_name, ' ', u.last_name) as created_by_name,
        c.code as course_code,
        c.title as course_title,
        (SELECT COUNT(*) FROM questions WHERE study_unit_id = su.id AND is_active = TRUE) as questions_count
      FROM study_units su
      LEFT JOIN users u ON su.created_by = u.id
      LEFT JOIN courses c ON su.course_id = c.id
      WHERE su.course_id = ?
      ORDER BY su.sequence_order ASC`,
      [courseId]
    );

    return NextResponse.json({ study_units: studyUnits });
  } catch (error) {
    console.error('Study units fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch study units' },
      { status: 500 }
    );
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await verifyAuth(req);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Only HOD, Dean, and Admin can create study units
    if (!['hod', 'dean', 'admin'].includes(user.role)) {
      return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 });
    }

    const courseId = params.id;
    const body = await req.json();
    const {
      code,
      name,
      description,
      sequence_order,
      learning_outcomes,
      is_active = true,
    } = body;

    // Validation
    if (!code || !name) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if course exists
    const courses = await query(
      'SELECT id FROM courses WHERE id = ?',
      [courseId]
    );

    const course = Array.isArray(courses) ? courses[0] : null;

    if (!course) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 });
    }

    // Check if code already exists for this course
    const existing = await query(
      'SELECT id FROM study_units WHERE course_id = ? AND code = ?',
      [courseId, code]
    );

    if (Array.isArray(existing) && existing.length > 0) {
      return NextResponse.json(
        { error: 'Study unit code already exists for this course' },
        { status: 409 }
      );
    }

    // If no sequence_order provided, get the next number
    let finalSequenceOrder = sequence_order;
    if (!finalSequenceOrder) {
      const maxOrders = await query(
        'SELECT COALESCE(MAX(sequence_order), 0) + 1 as next_order FROM study_units WHERE course_id = ?',
        [courseId]
      );
      const maxOrder = Array.isArray(maxOrders) ? maxOrders[0] : null;
      finalSequenceOrder = maxOrder?.next_order || 1;
    }

    const result = await query(
      `INSERT INTO study_units (
        course_id, code, name, description, sequence_order,
        learning_outcomes, created_by, is_active
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        courseId,
        code,
        name,
        description || null,
        finalSequenceOrder,
        learning_outcomes || null,
        user.id,
        is_active ? 1 : 0,
      ]
    );

    const studyUnitId = (result as any).insertId;

    // Fetch the created study unit
    const studyUnits = await query(
      `SELECT 
        su.*,
        CONCAT(u.first_name, ' ', u.last_name) as created_by_name,
        c.code as course_code,
        c.title as course_title
      FROM study_units su
      LEFT JOIN users u ON su.created_by = u.id
      LEFT JOIN courses c ON su.course_id = c.id
      WHERE su.id = ?`,
      [studyUnitId]
    );

    const studyUnit = Array.isArray(studyUnits) ? studyUnits[0] : null;

    return NextResponse.json({ study_unit: studyUnit }, { status: 201 });
  } catch (error) {
    console.error('Study unit creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create study unit' },
      { status: 500 }
    );
  }
}