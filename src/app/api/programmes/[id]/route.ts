/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/api/programmes/[id]/route.ts
import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import type { Programme } from '@/lib/db';

// GET /api/programmes/[id] - Fetch a single programme
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const programmeId = parseInt(params.id);

    if (isNaN(programmeId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid programme ID' },
        { status: 400 }
      );
    }

    const programmes = await query<Programme[]>(
      `SELECT 
        p.*,
        d.name as department_name,
        d.code as department_code,
        d.abbrv as department_abbrv,
        c.name as college_name,
        c.code as college_code,
        c.abbrv as college_abbrv
      FROM programmes p
      LEFT JOIN departments d ON p.department_id = d.id
      LEFT JOIN colleges c ON p.college_id = c.id
      WHERE p.id = ?`,
      [programmeId]
    );

    if (programmes.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Programme not found' },
        { status: 404 }
      );
    }

    // Get associated exam papers count
    const paperCount = await query<any[]>(
      `SELECT COUNT(*) as count 
       FROM exam_paper_programmes 
       WHERE programme_id = ?`,
      [programmeId]
    );

    return NextResponse.json({
      success: true,
      programme: {
        ...programmes[0],
        exam_papers_count: paperCount[0]?.count || 0,
      },
    });
  } catch (error) {
    console.error('Programme fetch error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch programme' },
      { status: 500 }
    );
  }
}

// PUT /api/programmes/[id] - Update a programme
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const programmeId = parseInt(params.id);

    if (isNaN(programmeId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid programme ID' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const {
      code,
      name,
      level,
      duration_years,
      department_id,
      college_id,
      description,
      is_active,
    } = body;

    // Check if programme exists
    const existing = await query<Programme[]>(
      'SELECT id FROM programmes WHERE id = ?',
      [programmeId]
    );

    if (existing.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Programme not found' },
        { status: 404 }
      );
    }

    // Check if new code conflicts with another programme
    if (code) {
      const codeCheck = await query<Programme[]>(
        'SELECT id FROM programmes WHERE code = ? AND id != ?',
        [code, programmeId]
      );

      if (codeCheck.length > 0) {
        return NextResponse.json(
          { success: false, error: 'Programme code already exists' },
          { status: 409 }
        );
      }
    }

    // Build update query dynamically
    const updates: string[] = [];
    const values: any[] = [];

    if (code !== undefined) {
      updates.push('code = ?');
      values.push(code);
    }
    if (name !== undefined) {
      updates.push('name = ?');
      values.push(name);
    }
    if (level !== undefined) {
      updates.push('level = ?');
      values.push(level);
    }
    if (duration_years !== undefined) {
      updates.push('duration_years = ?');
      values.push(duration_years || null);
    }
    if (department_id !== undefined) {
      updates.push('department_id = ?');
      values.push(department_id || null);
    }
    if (college_id !== undefined) {
      updates.push('college_id = ?');
      values.push(college_id || null);
    }
    if (description !== undefined) {
      updates.push('description = ?');
      values.push(description || null);
    }
    if (is_active !== undefined) {
      updates.push('is_active = ?');
      values.push(is_active ? 1 : 0);
    }

    if (updates.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No fields to update' },
        { status: 400 }
      );
    }

    values.push(programmeId);

    await query(
      `UPDATE programmes SET ${updates.join(', ')} WHERE id = ?`,
      values
    );

    // Fetch updated programme
    const updated = await query<Programme[]>(
      `SELECT 
        p.*,
        d.name as department_name,
        c.name as college_name
      FROM programmes p
      LEFT JOIN departments d ON p.department_id = d.id
      LEFT JOIN colleges c ON p.college_id = c.id
      WHERE p.id = ?`,
      [programmeId]
    );

    return NextResponse.json({
      success: true,
      programme: updated[0],
      message: 'Programme updated successfully',
    });
  } catch (error) {
    console.error('Programme update error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update programme' },
      { status: 500 }
    );
  }
}

// DELETE /api/programmes/[id] - Delete (or deactivate) a programme
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const programmeId = parseInt(params.id);
    const { searchParams } = new URL(request.url);
    const hardDelete = searchParams.get('hard') === 'true';

    if (isNaN(programmeId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid programme ID' },
        { status: 400 }
      );
    }

    // Check if programme exists
    const existing = await query<Programme[]>(
      'SELECT id FROM programmes WHERE id = ?',
      [programmeId]
    );

    if (existing.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Programme not found' },
        { status: 404 }
      );
    }

    // Check if programme is used in exam papers
    const usageCheck = await query<any[]>(
      'SELECT COUNT(*) as count FROM exam_paper_programmes WHERE programme_id = ?',
      [programmeId]
    );

    const isUsed = usageCheck[0]?.count > 0;

    if (isUsed && hardDelete) {
      return NextResponse.json(
        {
          success: false,
          error:
            'Cannot delete programme: it is associated with exam papers. Consider deactivating instead.',
        },
        { status: 409 }
      );
    }

    if (hardDelete && !isUsed) {
      // Hard delete if not used
      await query('DELETE FROM programmes WHERE id = ?', [programmeId]);
      return NextResponse.json({
        success: true,
        message: 'Programme deleted successfully',
      });
    } else {
      // Soft delete (deactivate)
      await query('UPDATE programmes SET is_active = 0 WHERE id = ?', [
        programmeId,
      ]);
      return NextResponse.json({
        success: true,
        message: 'Programme deactivated successfully',
      });
    }
  } catch (error) {
    console.error('Programme deletion error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete programme' },
      { status: 500 }
    );
  }
}