/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/api/print-queue/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { verifyAuth } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const user = await verifyAuth(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Only exam_master and admin can access print queue
    if (!['exam_master', 'admin'].includes(user.role)) {
      return NextResponse.json(
        { error: 'Access denied. Only Exam Masters can access the print queue.' },
        { status: 403 }
      );
    }

    // Get status filter from query params
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');

    // Build query based on status filter
    let sql = `
      SELECT 
        ep.id,
        ep.paper_code,
        ep.status,
        ep.exam_type,
        ep.exam_date,
        c.code as course_code,
        c.title as course_name,
        ep.total_marks,
        ep.duration,
        ep.hod_approved_at,
        ep.print_quantity,
        d.name as department_name,
        col.name as college_name,
        GROUP_CONCAT(DISTINCT p.code ORDER BY p.code SEPARATOR ', ') as programmes,
        GROUP_CONCAT(DISTINCT p.name ORDER BY p.code SEPARATOR ' | ') as programme_names
      FROM exam_papers ep
      JOIN courses c ON ep.course_id = c.id
      LEFT JOIN departments d ON c.department_id = d.id
      LEFT JOIN colleges col ON c.college_id = col.id
      LEFT JOIN exam_paper_programmes epp ON ep.id = epp.exam_paper_id
      LEFT JOIN programmes p ON epp.programme_id = p.id
      WHERE ep.deleted_at IS NULL
    `;

    const params: any[] = [];

    if (status && ['ready_for_print', 'printing', 'printed'].includes(status)) {
      sql += ' AND ep.status = ?';
      params.push(status);
    } else {
      sql += " AND ep.status IN ('ready_for_print', 'printing')";
    }

    sql += `
      GROUP BY ep.id, ep.paper_code, ep.status, ep.exam_type, ep.exam_date,
               c.code, c.title, ep.total_marks, ep.duration, ep.hod_approved_at,
               ep.print_quantity, d.name, col.name
      ORDER BY 
        CASE 
          WHEN ep.status = 'printing' THEN 1
          WHEN ep.status = 'ready_for_print' THEN 2
          ELSE 3
        END,
        ep.exam_date ASC,
        ep.created_at DESC
    `;

    const papers = await query<any[]>(sql, params);

    return NextResponse.json({
      success: true,
      data: papers,
    });
  } catch (error) {
    console.error('Failed to fetch print queue:', error);
    return NextResponse.json(
      { error: 'Failed to fetch print queue' },
      { status: 500 }
    );
  }
}