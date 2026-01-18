/* eslint-disable @typescript-eslint/no-explicit-any */
// ============================================================
// src/app/api/exam-papers/[paperId]/print/route.ts
import { verifyAuth } from "@/lib/auth";
import { query } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

// ============================================================
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ paperId: string }> }
) {
  try {
    const session = await verifyAuth(request);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Only exam_master and admin can print
    if (session.role !== 'exam_master' && session.role !== 'admin') {
      return NextResponse.json(
        { error: 'Only Exam Masters can print papers' },
        { status: 403 }
      );
    }

    const { paperId } = await params;
    const body = await request.json();
    const { action, print_quantity } = body; // action: 'start' or 'complete'

    // Get paper details
    const paperResult = await query<any[]>(
      'SELECT ep.*, c.title as course_title FROM exam_papers ep JOIN courses c ON ep.course_id = c.id WHERE ep.id = ?',
      [paperId]
    );

    if (!paperResult || paperResult.length === 0) {
      return NextResponse.json({ error: 'Paper not found' }, { status: 404 });
    }

    const paper = paperResult[0];

    // Check if paper is ready for print
    if (paper.status !== 'ready_for_print' && paper.status !== 'printing') {
      return NextResponse.json(
        { error: 'Paper is not ready for printing' },
        { status: 400 }
      );
    }

    let newStatus = '';
    let workflowAction = '';

    if (action === 'start') {
      // Start printing
      newStatus = 'printing';
      workflowAction = 'printing_started';

      await query(
        `UPDATE exam_papers 
         SET status = ?,
             exam_master_id = ?,
             print_quantity = ?,
             updated_at = NOW()
         WHERE id = ?`,
        [newStatus, session.id, print_quantity || 0, paperId]
      );
    } else if (action === 'complete') {
      // Complete printing
      newStatus = 'printed';
      workflowAction = 'printed';

      await query(
        `UPDATE exam_papers 
         SET status = ?,
             printed_at = NOW(),
             updated_at = NOW()
         WHERE id = ?`,
        [newStatus, paperId]
      );
    } else {
      return NextResponse.json(
        { error: 'Invalid action. Use "start" or "complete"' },
        { status: 400 }
      );
    }

    // Create workflow history
    const metadata = action === 'start' && print_quantity 
      ? JSON.stringify({ print_quantity })
      : null;

    await query(
      `INSERT INTO workflow_history 
       (exam_paper_id, action, from_status, to_status, actor_id, actor_role, metadata)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [paperId, workflowAction, paper.status, newStatus, session.id, session.role, metadata]
    );

    // Notify paper creator when printing is complete
    if (action === 'complete') {
      await query(
        `INSERT INTO notifications 
         (user_id, type, title, message, related_paper_id, action_url, priority)
         VALUES (?, 'print_completed', ?, ?, ?, ?, 'medium')`,
        [
          paper.created_by,
          `Paper ${paper.paper_code} Printed`,
          `Your exam paper has been successfully printed${paper.print_quantity ? ` (${paper.print_quantity} copies)` : ''}.`,
          paperId,
          `/exam-papers/${paperId}`,
        ]
      );

      // Also notify HOD
      if (paper.hod_id) {
        await query(
          `INSERT INTO notifications 
           (user_id, type, title, message, related_paper_id, action_url, priority)
           VALUES (?, 'print_completed', ?, ?, ?, ?, 'low')`,
          [
            paper.hod_id,
            `Paper ${paper.paper_code} Printed`,
            `Exam paper for ${paper.course_title} has been printed.`,
            paperId,
            `/exam-papers/${paperId}`,
          ]
        );
      }
    }

    return NextResponse.json({
      success: true,
      message: action === 'start' 
        ? 'Printing started successfully' 
        : 'Printing completed successfully',
      new_status: newStatus,
      print_quantity: action === 'start' ? print_quantity : paper.print_quantity,
    });
  } catch (error) {
    console.error('POST /api/exam-papers/[paperId]/print error:', error);
    return NextResponse.json(
      { error: 'Failed to process print request', details: String(error) },
      { status: 500 }
    );
  }
}