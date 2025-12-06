/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/api/dashboard/stats/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { verifyAuth } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const user = await verifyAuth(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const stats = {
      myPapers: 0,
      pendingApprovals: 0,
      questions: 0,
      notifications: 0,
    };

    // Get stats based on user role
    switch (user.role) {
      case 'lecturer':
        // Lecturer's own papers
        const lecturerPapers = await query<any[]>(
          'SELECT COUNT(*) as count FROM exam_papers WHERE created_by = ?',
          [user.id]
        );
        stats.myPapers = lecturerPapers[0]?.count || 0;

        // Lecturer's questions
        const lecturerQuestions = await query<any[]>(
          'SELECT COUNT(*) as count FROM questions WHERE created_by = ?',
          [user.id]
        );
        stats.questions = lecturerQuestions[0]?.count || 0;
        break;

      case 'hod':
        // Papers in HOD's department awaiting approval
        const hodPapers = await query<any[]>(
          `SELECT COUNT(*) as count 
           FROM exam_papers ep
           JOIN courses c ON ep.course_id = c.id
           WHERE c.hod_id = ? AND ep.status IN ('submitted', 'hod_review')`,
          [user.id]
        );
        stats.pendingApprovals = hodPapers[0]?.count || 0;

        // All papers in HOD's department
        const allHodPapers = await query<any[]>(
          `SELECT COUNT(*) as count 
           FROM exam_papers ep
           JOIN courses c ON ep.course_id = c.id
           WHERE c.hod_id = ?`,
          [user.id]
        );
        stats.myPapers = allHodPapers[0]?.count || 0;

        // Questions in HOD's department
        const hodQuestions = await query<any[]>(
          `SELECT COUNT(*) as count 
           FROM questions q
           JOIN courses c ON q.course_id = c.id
           WHERE c.hod_id = ?`,
          [user.id]
        );
        stats.questions = hodQuestions[0]?.count || 0;
        break;

      case 'exam_master':
        // Papers ready for printing
        const printPapers = await query<any[]>(
          "SELECT COUNT(*) as count FROM exam_papers WHERE status IN ('ready_for_print', 'printing')",
          []
        );
        stats.myPapers = printPapers[0]?.count || 0;

        // Total papers handled
        const handledPapers = await query<any[]>(
          'SELECT COUNT(*) as count FROM exam_papers WHERE exam_master_id = ?',
          [user.id]
        );
        stats.pendingApprovals = handledPapers[0]?.count || 0;
        break;

      case 'admin':
        // All papers
        const allPapers = await query<any[]>(
          'SELECT COUNT(*) as count FROM exam_papers',
          []
        );
        stats.myPapers = allPapers[0]?.count || 0;

        // Papers needing approval
        const needsApproval = await query<any[]>(
          "SELECT COUNT(*) as count FROM exam_papers WHERE status IN ('submitted', 'hod_review')",
          []
        );
        stats.pendingApprovals = needsApproval[0]?.count || 0;

        // All questions
        const allQuestions = await query<any[]>(
          'SELECT COUNT(*) as count FROM questions',
          []
        );
        stats.questions = allQuestions[0]?.count || 0;
        break;
    }

    // Get unread notifications for all users
    const notifications = await query<any[]>(
      'SELECT COUNT(*) as count FROM notifications WHERE user_id = ? AND is_read = FALSE',
      [user.id]
    );
    stats.notifications = notifications[0]?.count || 0;

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Failed to fetch dashboard stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dashboard stats' },
      { status: 500 }
    );
  }
}