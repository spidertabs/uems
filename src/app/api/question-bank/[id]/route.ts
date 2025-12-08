/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/api/question-bank/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { verifyAuth } from '@/lib/auth';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await verifyAuth(request);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const questionId = params.id;

    const questions = await query<any[]>(
      `SELECT 
        q.*,
        c.code as course_code,
        c.title as course_name,
        su.name as study_unit_name,
        CONCAT(creator.first_name, ' ', creator.last_name) as created_by_name,
        CONCAT(approver.first_name, ' ', approver.last_name) as approved_by_name
      FROM questions q
      JOIN courses c ON q.course_id = c.id
      LEFT JOIN study_units su ON q.study_unit_id = su.id
      LEFT JOIN users creator ON q.created_by = creator.id
      LEFT JOIN users approver ON q.approved_by = approver.id
      WHERE q.id = ?`,
      [questionId]
    );

    if (questions.length === 0) {
      return NextResponse.json({ error: 'Question not found' }, { status: 404 });
    }

    const question = questions[0];

    // Parse JSON fields
    question.options = question.options ? JSON.parse(question.options) : null;
    question.tags = question.tags ? JSON.parse(question.tags) : null;

    return NextResponse.json({ question });
  } catch (error) {
    console.error('Error fetching question:', error);
    return NextResponse.json(
      { error: 'Failed to fetch question' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await verifyAuth(request);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { role, id: user_id } = session;
    const body = await request.json();
    const questionId = params.id;

    const {
      course_id,
      study_unit_id,
      question_type,
      difficulty_level,
      question_text,
      options,
      correct_answer,
      marks,
      time_allocation,
      learning_outcome,
      keywords,
      bloom_taxonomy,
      tags,
      is_active,
    } = body;

    // Check if question exists and get current data
    const existing = await query<any[]>(
      'SELECT * FROM questions WHERE id = ?',
      [questionId]
    );

    if (existing.length === 0) {
      return NextResponse.json({ error: 'Question not found' }, { status: 404 });
    }

    const currentQuestion = existing[0];

    // Check permissions
    if (role === 'lecturer') {
      // Lecturers can only edit their own questions
      if (currentQuestion.created_by !== user_id) {
        return NextResponse.json({ error: 'Permission denied' }, { status: 403 });
      }
    }
    // HOD and admin can edit any question

    // Update question
    await query(
      `UPDATE questions SET
        course_id = ?,
        study_unit_id = ?,
        question_type = ?,
        difficulty_level = ?,
        question_text = ?,
        options = ?,
        correct_answer = ?,
        marks = ?,
        time_allocation = ?,
        learning_outcome = ?,
        keywords = ?,
        bloom_taxonomy = ?,
        tags = ?,
        is_active = ?,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?`,
      [
        course_id || currentQuestion.course_id,
        study_unit_id !== undefined ? study_unit_id : currentQuestion.study_unit_id,
        question_type || currentQuestion.question_type,
        difficulty_level || currentQuestion.difficulty_level,
        question_text || currentQuestion.question_text,
        options ? JSON.stringify(options) : currentQuestion.options,
        correct_answer !== undefined ? correct_answer : currentQuestion.correct_answer,
        marks !== undefined ? marks : currentQuestion.marks,
        time_allocation !== undefined ? time_allocation : currentQuestion.time_allocation,
        learning_outcome !== undefined ? learning_outcome : currentQuestion.learning_outcome,
        keywords !== undefined ? keywords : currentQuestion.keywords,
        bloom_taxonomy || currentQuestion.bloom_taxonomy,
        tags ? JSON.stringify(tags) : currentQuestion.tags,
        is_active !== undefined ? is_active : currentQuestion.is_active,
        questionId,
      ]
    );

    // Log the action
    await query(
      `INSERT INTO audit_logs (user_id, action, entity_type, entity_id, old_values, new_values)
       VALUES (?, 'update', 'question', ?, ?, ?)`,
      [user_id, questionId, JSON.stringify(currentQuestion), JSON.stringify(body)]
    );

    return NextResponse.json({ message: 'Question updated successfully' });
  } catch (error) {
    console.error('Error updating question:', error);
    return NextResponse.json(
      { error: 'Failed to update question' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await verifyAuth(request);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { role, id: user_id } = session;
    const questionId = params.id;

    // Only HOD and admin can delete questions
    if (role !== 'hod' && role !== 'admin') {
      return NextResponse.json({ error: 'Permission denied' }, { status: 403 });
    }

    // Check if question is used in any exam papers
    const usage = await query<any[]>(
      'SELECT COUNT(*) as count FROM exam_paper_questions WHERE question_id = ?',
      [questionId]
    );

    if (usage[0].count > 0) {
      return NextResponse.json(
        { error: 'Cannot delete question that is used in exam papers. Deactivate it instead.' },
        { status: 400 }
      );
    }

    // Get question data before deletion for audit
    const questions = await query<any[]>(
      'SELECT * FROM questions WHERE id = ?',
      [questionId]
    );

    if (questions.length === 0) {
      return NextResponse.json({ error: 'Question not found' }, { status: 404 });
    }

    const question = questions[0];

    // Delete question
    await query('DELETE FROM questions WHERE id = ?', [questionId]);

    // Log the action
    await query(
      `INSERT INTO audit_logs (user_id, action, entity_type, entity_id, old_values)
       VALUES (?, 'delete', 'question', ?, ?)`,
      [user_id, questionId, JSON.stringify(question)]
    );

    return NextResponse.json({ message: 'Question deleted successfully' });
  } catch (error) {
    console.error('Error deleting question:', error);
    return NextResponse.json(
      { error: 'Failed to delete question' },
      { status: 500 }
    );
  }
}