/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/api/departments/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { verifyAuth } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const user = await verifyAuth(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const departments = await query<any[]>(
      `SELECT 
        d.*,
        c.name AS college_name,
        c.abbrv AS college_abbreviation
      FROM departments d
      LEFT JOIN colleges c ON d.college_id = c.id
      ORDER BY d.name ASC`,
      []
    );

    return NextResponse.json({ departments });
  } catch (error) {
    console.error('Failed to fetch departments:', error);
    return NextResponse.json(
      { error: 'Failed to fetch departments' },
      { status: 500 }
    );
  }
}
