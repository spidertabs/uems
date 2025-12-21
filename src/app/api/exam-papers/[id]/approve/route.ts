// src/app/api/exam-papers/[id]/approve/route.ts
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
    const body = await request.json();
    const { action, comments } = body; // action: 'approve' or 'reject'

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

    // Check permissions based on role and current status
    let canApprove = false;
    let newStatus = '';
    let workflowAction = '';

    if (session.role === 'hod' && paper.status === 'submitted') {
      canApprove = paper.department_id === session.department_id;
      newStatus = action === 'approve' ? 'hod_approved' : 'hod_rejected';
      workflowAction = action === 'approve' ? 'hod_approved' : 'hod_rejected';
    } else if (session.role === 'dean' && paper.status === 'hod_approved') {
      canApprove = paper.college_id === session.college_id;
      newStatus = action === 'approve' ? 'dean_approved' : 'dean_rejected';
      workflowAction = action === 'approve' ? 'dean_approved' : 'dean_rejected';
    } else if (session.role === 'admin') {
      canApprove = true;
      if (paper.status === 'submitted') {
        newStatus = action === 'approve' ? 'hod_approved' : 'hod_rejected';
        workflowAction = action === 'approve' ? 'hod_approved' : 'hod_rejected';
      } else if (paper.status === 'hod_approved') {
        newStatus = action === 'approve' ? 'ready_for_print' : 'dean_rejected';
        workflowAction = action === 'approve' ? 'ready_for_print' : 'dean_rejected';
      }
    }

    if (!canApprove) {
      return NextResponse.json(
        { error: 'Not authorized to approve/reject this paper' },
        { status: 403 }
      );
    }

    // Update paper status
    const updateSql = `
      UPDATE exam_papers 
      SET status = ?, 
          ${session.role === 'hod' ? 'hod_approved_at' : 'dean_approved_at'} = ${action === 'approve' ? 'NOW()' : 'NULL'}
      WHERE id = ?
    `;
    
    await query(updateSql, [newStatus, paperId]);

    // Create workflow history
    await query(
      `INSERT INTO workflow_history 
       (exam_paper_id, action, from_status, to_status, actor_id, actor_role, comments)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [paperId, workflowAction, paper.status, newStatus, session.id, session.role, comments || null]
    );

    // Add comment if provided
    if (comments) {
      await query(
        `INSERT INTO paper_comments 
         (exam_paper_id, user_id, comment_type, comment)
         VALUES (?, ?, ?, ?)`,
        [
          paperId,
          session.id,
          action === 'approve' ? 'hod_approval_note' : 'revision_request',
          comments,
        ]
      );
    }

    // Create notification for paper creator
    const notificationTitle = action === 'approve' 
      ? `Paper ${paper.paper_code} Approved`
      : `Paper ${paper.paper_code} Rejected`;
    
    const notificationMessage = action === 'approve'
      ? `Your paper has been approved by the ${session.role.toUpperCase()}.`
      : `Your paper has been rejected. Please review the feedback and make necessary changes.`;

    await query(
      `INSERT INTO notifications 
       (user_id, type, title, message, related_paper_id, action_url, priority)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        paper.created_by,
        action === 'approve' ? 'paper_approved' : 'paper_rejected',
        notificationTitle,
        notificationMessage,
        paperId,
        `/exam-papers/${paperId}`,
        action === 'reject' ? 'high' : 'medium',
      ]
    );

    // If approved by HOD and there's a dean, notify dean
    if (action === 'approve' && newStatus === 'hod_approved' && paper.dean_id) {
      await query(
        `INSERT INTO notifications 
         (user_id, type, title, message, related_paper_id, action_url, priority)
         VALUES (?, 'approval_required', ?, ?, ?, ?, 'high')`,
        [
          paper.dean_id,
          'Paper Awaiting Final Approval',
          `${paper.paper_code} has been approved by HOD and requires your final review.`,
          paperId,
          `/exam-papers/${paperId}`,
        ]
      );
    }

    // If ready for print, notify exam master
    if (newStatus === 'ready_for_print') {
      const examMasters = await query<any[]>(
        "SELECT id FROM users WHERE role = 'exam_master' AND is_active = TRUE"
      );
      
      for (const master of examMasters) {
        await query(
          `INSERT INTO notifications 
           (user_id, type, title, message, related_paper_id, action_url, priority)
           VALUES (?, 'ready_for_print', ?, ?, ?, ?, 'medium')`,
          [
            master.id,
            'Paper Ready for Printing',
            `${paper.paper_code} has been approved and is ready for printing.`,
            paperId,
            `/exam-papers/${paperId}`,
          ]
        );
      }
    }

    return NextResponse.json({
      success: true,
      message: `Paper ${action === 'approve' ? 'approved' : 'rejected'} successfully`,
      new_status: newStatus,
    });
  } catch (error) {
    console.error('POST /api/exam-papers/[id]/approve error:', error);
    return NextResponse.json(
      { error: 'Failed to process approval', details: String(error) },
      { status: 500 }
    );
  }
}