/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/api/dashboard/stats/route.ts
import { NextResponse } from 'next/server';
import { getUserFromSession } from '@/lib/auth';
import { query } from '@/lib/db';

export async function GET() {
  try {
    const user = await getUserFromSession();

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Not authenticated' },
        { status: 401 }
      );
    }

    // Get user's exam papers count
    const myPapersResult = await query<any[]>(
      'SELECT COUNT(*) as count FROM exam_papers WHERE created_by = ?',
      [user.id]
    );
    const myPapers = myPapersResult?.[0]?.count || 0;

    // Get pending approvals count (for HODs and admins)
    let pendingApprovals = 0;
    if (['hod', 'admin'].includes(user.role)) {
      const approvalsResult = await query<any[]>(
        `SELECT COUNT(*) as count FROM exam_papers 
         WHERE approval_status = 'pending' 
         ${user.role === 'hod' ? 'AND department_id = ?' : ''}`,
        user.role === 'hod' ? [user.department_id] : []
      );
      pendingApprovals = approvalsResult?.[0]?.count || 0;
    }

    // Get questions count
    const questionsResult = await query<any[]>(
      'SELECT COUNT(*) as count FROM questions WHERE created_by = ?',
      [user.id]
    );
    const questions = questionsResult?.[0]?.count || 0;

    // Get notifications count
    const notificationsResult = await query<any[]>(
      'SELECT COUNT(*) as count FROM notifications WHERE user_id = ? AND is_read = 0',
      [user.id]
    );
    const notifications = notificationsResult?.[0]?.count || 0;

    return NextResponse.json({
      success: true,
      myPapers,
      pendingApprovals,
      questions,
      notifications,
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch dashboard stats' },
      { status: 500 }
    );
  }
}
