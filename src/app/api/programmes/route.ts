/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/api/programmes/route.ts
import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import type { Programme } from '@/lib/db';

// GET /api/programmes - Fetch all programmes (optionally filtered)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const level = searchParams.get('level');
    const departmentId = searchParams.get('department_id');
    const collegeId = searchParams.get('college_id');
    const isActive = searchParams.get('is_active');

    let sql = `
      SELECT 
        p.*,
        d.name as department_name,
        d.code as department_code,
        c.name as college_name,
        c.code as college_code
      FROM programmes p
      LEFT JOIN departments d ON p.department_id = d.id
      LEFT JOIN colleges c ON p.college_id = c.id
      WHERE 1=1
    `;

    const params: any[] = [];

    // Add filters
    if (level) {
      sql += ' AND p.level = ?';
      params.push(level);
    }

    if (departmentId) {
      sql += ' AND p.department_id = ?';
      params.push(parseInt(departmentId));
    }

    if (collegeId) {
      sql += ' AND p.college_id = ?';
      params.push(parseInt(collegeId));
    }

    if (isActive !== null && isActive !== undefined) {
      sql += ' AND p.is_active = ?';
      params.push(isActive === 'true' ? 1 : 0);
    } else {
      // Default: only active programmes
      sql += ' AND p.is_active = 1';
    }

    sql += ' ORDER BY p.code ASC';

    const programmes = await query<Programme[]>(sql, params);

    return NextResponse.json({
      success: true,
      programmes,
      count: programmes.length,
    });
  } catch (error) {
    console.error('Programmes fetch error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch programmes' },
      { status: 500 }
    );
  }
}

// POST /api/programmes - Create a new programme (Admin/HOD only)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      code,
      name,
      level,
      duration_years,
      department_id,
      college_id,
      description,
    } = body;

    // Validation
    if (!code || !name || !level) {
      return NextResponse.json(
        { success: false, error: 'Code, name, and level are required' },
        { status: 400 }
      );
    }

    // Check if programme code already exists
    const existing = await query<Programme[]>(
      'SELECT id FROM programmes WHERE code = ?',
      [code]
    );

    if (existing.length > 0) {
      return NextResponse.json(
        { success: false, error: 'Programme code already exists' },
        { status: 409 }
      );
    }

    // Insert new programme
    const result = await query(
      `INSERT INTO programmes 
       (code, name, level, duration_years, department_id, college_id, description, is_active)
       VALUES (?, ?, ?, ?, ?, ?, ?, 1)`,
      [
        code,
        name,
        level,
        duration_years || null,
        department_id || null,
        college_id || null,
        description || null,
      ]
    );

    // Fetch the created programme
    const newProgramme = await query<Programme[]>(
      `SELECT 
        p.*,
        d.name as department_name,
        c.name as college_name
      FROM programmes p
      LEFT JOIN departments d ON p.department_id = d.id
      LEFT JOIN colleges c ON p.college_id = c.id
      WHERE p.id = ?`,
      [(result as any).insertId]
    );

    return NextResponse.json(
      {
        success: true,
        programme: newProgramme[0],
        message: 'Programme created successfully',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Programme creation error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create programme' },
      { status: 500 }
    );
  }
}