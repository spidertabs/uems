/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/api/courses/[id]/route.ts
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

    const courses = await query<any[]>(
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

    if (courses.length === 0) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 });
    }

    return NextResponse.json({ course: courses[0] });
  } catch (error) {
    console.error('Failed to fetch course:', error);
    return NextResponse.json(
      { error: 'Failed to fetch course' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await verifyAuth(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!['hod', 'admin'].includes(user.role)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const courseId = params.id;
    const body = await request.json();
    const {
      code,
      title,
      level,
      semester,
      credit_units,
      college_id,
      department_id,
      description,
      is_active,
    } = body;

    // Check if course exists
    const existing = await query<any[]>(
      'SELECT id FROM courses WHERE id = ?',
      [courseId]
    );

    if (existing.length === 0) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 });
    }

    // Check if new code conflicts with existing course
    if (code) {
      const codeConflict = await query<any[]>(
        'SELECT id FROM courses WHERE code = ? AND id != ?',
        [code, courseId]
      );

      if (codeConflict.length > 0) {
        return NextResponse.json(
          { error: 'Course code already exists' },
          { status: 400 }
        );
      }
    }

    // Update course
    await query(
      `UPDATE courses 
       SET code = ?, title = ?, level = ?, semester = ?, credit_units = ?,
           college_id = ?, department_id = ?, description = ?, is_active = ?
       WHERE id = ?`,
      [
        code,
        title,
        level,
        semester,
        credit_units,
        college_id || null,
        department_id || null,
        description || null,
        is_active,
        courseId,
      ]
    );

    // Fetch updated course
    const updated = await query<any[]>(
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

    return NextResponse.json({ course: updated[0] });
  } catch (error) {
    console.error('Failed to update course:', error);
    return NextResponse.json(
      { error: 'Failed to update course' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await verifyAuth(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!['hod', 'admin'].includes(user.role)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const courseId = params.id;
    const body = await request.json();

    // Partial update - only update provided fields
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

    updateValues.push(courseId);

    await query(
      `UPDATE courses SET ${updateFields.join(', ')} WHERE id = ?`,
      updateValues
    );

    const updated = await query<any[]>(
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

    return NextResponse.json({ course: updated[0] });
  } catch (error) {
    console.error('Failed to update course:', error);
    return NextResponse.json(
      { error: 'Failed to update course' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await verifyAuth(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Only admins can delete courses
    if (user.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const courseId = params.id;

    // Check if course exists
    const existing = await query<any[]>(
      'SELECT id FROM courses WHERE id = ?',
      [courseId]
    );

    if (existing.length === 0) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 });
    }

    // Delete course (cascade will delete study units)
    await query('DELETE FROM courses WHERE id = ?', [courseId]);

    return NextResponse.json({ message: 'Course deleted successfully' });
  } catch (error) {
    console.error('Failed to delete course:', error);
    return NextResponse.json(
      { error: 'Failed to delete course' },
      { status: 500 }
    );
  }
}