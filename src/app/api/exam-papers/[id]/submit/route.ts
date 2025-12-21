// src/app/api/exam-papers/[id]/submit/route.ts
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { verifyAuth } from '@/lib/auth';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } | Promise<{ id: string }> }
) {
  try {
    const session = await verifyAuth(request);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const resolvedParams = params instanceof Promise ? await params : params;
    const paperId = resolvedParams.id;

    // Get paper details
    const paperResult = await query<any[]>(
      `SELECT ep.*, c.department_id, c.college_id
       FROM exam_papers ep
       JOIN courses c ON ep.course_id = c.id
       WHERE ep.id = ?`,
      [paperId]
    );

    if (!paperResult || paperResult.length === 0) {
      return NextResponse.json({ error: 'Paper not found' }, { status: 404 });
    }

    const paper = paperResult[0];

    // Check if paper has questions
    const questionCount = await query<any[]>(
      'SELECT COUNT(*) as count FROM exam_paper_questions WHERE exam_paper_id = ?',
      [paperId]
    );

    if (questionCount[0].count === 0) {
      return NextResponse.json(
        { error: 'Cannot submit a paper without questions' },
        { status: 400 }
      );
    }

    // Only creator can submit
    if (paper.created_by !== session.id) {
      return NextResponse.json(
        { error: 'Only the creator can submit this paper' },
        { status: 403 }
      );
    }

    // Only draft papers can be submitted
    if (paper.status !== 'draft') {
      return NextResponse.json(
        { error: 'Only draft papers can be submitted' },
        { status: 400 }
      );
    }

    // Update paper status
    await query(
      `UPDATE exam_papers 
       SET status = 'submitted', submitted_at = NOW() 
       WHERE id = ?`,
      [paperId]
    );

    // Create workflow history
    await query(
      `INSERT INTO workflow_history 
       (exam_paper_id, action, from_status, to_status, actor_id, actor_role)
       VALUES (?, 'submitted', 'draft', 'submitted', ?, ?)`,
      [paperId, session.id, session.role]
    );

    // Create notification for HOD
    if (paper.hod_id) {
      await query(
        `INSERT INTO notifications 
         (user_id, type, title, message, related_paper_id, action_url, priority)
         VALUES (?, 'approval_required', ?, ?, ?, ?, 'high')`,
        [
          paper.hod_id,
          'New Paper Awaiting Approval',
          `${paper.paper_code} has been submitted and requires your review.`,
          paperId,
          `/exam-papers/${paperId}`,
        ]
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Paper submitted successfully',
      new_status: 'submitted',
    });
  } catch (error) {
    console.error('POST /api/exam-papers/[id]/submit error:', error);
    return NextResponse.json(
      { error: 'Failed to submit paper', details: String(error) },
      { status: 500 }
    );
  }
}