// src/app/api/courses/[id]/stats/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { verifyAuth } from '@/lib/auth';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await verifyAuth(req);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const courseId = params.id;

    // Get total study units
    const studyUnitsResults = await query(
      'SELECT COUNT(*) as count FROM study_units WHERE course_id = ?',
      [courseId]
    );
    const studyUnitsResult = Array.isArray(studyUnitsResults) ? studyUnitsResults[0] : null;
    const total_study_units = studyUnitsResult?.count || 0;

    // Get total questions
    const questionsResults = await query(
      'SELECT COUNT(*) as count FROM questions WHERE course_id = ?',
      [courseId]
    );
    const questionsResult = Array.isArray(questionsResults) ? questionsResults[0] : null;
    const total_questions = questionsResult?.count || 0;

    // Get total exam papers
    const papersResults = await query(
      'SELECT COUNT(*) as count FROM exam_papers WHERE course_id = ?',
      [courseId]
    );
    const papersResult = Array.isArray(papersResults) ? papersResults[0] : null;
    const total_papers = papersResult?.count || 0;

    // Get active lecturers with permissions
    const lecturersResults = await query(
      `SELECT COUNT(DISTINCT lecturer_id) as count 
       FROM lecturer_permissions 
       WHERE course_id = ? AND is_active = TRUE`,
      [courseId]
    );
    const lecturersResult = Array.isArray(lecturersResults) ? lecturersResults[0] : null;
    const active_lecturers = lecturersResult?.count || 0;

    const stats = {
      total_study_units,
      total_questions,
      total_papers,
      active_lecturers,
    };

    return NextResponse.json({ stats });
  } catch (error) {
    console.error('Stats fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    );
  }
}