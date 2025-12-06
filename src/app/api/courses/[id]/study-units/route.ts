/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/api/courses/[id]/study-units/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { verifyAuth } from '@/lib/auth';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await verifyAuth(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const courseId = params.id;

    // Check if course exists
    const courseCheck = await query<any[]>(
      'SELECT id FROM courses WHERE id = ?',
      [courseId]
    );

    if (courseCheck.length === 0) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 });
    }

    // Get study units with question count
    const studyUnits = await query<any[]>(
      `SELECT 
        su.*,
        CONCAT(u.first_name, ' ', u.last_name) as created_by_name,
        (SELECT COUNT(*) FROM questions WHERE study_unit_id = su.id) as questions_count
      FROM study_units su
      LEFT JOIN users u ON su.created_by = u.id
      WHERE su.course_id = ?
      ORDER BY su.sequence_order ASC`,
      [courseId]
    );

    return NextResponse.json({ study_units: studyUnits });
  } catch (error) {
    console.error('Failed to fetch study units:', error);
    return NextResponse.json(
      { error: 'Failed to fetch study units' },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await verifyAuth(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Only HODs and admins can create study units
    if (!['hod', 'admin'].includes(user.role)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const courseId = params.id;
    const body = await request.json();
    const { code, name, description, learning_outcomes, sequence_order, is_active = true } = body;

    // Validate required fields
    if (!code || !name) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if course exists
    const courseCheck = await query<any[]>(
      'SELECT id FROM courses WHERE id = ?',
      [courseId]
    );

    if (courseCheck.length === 0) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 });
    }

    // Check if code already exists for this course
    const existing = await query<any[]>(
      'SELECT id FROM study_units WHERE course_id = ? AND code = ?',
      [courseId, code]
    );

    if (existing.length > 0) {
      return NextResponse.json(
        { error: 'Study unit code already exists for this course' },
        { status: 400 }
      );
    }

    // Get max sequence order if not provided
    let finalSequenceOrder = sequence_order;
    if (!finalSequenceOrder) {
      const maxOrder = await query<any[]>(
        'SELECT MAX(sequence_order) as max_order FROM study_units WHERE course_id = ?',
        [courseId]
      );
      finalSequenceOrder = (maxOrder[0]?.max_order || 0) + 1;
    }

    // Insert study unit
    const result = await query<any>(
      `INSERT INTO study_units 
        (course_id, code, name, description, learning_outcomes, sequence_order, created_by, is_active) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        courseId,
        code,
        name,
        description || null,
        learning_outcomes || null,
        finalSequenceOrder,
        user.id,
        is_active,
      ]
    );

    // Fetch the created study unit
    const studyUnit = await query<any[]>(
      `SELECT 
        su.*,
        CONCAT(u.first_name, ' ', u.last_name) as created_by_name
      FROM study_units su
      LEFT JOIN users u ON su.created_by = u.id
      WHERE su.id = ?`,
      [result.insertId]
    );

    return NextResponse.json({ study_unit: studyUnit[0] }, { status: 201 });
  } catch (error) {
    console.error('Failed to create study unit:', error);
    return NextResponse.json(
      { error: 'Failed to create study unit' },
      { status: 500 }
    );
  }
}