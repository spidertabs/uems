/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/api/colleges/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { verifyAuth } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const user = await verifyAuth(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const colleges = await query<any[]>(
      'SELECT * FROM colleges ORDER BY name ASC',
      []
    );

    return NextResponse.json({ colleges });
  } catch (error) {
    console.error('Failed to fetch colleges:', error);
    return NextResponse.json(
      { error: 'Failed to fetch colleges' },
      { status: 500 }
    );
  }
}
