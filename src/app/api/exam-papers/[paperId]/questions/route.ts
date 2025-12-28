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

    // Fetch questions for this paper with parent-child relationships
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
        CONCAT(u.first_name, ' ', u.last_name) as created_by_name,
        parent_epq.question_number as parent_question_number,
        parent_epq.display_number as parent_display_number
      FROM exam_paper_questions epq
      JOIN questions q ON epq.question_id = q.id
      JOIN courses c ON q.course_id = c.id
      LEFT JOIN study_units su ON q.study_unit_id = su.id
      LEFT JOIN users u ON q.created_by = u.id
      LEFT JOIN exam_paper_questions parent_epq ON epq.parent_question_id = parent_epq.id
      WHERE epq.exam_paper_id = ?
      ORDER BY epq.section ASC, epq.sequence_order ASC, epq.indentation_level ASC`,
      [paperId]
    );

    console.log('Found paper questions:', paperQuestions.length);

    // Format the response
    const questions = paperQuestions.map((pq, index) => ({
      id: pq.id,
      question_id: pq.question_id,
      question_number: pq.question_number || (index + 1),
      display_number: pq.display_number,
      sequence_order: pq.sequence_order,
      marks: pq.marks,
      section: pq.section || 'A',
      parent_question_id: pq.parent_question_id,
      indentation_level: pq.indentation_level || 0,
      parent_question_number: pq.parent_question_number,
      parent_display_number: pq.parent_display_number,
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
    const { 
      question_id, 
      marks, 
      section, 
      option_order, 
      parent_question_id, 
      indentation_level,
      is_sub_question 
    } = body;

    console.log('📝 POST Request - Adding question to paper:', { 
      paperId, 
      question_id, 
      marks, 
      section: section || 'A (default)', 
      option_order: option_order ? 'Yes' : 'No',
      parent_question_id: parent_question_id || 'None (main question)',
      indentation_level: indentation_level || 0,
      is_sub_question: is_sub_question || false
    });

    // Validation
    if (!question_id) {
      console.error('❌ Validation failed: question_id is missing');
      return NextResponse.json(
        { error: 'question_id is required' },
        { status: 400 }
      );
    }

    // If this is a sub-question, validate parent exists
    if (parent_question_id) {
      const parentExists = await query<any[]>(
        'SELECT id, section, sequence_order, question_number FROM exam_paper_questions WHERE id = ? AND exam_paper_id = ?',
        [parent_question_id, paperId]
      );

      if (parentExists.length === 0) {
        console.error('❌ Parent question not found:', parent_question_id);
        return NextResponse.json(
          { error: 'Parent question not found in this paper' },
          { status: 404 }
        );
      }

      console.log('✅ Parent question found:', parentExists[0]);
      
      // Sub-questions MUST inherit parent's section - override whatever was sent
      if (parentExists[0].section) {
        const inheritedSection = parentExists[0].section;
        console.log(`📌 Sub-question inheriting parent's section: ${inheritedSection} (overriding sent section: ${section || 'A'})`);
        // We'll use this inherited section later
      }
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

    console.log('📋 Question type:', questions[0].question_type);

    // Prevent MCQs and True/False from being added as sub-questions
    if (parent_question_id) {
      const questionType = questions[0].question_type.toLowerCase().replace(/\s+/g, '_');
      console.log('📋 Normalized question type:', questionType);
      
      if (questionType === 'multiple_choice' || questionType === 'true_false') {
        console.error('❌ MCQs and True/False questions cannot be added as sub-questions');
        return NextResponse.json(
          { error: 'Multiple choice and True/False questions cannot be added as sub-questions' },
          { status: 400 }
        );
      }
      
      console.log('✅ Question type is valid for sub-question:', questionType);
    }

    // Check if question is already added to this paper (allow if it's a sub-question in different contexts)
    const existing = await query<any[]>(
      'SELECT id, parent_question_id FROM exam_paper_questions WHERE exam_paper_id = ? AND question_id = ? AND (parent_question_id <=> ?)',
      [paperId, question_id, parent_question_id || null]
    );

    console.log('🔍 Duplicate check:', existing.length > 0 ? 'Already exists in this context' : 'New question');

    if (existing.length > 0) {
      console.error('❌ Question already added to paper in this context');
      return NextResponse.json(
        { error: 'Question already added to this paper in this context' },
        { status: 409 }
      );
    }

    // Get the next sequence_order for the specified section
    let sectionValue: string;
    let nextSequenceOrder: number;
    
    if (parent_question_id) {
      // For sub-questions, inherit parent's section but get their OWN sequence order
      const parentInfo = await query<any[]>(
        'SELECT section, sequence_order FROM exam_paper_questions WHERE id = ?',
        [parent_question_id]
      );
      
      if (parentInfo.length === 0) {
        console.error('❌ Parent not found when fetching section/sequence');
        return NextResponse.json(
          { error: 'Parent question not found' },
          { status: 404 }
        );
      }
      
      sectionValue = parentInfo[0].section;
      
      // FIXED: Get the next sequence_order for sub-questions under this parent
      // Sub-questions have their own sequence numbering (1, 2, 3...) within the parent
      const maxSubSeq = await query<any[]>(
        'SELECT COALESCE(MAX(sequence_order), 0) + 1 as next_seq FROM exam_paper_questions WHERE exam_paper_id = ? AND parent_question_id = ?',
        [paperId, parent_question_id]
      );
      nextSequenceOrder = maxSubSeq[0]?.next_seq || 1;
      
      console.log('📌 Sub-question assigned:', { 
        section: sectionValue, 
        sequence_order: nextSequenceOrder,
        parent_id: parent_question_id,
        note: 'Sub-questions have their own sequence within parent'
      });
    } else {
      // For main questions, use provided section and get next sequence
      sectionValue = section || 'A';
      const maxSeq = await query<any[]>(
        'SELECT COALESCE(MAX(sequence_order), 0) + 1 as next_seq FROM exam_paper_questions WHERE exam_paper_id = ? AND section = ? AND parent_question_id IS NULL',
        [paperId, sectionValue]
      );
      nextSequenceOrder = maxSeq[0]?.next_seq || 1;
      
      console.log('📌 Main question assigned:', { 
        section: sectionValue, 
        sequence_order: nextSequenceOrder 
      });
    }

    console.log('🔢 Final values - Section:', sectionValue, 'Sequence:', nextSequenceOrder);

    // Generate question number based on parent and indentation level
    let questionNumber = String(nextSequenceOrder);
    let displayNumber = questionNumber;
    let subQuestionLabel = null;

    if (parent_question_id) {
      // Get parent's question number
      const parentInfo = await query<any[]>(
        'SELECT question_number, indentation_level FROM exam_paper_questions WHERE id = ?',
        [parent_question_id]
      );
      
      if (parentInfo.length > 0) {
        const parentNumber = parentInfo[0].question_number;
        const level = indentation_level || 1;

        // Count existing sub-questions at this level under this parent
        const subQuestionCount = await query<any[]>(
          'SELECT COUNT(*) as count FROM exam_paper_questions WHERE parent_question_id = ? AND indentation_level = ?',
          [parent_question_id, level]
        );
        const subIndex = (subQuestionCount[0]?.count || 0) + 1;

        // Generate numbering based on indentation level
        if (level === 1) {
          // Level 1: a, b, c, d...
          const letter = String.fromCharCode(96 + subIndex); // 97 is 'a'
          subQuestionLabel = letter;
          questionNumber = `${parentNumber}${letter}`;
          displayNumber = `${parentNumber}(${letter})`;
        } else if (level === 2) {
          // Level 2: i, ii, iii, iv...
          const roman = ['i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii', 'viii', 'ix', 'x'];
          const romanNumeral = roman[subIndex - 1] || `(${subIndex})`;
          subQuestionLabel = romanNumeral;
          questionNumber = `${parentNumber}${romanNumeral}`;
          displayNumber = `${parentNumber}(${romanNumeral})`;
        } else {
          // Level 3+: numeric
          subQuestionLabel = String(subIndex);
          questionNumber = `${parentNumber}.${subIndex}`;
          displayNumber = questionNumber;
        }
      }
    }

    console.log('🔢 Generated question number:', questionNumber, 'Display:', displayNumber, 'Sub-label:', subQuestionLabel);

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
        display_number,
        sub_question_label,
        sequence_order,
        marks,
        section,
        option_order,
        is_required,
        parent_question_id,
        indentation_level
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        paperId, 
        question_id, 
        questionNumber,                // question_number (e.g., "2a", "3i")
        displayNumber,                 // display_number (e.g., "2(a)", "3(i)")
        subQuestionLabel,              // sub_question_label (e.g., "a", "i")
        nextSequenceOrder,             // sequence_order (unique within parent or section)
        marks || questions[0].marks,   // marks
        sectionValue,                  // section (A, B, C, etc.)
        optionOrderValue,              // option_order (JSON string or null)
        1,                             // is_required
        parent_question_id || null,    // parent_question_id
        indentation_level || 0         // indentation_level
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
      message: is_sub_question ? 'Sub-question added successfully' : 'Question added to paper successfully',
      data: {
        question_id,
        section: sectionValue,
        sequence_order: nextSequenceOrder,
        marks: marks || questions[0].marks,
        question_number: questionNumber,
        display_number: displayNumber,
        sub_question_label: subQuestionLabel,
        parent_question_id: parent_question_id || null,
        indentation_level: indentation_level || 0
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
    const epqId = searchParams.get('epq_id'); // exam_paper_question id

    console.log('🗑️  DELETE Request - Removing question:', { paperId, questionId, epqId });

    if (!questionId && !epqId) {
      console.error('❌ Validation failed: question_id or epq_id is required');
      return NextResponse.json(
        { error: 'question_id or epq_id is required' },
        { status: 400 }
      );
    }

    let whereClause = 'exam_paper_id = ?';
    const whereParams: any[] = [paperId];

    if (epqId) {
      // Delete by exam_paper_question id (more specific, good for sub-questions)
      whereClause += ' AND id = ?';
      whereParams.push(epqId);
    } else if (questionId) {
      // Delete by question_id (legacy support)
      whereClause += ' AND question_id = ?';
      whereParams.push(questionId);
    }

    // Check if the question is in this paper
    const existing = await query<any[]>(
      `SELECT id, question_id, section, parent_question_id FROM exam_paper_questions WHERE ${whereClause}`,
      whereParams
    );

    console.log('🔍 Question lookup:', existing.length > 0 ? `Found in section ${existing[0].section}` : 'Not found');

    if (existing.length === 0) {
      console.error('❌ Question not found in paper');
      return NextResponse.json(
        { error: 'Question not found in this paper' },
        { status: 404 }
      );
    }

    const questionToDelete = existing[0];

    // Check if this question has sub-questions
    const subQuestions = await query<any[]>(
      'SELECT id FROM exam_paper_questions WHERE parent_question_id = ?',
      [questionToDelete.id]
    );

    if (subQuestions.length > 0) {
      console.log('⚠️  Question has', subQuestions.length, 'sub-questions');
      // Delete all sub-questions first (cascade)
      await query(
        'DELETE FROM exam_paper_questions WHERE parent_question_id = ?',
        [questionToDelete.id]
      );
      console.log('✅ Deleted', subQuestions.length, 'sub-questions');
      
      // Decrement usage count for each sub-question
      for (const subQ of subQuestions) {
        const subQDetails = await query<any[]>(
          'SELECT question_id FROM exam_paper_questions WHERE id = ?',
          [subQ.id]
        );
        if (subQDetails.length > 0) {
          await query(
            'UPDATE questions SET usage_count = GREATEST(usage_count - 1, 0) WHERE id = ?',
            [subQDetails[0].question_id]
          );
        }
      }
    }

    // Delete the question from the paper
    console.log('💾 Deleting from database...');
    await query(
      `DELETE FROM exam_paper_questions WHERE ${whereClause}`,
      whereParams
    );

    // Decrement question usage count
    await query(
      'UPDATE questions SET usage_count = GREATEST(usage_count - 1, 0) WHERE id = ?',
      [questionToDelete.question_id]
    );

    console.log('✅ Question removed successfully');

    return NextResponse.json({
      success: true,
      message: 'Question removed from paper successfully',
      sub_questions_deleted: subQuestions.length
    });
  } catch (error) {
    console.error('❌ DELETE /api/exam-papers/[paperId]/questions error:', error);
    return NextResponse.json(
      { error: 'Failed to remove question from paper', details: String(error) },
      { status: 500 }
    );
  }
}