/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/api/exam-papers/[paperId]/questions/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getPool } from '@/lib/db';
import { verifyAuth } from '@/lib/auth';

// Generic query helper
async function query<T>(sql: string, params: any[] = []): Promise<T> {
  try {
    const pool = getPool();
    const [rows] = await pool.execute(sql, params);
    return rows as T;
  } catch (error) {
    console.error('Database query error:', error);
    throw new Error('Database query failed');
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: { paperId: string } | Promise<{ paperId: string }> }
) {
  try {
    const resolvedParams = params instanceof Promise ? await params : params;
    const paperId = resolvedParams.paperId;

    const user = await verifyAuth(req);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    console.log('Fetching questions for paper ID:', paperId);

    // Fetch questions for this paper
    const paperQuestions = await query<any[]>(
      `SELECT 
        epq.*,
        q.question_text,
        q.question_type,
        q.difficulty_level,
        q.bloom_taxonomy as bloom_level,
        q.options,
        q.correct_answer,
        c.code as course_code,
        c.title as course_title,
        su.name as study_unit_title,
        q.usage_count,
        CONCAT(u.first_name, ' ', u.last_name) as created_by_name
      FROM exam_paper_questions epq
      JOIN questions q ON epq.question_id = q.id
      JOIN courses c ON q.course_id = c.id
      LEFT JOIN study_units su ON q.study_unit_id = su.id
      LEFT JOIN users u ON q.created_by = u.id
      WHERE epq.exam_paper_id = ?
      ORDER BY epq.section ASC, epq.sequence_order ASC`,
      [paperId]
    );

    console.log('Found paper questions:', paperQuestions.length);

    // Format the response
    const questions = paperQuestions.map((pq, index) => ({
      question_id: pq.question_id,
      question_number: pq.question_number || (index + 1),
      sequence_order: pq.sequence_order,
      marks: pq.marks,
      section: pq.section || 'A',
      option_order: pq.option_order ? (typeof pq.option_order === 'string' ? JSON.parse(pq.option_order) : pq.option_order) : null,
      question: {
        id: pq.question_id,
        question_text: pq.question_text,
        question_type: pq.question_type,
        marks: pq.marks,
        difficulty_level: pq.difficulty_level,
        bloom_level: pq.bloom_level,
        course_code: pq.course_code,
        course_title: pq.course_title,
        study_unit_title: pq.study_unit_title,
        created_by_name: pq.created_by_name,
        usage_count: pq.usage_count,
        options: pq.options ? (typeof pq.options === 'string' ? JSON.parse(pq.options) : pq.options) : null,
        correct_answer: pq.correct_answer,
      }
    }));

    return NextResponse.json({
      success: true,
      questions,
      count: questions.length,
    });
  } catch (error) {
    console.error('GET /api/exam-papers/[paperId]/questions error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch paper questions', details: String(error) },
      { status: 500 }
    );
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { paperId: string } | Promise<{ paperId: string }> }
) {
  try {
    const resolvedParams = params instanceof Promise ? await params : params;
    const paperId = resolvedParams.paperId;

    const user = await verifyAuth(req);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { question_id, marks, section, option_order } = body;

    console.log('📝 POST Request - Adding question to paper:', { 
      paperId, 
      question_id, 
      marks, 
      section: section || 'A (default)', 
      option_order: option_order ? 'Yes' : 'No' 
    });

    // Validation
    if (!question_id) {
      console.error('❌ Validation failed: question_id is missing');
      return NextResponse.json(
        { error: 'question_id is required' },
        { status: 400 }
      );
    }

    // Check if question exists
    const questions = await query<any[]>(
      'SELECT id, marks, question_type FROM questions WHERE id = ? AND is_active = 1',
      [question_id]
    );

    console.log('🔍 Question lookup result:', questions.length > 0 ? 'Found' : 'Not found');

    if (questions.length === 0) {
      console.error('❌ Question not found or inactive:', question_id);
      return NextResponse.json(
        { error: 'Question not found or inactive' },
        { status: 404 }
      );
    }

    // Check if question is already added to this paper
    const existing = await query<any[]>(
      'SELECT id FROM exam_paper_questions WHERE exam_paper_id = ? AND question_id = ?',
      [paperId, question_id]
    );

    console.log('🔍 Duplicate check:', existing.length > 0 ? 'Already exists' : 'New question');

    if (existing.length > 0) {
      console.error('❌ Question already added to paper');
      return NextResponse.json(
        { error: 'Question already added to this paper' },
        { status: 409 }
      );
    }

    // Get the next sequence_order for the specified section
    const sectionValue = section || 'A';
    console.log('📌 Section value:', sectionValue);

    const maxSeq = await query<any[]>(
      'SELECT COALESCE(MAX(sequence_order), 0) + 1 as next_seq FROM exam_paper_questions WHERE exam_paper_id = ? AND section = ?',
      [paperId, sectionValue]
    );
    const nextSequenceOrder = maxSeq[0]?.next_seq || 1;

    console.log('🔢 Next sequence order for section', sectionValue, ':', nextSequenceOrder);

    // Prepare option_order for storage (convert to JSON string if it's an array)
    let optionOrderValue = null;
    if (option_order && Array.isArray(option_order)) {
      optionOrderValue = JSON.stringify(option_order);
      console.log('🔀 Option order saved:', optionOrderValue);
    }

    // Add question to paper
    console.log('💾 Inserting into database...');
    const result = await query<any>(
      `INSERT INTO exam_paper_questions (
        exam_paper_id,
        question_id,
        question_number,
        sequence_order,
        marks,
        section,
        option_order,
        is_required
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        paperId, 
        question_id, 
        String(nextSequenceOrder),    // question_number
        nextSequenceOrder,             // sequence_order
        marks || questions[0].marks,   // marks
        sectionValue,                  // section (A, B, C, etc.)
        optionOrderValue,              // option_order (JSON string or null)
        1                              // is_required
      ]
    );

    console.log('✅ Insert successful. Result:', result);

    // Update question usage count
    await query(
      'UPDATE questions SET usage_count = usage_count + 1 WHERE id = ?',
      [question_id]
    );

    console.log('✅ Question usage count updated');

    const response = {
      success: true,
      message: 'Question added to paper successfully',
      data: {
        question_id,
        section: sectionValue,
        sequence_order: nextSequenceOrder,
        marks: marks || questions[0].marks
      }
    };

    console.log('✅ Sending success response:', response);

    return NextResponse.json(response);
  } catch (error) {
    console.error('❌ POST /api/exam-papers/[paperId]/questions error:', error);
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');
    
    return NextResponse.json(
      { 
        error: 'Failed to add question to paper', 
        message: error instanceof Error ? error.message : String(error),
        details: String(error) 
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { paperId: string } | Promise<{ paperId: string }> }
) {
  try {
    const resolvedParams = params instanceof Promise ? await params : params;
    const paperId = resolvedParams.paperId;

    const user = await verifyAuth(req);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get question_id from URL search params
    const { searchParams } = new URL(req.url);
    const questionId = searchParams.get('question_id');

    console.log('🗑️  DELETE Request - Removing question:', { paperId, questionId });

    if (!questionId) {
      console.error('❌ Validation failed: question_id is missing');
      return NextResponse.json(
        { error: 'question_id is required' },
        { status: 400 }
      );
    }

    // Check if the question is in this paper
    const existing = await query<any[]>(
      'SELECT id, question_id, section FROM exam_paper_questions WHERE exam_paper_id = ? AND question_id = ?',
      [paperId, questionId]
    );

    console.log('🔍 Question lookup:', existing.length > 0 ? `Found in section ${existing[0].section}` : 'Not found');

    if (existing.length === 0) {
      console.error('❌ Question not found in paper');
      return NextResponse.json(
        { error: 'Question not found in this paper' },
        { status: 404 }
      );
    }

    // Delete the question from the paper
    console.log('💾 Deleting from database...');
    await query(
      'DELETE FROM exam_paper_questions WHERE exam_paper_id = ? AND question_id = ?',
      [paperId, questionId]
    );

    // Decrement question usage count
    await query(
      'UPDATE questions SET usage_count = GREATEST(usage_count - 1, 0) WHERE id = ?',
      [questionId]
    );

    console.log('✅ Question removed successfully');

    return NextResponse.json({
      success: true,
      message: 'Question removed from paper successfully'
    });
  } catch (error) {
    console.error('❌ DELETE /api/exam-papers/[paperId]/questions error:', error);
    return NextResponse.json(
      { error: 'Failed to remove question from paper', details: String(error) },
      { status: 500 }
    );
  }
}