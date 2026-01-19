// ============================================================
// src/app/api/print-queue/[paperId]/complete/route.ts
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { verifyAuth } from '@/lib/auth';

export async function POST(
  request: NextRequest,
  { params }: { params: { paperId: string } }
) {
  try {
    const session = await verifyAuth(request);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id: userId, role } = session;

    if (!['exam_master', 'admin'].includes(role)) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }

    const paperId = parseInt(params.paperId);
    const body = await request.json();
    const printQuantity = body.print_quantity || 0;

    // Verify paper exists and is in printing status
    const paperCheck = await query<any[]>(
      `SELECT status FROM exam_papers WHERE id = ? AND deleted_at IS NULL`,
      [paperId]
    );

    if (!paperCheck || paperCheck.length === 0) {
      return NextResponse.json({ error: 'Paper not found' }, { status: 404 });
    }

    if (paperCheck[0].status !== 'printing') {
      return NextResponse.json(
        { error: 'Paper is not currently printing' },
        { status: 400 }
      );
    }

    // Update paper status to printed
    await query(
      `UPDATE exam_papers 
       SET status = 'printed',
           print_quantity = ?,
           printed_at = CURRENT_TIMESTAMP,
           updated_at = CURRENT_TIMESTAMP
       WHERE id = ?`,
      [printQuantity, paperId]
    );

    // Add workflow history
    await query(
      `INSERT INTO workflow_history 
       (exam_paper_id, action, from_status, to_status, actor_id, actor_role, 
        comments, metadata)
       VALUES (?, 'printed', 'printing', 'printed', ?, ?, 'Printing completed', ?)`,
      [paperId, userId, role, JSON.stringify({ print_quantity: printQuantity })]
    );

    // Create notification for paper creator
    const paperInfo = await query<any[]>(
      `SELECT created_by, paper_code FROM exam_papers WHERE id = ?`,
      [paperId]
    );

    if (paperInfo && paperInfo.length > 0) {
      await query(
        `INSERT INTO notifications 
         (user_id, type, title, message, related_paper_id, priority)
         VALUES (?, 'print_completed', 'Printing Completed', ?, ?, 'high')`,
        [
          paperInfo[0].created_by,
          `Printing completed for paper ${paperInfo[0].paper_code}. ${printQuantity} copies printed.`,
          paperId,
        ]
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Printing completed successfully',
    });
  } catch (error) {
    console.error('POST /api/print-queue/[paperId]/complete error:', error);
    return NextResponse.json(
      { error: 'Failed to complete printing', details: String(error) },
      { status: 500 }
    );
  }
}
