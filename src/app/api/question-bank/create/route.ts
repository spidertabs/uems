/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/api/question-bank/create/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { verifyAuth } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const session = await verifyAuth(request);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { role, id: user_id, department_id } = session;
    const body = await request.json();

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
    } = body;

    // Required fields check
    if (!course_id || !question_type || !question_text || !marks) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // ----- ROLE PERMISSIONS -----

    if (role === 'lecturer') {
      const permissions = await query<any[]>(
        `SELECT id FROM lecturer_permissions 
         WHERE lecturer_id = ? AND course_id = ? 
         AND is_active = TRUE AND can_add_questions = TRUE`,
        [user_id, course_id]
      );

      if (permissions.length === 0) {
        return NextResponse.json(
          { error: 'You do not have permission to add questions for this course' },
          { status: 403 }
        );
      }
    }

    if (role === 'hod') {
      const courses = await query<any[]>(
        `SELECT id FROM courses WHERE id = ? AND department_id = ?`,
        [course_id, department_id]
      );

      if (courses.length === 0) {
        return NextResponse.json(
          { error: 'Course not found in your department' },
          { status: 403 }
        );
      }
    }

    // ----- INSERT QUESTION -----

    const result = await query<any>(
      `INSERT INTO questions (
        course_id, study_unit_id, created_by, question_type, difficulty_level,
        question_text, options, correct_answer, marks, time_allocation,
        learning_outcome, keywords, bloom_taxonomy, tags,
        approved_by, approved_at
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        course_id,
        study_unit_id || null,
        user_id,
        question_type,
        difficulty_level || 'medium',
        question_text,
        options ? JSON.stringify(options) : null,
        correct_answer || null,
        marks,
        time_allocation || null,
        learning_outcome || null,
        keywords || null,
        bloom_taxonomy || 'understand',
        tags ? JSON.stringify(tags) : null,
        role === 'hod' ? user_id : null,
        role === 'hod' ? new Date() : null,
      ]
    );

    const questionId = result.insertId;

    // ----- AUDIT LOG -----

    await query(
      `INSERT INTO audit_logs (user_id, action, entity_type, entity_id, new_values)
       VALUES (?, 'create', 'question', ?, ?)`,
      [user_id, questionId, JSON.stringify(body)]
    );

    return NextResponse.json({
      message: 'Question created successfully',
      questionId,
    });
  } catch (error) {
    console.error('Error creating question:', error);
    return NextResponse.json(
      { error: 'Failed to create question' },
      { status: 500 }
    );
  }
}
