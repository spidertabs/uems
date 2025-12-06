/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/api/courses/[id]/study-units/[unitId]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { verifyAuth } from '@/lib/auth';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string; unitId: string } }
) {
  try {
    const user = await verifyAuth(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id: courseId, unitId } = params;

    const studyUnits = await query<any[]>(
      `SELECT 
        su.*,
        CONCAT(u.first_name, ' ', u.last_name) as created_by_name,
        c.code as course_code,
        c.title as course_title
      FROM study_units su
      LEFT JOIN users u ON su.created_by = u.id
      LEFT JOIN courses c ON su.course_id = c.id
      WHERE su.id = ? AND su.course_id = ?`,
      [unitId, courseId]
    );

    if (studyUnits.length === 0) {
      return NextResponse.json({ error: 'Study unit not found' }, { status: 404 });
    }

    return NextResponse.json({ study_unit: studyUnits[0] });
  } catch (error) {
    console.error('Failed to fetch study unit:', error);
    return NextResponse.json(
      { error: 'Failed to fetch study unit' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string; unitId: string } }
) {
  try {
    const user = await verifyAuth(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!['hod', 'admin'].includes(user.role)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { id: courseId, unitId } = params;
    const body = await request.json();
    const { code, name, description, learning_outcomes, sequence_order, is_active } = body;

    // Check if study unit exists
    const existing = await query<any[]>(
      'SELECT id FROM study_units WHERE id = ? AND course_id = ?',
      [unitId, courseId]
    );

    if (existing.length === 0) {
      return NextResponse.json({ error: 'Study unit not found' }, { status: 404 });
    }

    // Check for code conflict
    if (code) {
      const codeConflict = await query<any[]>(
        'SELECT id FROM study_units WHERE course_id = ? AND code = ? AND id != ?',
        [courseId, code, unitId]
      );

      if (codeConflict.length > 0) {
        return NextResponse.json(
          { error: 'Study unit code already exists for this course' },
          { status: 400 }
        );
      }
    }

    // Update study unit
    await query(
      `UPDATE study_units 
       SET code = ?, name = ?, description = ?, learning_outcomes = ?, 
           sequence_order = ?, is_active = ?
       WHERE id = ? AND course_id = ?`,
      [code, name, description || null, learning_outcomes || null, sequence_order, is_active, unitId, courseId]
    );

    // Fetch updated study unit
    const updated = await query<any[]>(
      `SELECT 
        su.*,
        CONCAT(u.first_name, ' ', u.last_name) as created_by_name
      FROM study_units su
      LEFT JOIN users u ON su.created_by = u.id
      WHERE su.id = ?`,
      [unitId]
    );

    return NextResponse.json({ study_unit: updated[0] });
  } catch (error) {
    console.error('Failed to update study unit:', error);
    return NextResponse.json(
      { error: 'Failed to update study unit' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string; unitId: string } }
) {
  try {
    const user = await verifyAuth(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!['hod', 'admin'].includes(user.role)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { id: courseId, unitId } = params;
    const body = await request.json();

    // Partial update
    const updateFields: string[] = [];
    const updateValues: any[] = [];

    Object.entries(body).forEach(([key, value]) => {
      if (value !== undefined) {
        updateFields.push(`${key} = ?`);
        updateValues.push(value);
      }
    });

    if (updateFields.length === 0) {
      return NextResponse.json({ error: 'No fields to update' }, { status: 400 });
    }

    updateValues.push(unitId, courseId);

    await query(
      `UPDATE study_units SET ${updateFields.join(', ')} WHERE id = ? AND course_id = ?`,
      updateValues
    );

    const updated = await query<any[]>(
      `SELECT 
        su.*,
        CONCAT(u.first_name, ' ', u.last_name) as created_by_name
      FROM study_units su
      LEFT JOIN users u ON su.created_by = u.id
      WHERE su.id = ?`,
      [unitId]
    );

    return NextResponse.json({ study_unit: updated[0] });
  } catch (error) {
    console.error('Failed to update study unit:', error);
    return NextResponse.json(
      { error: 'Failed to update study unit' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string; unitId: string } }
) {
  try {
    const user = await verifyAuth(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (user.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { id: courseId, unitId } = params;

    // Check if study unit exists
    const existing = await query<any[]>(
      'SELECT id FROM study_units WHERE id = ? AND course_id = ?',
      [unitId, courseId]
    );

    if (existing.length === 0) {
      return NextResponse.json({ error: 'Study unit not found' }, { status: 404 });
    }

    // Delete study unit (cascade will handle questions)
    await query('DELETE FROM study_units WHERE id = ? AND course_id = ?', [unitId, courseId]);

    return NextResponse.json({ message: 'Study unit deleted successfully' });
  } catch (error) {
    console.error('Failed to delete study unit:', error);
    return NextResponse.json(
      { error: 'Failed to delete study unit' },
      { status: 500 }
    );
  }
}