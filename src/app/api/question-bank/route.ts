/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/api/question-bank/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { verifyAuth } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const session = await verifyAuth(request);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { role, id: user_id, department_id, college_id } = session;

    let sql = `
      SELECT 
        q.id,
        q.course_id,
        c.code as course_code,
        c.title as course_name,
        su.name as study_unit_name,
        q.question_type,
        q.difficulty_level,
        q.question_text,
        q.options,
        q.correct_answer,
        q.marks,
        q.time_allocation,
        q.learning_outcome,
        q.keywords,
        q.bloom_taxonomy,
        q.tags,
        q.usage_count,
        q.is_active,
        CONCAT(creator.first_name, ' ', creator.last_name) as created_by_name,
        CONCAT(approver.first_name, ' ', approver.last_name) as approved_by_name,
        q.approved_at,
        q.created_at,
        q.updated_at
      FROM questions q
      JOIN courses c ON q.course_id = c.id
      LEFT JOIN study_units su ON q.study_unit_id = su.id
      LEFT JOIN users creator ON q.created_by = creator.id
      LEFT JOIN users approver ON q.approved_by = approver.id
    `;

    const params: any[] = [];

    // Filter based on role
    if (role === 'lecturer') {
      // Lecturers see questions from courses they have permission for or created
      sql += `
        WHERE (q.created_by = ? OR EXISTS (
          SELECT 1 FROM lecturer_permissions lp 
          WHERE lp.lecturer_id = ? 
          AND lp.course_id = q.course_id 
          AND lp.is_active = TRUE
        ))
      `;
      params.push(user_id, user_id);
    } else if (role === 'hod') {
      // HODs see all questions in their department
      sql += ` WHERE c.department_id = ?`;
      params.push(department_id);
    } else if (role === 'dean') {
      // Deans see all questions in their college
      sql += ` WHERE c.college_id = ?`;
      params.push(college_id);
    }
    // Admin sees all questions (no filter)

    sql += ` ORDER BY q.created_at DESC`;

    const questions = await query<any[]>(sql, params);

    // Parse JSON fields
    const processedQuestions = questions.map(q => ({
      ...q,
      options: q.options ? JSON.parse(q.options) : null,
      tags: q.tags ? JSON.parse(q.tags) : null,
    }));

    return NextResponse.json({ 
      questions: processedQuestions,
      count: processedQuestions.length 
    });
  } catch (error) {
    console.error('Error fetching questions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch questions' },
      { status: 500 }
    );
  }
}