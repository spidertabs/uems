/* eslint-disable @typescript-eslint/no-explicit-any */
// ============================================================
// src/app/api/exam-papers/[paperId]/reject/route.ts
// ============================================================
import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { verifyAuth } from '@/lib/auth';
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ paperId: string }> }
) {
  try {
    const session = await verifyAuth(request);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { paperId } = await params;
    const body = await request.json();
    const { comments, reason } = body;

    // Get paper details
    const paperResult = await query<any[]>(
      `SELECT ep.*, 
              c.department_id, 
              c.college_id, 
              c.hod_id
       FROM exam_papers ep
       JOIN courses c ON ep.course_id = c.id
       WHERE ep.id = ?`,
      [paperId]
    );

    if (!paperResult || paperResult.length === 0) {
      return NextResponse.json({ error: 'Paper not found' }, { status: 404 });
    }

    const paper = paperResult[0];

    // Get dean for this college
    const deanResult = await query<any[]>(
      `SELECT id FROM users 
       WHERE role = 'dean' 
       AND college_id = ? 
       AND is_active = TRUE 
       AND deleted_at IS NULL
       LIMIT 1`,
      [paper.college_id]
    );

    const dean = deanResult && deanResult.length > 0 ? deanResult[0] : null;

    // Check permissions
    let canReject = false;
    let newStatus = 'draft'; // Return to draft for revisions
    let workflowAction = '';

    if (session.role === 'hod' && paper.status === 'submitted') {
      canReject = paper.hod_id === session.id;
      newStatus = 'draft'; // Return to draft for lecturer to fix
      workflowAction = 'hod_rejected';
    } else if (session.role === 'dean' && paper.status === 'hod_approved') {
      canReject = dean && dean.id === session.id;
      newStatus = 'draft'; // Return to draft
      workflowAction = 'dean_rejected';
    } else if (session.role === 'admin') {
      canReject = true;
      if (paper.status === 'submitted') {
        workflowAction = 'hod_rejected';
      } else if (paper.status === 'hod_approved') {
        workflowAction = 'dean_rejected';
      }
      newStatus = 'draft';
    }

    if (!canReject) {
      return NextResponse.json(
        { error: 'Not authorized to reject this paper' },
        { status: 403 }
      );
    }

    // Update paper status - return to draft
    await query(
      `UPDATE exam_papers 
       SET status = ?,
           updated_at = NOW()
       WHERE id = ?`,
      [newStatus, paperId]
    );

    // Create workflow history
    await query(
      `INSERT INTO workflow_history 
       (exam_paper_id, action, from_status, to_status, actor_id, actor_role, comments)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [paperId, workflowAction, paper.status, newStatus, session.id, session.role, reason || comments || null]
    );

    // Add rejection comment
    if (comments || reason) {
      await query(
        `INSERT INTO paper_comments 
         (exam_paper_id, user_id, comment_type, comment)
         VALUES (?, ?, 'revision_request', ?)`,
        [paperId, session.id, comments || reason]
      );
    }

    // Notify paper creator
    await query(
      `INSERT INTO notifications 
       (user_id, type, title, message, related_paper_id, action_url, priority)
       VALUES (?, 'paper_rejected', ?, ?, ?, ?, 'high')`,
      [
        paper.created_by,
        `Paper ${paper.paper_code} Rejected`,
        `Your paper has been rejected by the ${session.role.toUpperCase()}. Please review the feedback and resubmit.`,
        paperId,
        `/exam-papers/${paperId}`,
      ]
    );

    return NextResponse.json({
      success: true,
      message: 'Paper rejected and returned for revisions',
      new_status: newStatus,
    });
  } catch (error) {
    console.error('POST /api/exam-papers/[paperId]/reject error:', error);
    return NextResponse.json(
      { error: 'Failed to reject paper', details: String(error) },
      { status: 500 }
    );
  }
}
