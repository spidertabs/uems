// src/app/print-queue/[paperId]/page.tsx
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

interface PaperQuestion {
  id: number;
  question_number: string;
  sub_question_label: string | null;
  display_number: string;
  question_text: string;
  question_type: string;
  marks: number;
  sub_marks: string | null;
  section: string;
  indentation_level: number;
  parent_question_id: number | null;
  options: any;
  is_choice: boolean;
  choice_instructions: string | null;
  custom_instructions: string | null;
}

interface PaperDetails {
  id: number;
  paper_code: string;
  status: string;
  exam_type: string;
  exam_date: string;
  duration: number;
  total_marks: number;
  instructions: string;
  footer_text: string;
  academic_year: number;
  semester: number;
  course_code: string;
  course_title: string;
  department_name: string;
  college_name: string;
  programmes: string;
  created_by_name: string;
  hod_name: string;
  hod_approved_at: string;
  print_quantity: number;
  printed_at: string | null;
}

export default function PrintPreviewPage() {
  const router = useRouter();
  const params = useParams();
  const paperId = params?.paperId as string;
  const printRef = useRef<HTMLDivElement>(null);

  const [paper, setPaper] = useState<PaperDetails | null>(null);
  const [questions, setQuestions] = useState<PaperQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [printing, setPrinting] = useState(false);

  useEffect(() => {
    if (paperId) {
      fetchPaperDetails();
      fetchPaperQuestions();
    }
  }, [paperId]);

  const fetchPaperDetails = async () => {
    try {
      const response = await fetch(`/api/print-queue/${paperId}`);
      if (response.status === 401) {
        router.push('/auth/login');
        return;
      }
      if (response.ok) {
        const data = await response.json();
        setPaper(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch paper details:', error);
    }
  };

  const fetchPaperQuestions = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/exam-papers/${paperId}/questions`);
      if (response.ok) {
        const data = await response.json();
        setQuestions(data.data || []);
      }
    } catch (error) {
      console.error('Failed to fetch questions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleStartPrinting = async () => {
    if (!confirm('Start printing this exam paper?')) return;

    try {
      setPrinting(true);
      const response = await fetch(`/api/print-queue/${paperId}/start`, {
        method: 'POST',
      });

      if (response.ok) {
        alert('Printing started successfully!');
        router.push('/print-queue');
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to start printing');
      }
    } catch (error) {
      console.error('Error starting print:', error);
      alert('Failed to start printing');
    } finally {
      setPrinting(false);
    }
  };

  const handleCompletePrinting = async () => {
    const quantity = prompt('Enter the number of copies printed:');
    if (!quantity || isNaN(Number(quantity))) return;

    try {
      setPrinting(true);
      const response = await fetch(`/api/print-queue/${paperId}/complete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ print_quantity: Number(quantity) }),
      });

      if (response.ok) {
        alert('Printing completed successfully!');
        router.push('/print-queue');
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to complete printing');
      }
    } catch (error) {
      console.error('Error completing print:', error);
      alert('Failed to complete printing');
    } finally {
      setPrinting(false);
    }
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return 'Not set';
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getQuestionPrefix = (question: PaperQuestion) => {
    if (question.sub_question_label) {
      return `${question.question_number}(${question.sub_question_label})`;
    }
    return question.question_number;
  };

  const groupedQuestions = questions.reduce((acc, q) => {
    if (!acc[q.section]) acc[q.section] = [];
    acc[q.section].push(q);
    return acc;
  }, {} as Record<string, PaperQuestion[]>);

  if (loading || !paper) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 lg:pl-64">
      {/* Header - Hidden when printing */}
      <div className="print:hidden">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Link
                href="/print-queue"
                className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              >
                🖨️ Print Queue
              </Link>
              <span className="text-gray-400">/</span>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Print Preview
              </h1>
            </div>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              {paper.paper_code} - {paper.course_code}
            </p>
          </div>
          <div className="flex gap-2">
            <Link
              href="/print-queue"
              className="rounded-lg bg-gray-200 px-4 py-2 text-sm font-medium text-gray-900 transition hover:bg-gray-300 dark:bg-gray-700 dark:text-white"
            >
              ← Back
            </Link>
            <button
              onClick={handlePrint}
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
            >
              🖨️ Print
            </button>
            {paper.status === 'ready_for_print' && (
              <button
                onClick={handleStartPrinting}
                disabled={printing}
                className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-700 disabled:opacity-50"
              >
                {printing ? 'Processing...' : '▶️ Start Printing'}
              </button>
            )}
            {paper.status === 'printing' && (
              <button
                onClick={handleCompletePrinting}
                disabled={printing}
                className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-purple-700 disabled:opacity-50"
              >
                {printing ? 'Processing...' : '✅ Complete Printing'}
              </button>
            )}
          </div>
        </div>

        {/* Paper Info Card */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-md dark:border-gray-700 dark:bg-gray-800">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Status</p>
              <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
                {paper.status.replace(/_/g, ' ').toUpperCase()}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Department</p>
              <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
                {paper.department_name}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Programmes</p>
              <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
                {paper.programmes}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Duration</p>
              <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
                {paper.duration} minutes
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Marks</p>
              <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
                {paper.total_marks} marks
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Approved By</p>
              <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
                {paper.hod_name}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Print Preview Area */}
      <div
        ref={printRef}
        className="rounded-xl border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800 print:border-0 print:shadow-none"
      >
        <div className="p-12 print:p-8">
          {/* Header */}
          <div className="mb-8 text-center">
            <h2 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white print:text-black">
              {paper.college_name || 'KAMPALA INTERNATIONAL UNIVERSITY'}
            </h2>
            <h3 className="mb-4 text-xl font-semibold text-gray-800 dark:text-gray-200 print:text-black">
              {paper.department_name}
            </h3>
            <div className="mb-4 border-t-2 border-b-2 border-gray-300 py-3 print:border-black">
              <h4 className="text-lg font-bold text-gray-900 dark:text-white print:text-black">
                {paper.exam_type} EXAMINATION
              </h4>
              <p className="text-sm text-gray-700 dark:text-gray-300 print:text-black">
                Academic Year {paper.academic_year} - Semester {paper.semester}
              </p>
            </div>
          </div>

          {/* Course Details */}
          <div className="mb-6 grid grid-cols-2 gap-4 border-b border-gray-300 pb-4 print:border-black">
            <div>
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 print:text-black">
                Course Code:
              </p>
              <p className="text-base text-gray-900 dark:text-white print:text-black">
                {paper.course_code}
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 print:text-black">
                Course Title:
              </p>
              <p className="text-base text-gray-900 dark:text-white print:text-black">
                {paper.course_title}
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 print:text-black">
                Date:
              </p>
              <p className="text-base text-gray-900 dark:text-white print:text-black">
                {formatDate(paper.exam_date)}
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 print:text-black">
                Duration:
              </p>
              <p className="text-base text-gray-900 dark:text-white print:text-black">
                {paper.duration} minutes ({(paper.duration / 60).toFixed(1)} hours)
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 print:text-black">
                Total Marks:
              </p>
              <p className="text-base text-gray-900 dark:text-white print:text-black">
                {paper.total_marks}
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 print:text-black">
                Programme(s):
              </p>
              <p className="text-base text-gray-900 dark:text-white print:text-black">
                {paper.programmes}
              </p>
            </div>
          </div>

          {/* Instructions */}
          {paper.instructions && (
            <div className="mb-6 rounded-lg bg-gray-50 p-4 dark:bg-gray-700 print:bg-gray-100">
              <h5 className="mb-2 font-bold text-gray-900 dark:text-white print:text-black">
                INSTRUCTIONS:
              </h5>
              <div className="whitespace-pre-wrap text-sm text-gray-700 dark:text-gray-300 print:text-black">
                {paper.instructions}
              </div>
            </div>
          )}

          {/* Questions by Section */}
          {Object.keys(groupedQuestions)
            .sort()
            .map((section) => (
              <div key={section} className="mb-8">
                <h4 className="mb-4 text-lg font-bold text-gray-900 dark:text-white print:text-black">
                  SECTION {section}
                </h4>

                {groupedQuestions[section]
                  .filter((q) => !q.parent_question_id)
                  .map((question) => (
                    <div key={question.id} className="mb-6">
                      {/* Main Question */}
                      <div className="mb-3 flex justify-between">
                        <div className="flex-1">
                          <span className="mr-2 font-bold text-gray-900 dark:text-white print:text-black">
                            {getQuestionPrefix(question)}.
                          </span>
                          <span className="text-gray-900 dark:text-white print:text-black">
                            {question.question_text}
                          </span>
                        </div>
                        <span className="ml-4 whitespace-nowrap font-semibold text-gray-700 dark:text-gray-300 print:text-black">
                          ({question.marks} marks)
                        </span>
                      </div>

                      {/* MCQ Options */}
                      {question.question_type === 'multiple_choice' && question.options && (
                        <div className="ml-8 space-y-1">
                          {JSON.parse(question.options).map((option: string, idx: number) => (
                            <div
                              key={idx}
                              className="text-gray-800 dark:text-gray-200 print:text-black"
                            >
                              {String.fromCharCode(65 + idx)}. {option}
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Sub-questions */}
                      {groupedQuestions[section]
                        .filter((sq) => sq.parent_question_id === question.id)
                        .map((subQuestion) => (
                          <div
                            key={subQuestion.id}
                            className="mb-2 ml-8 flex justify-between"
                            style={{
                              marginLeft: `${(subQuestion.indentation_level || 1) * 2}rem`,
                            }}
                          >
                            <div className="flex-1">
                              <span className="mr-2 font-semibold text-gray-900 dark:text-white print:text-black">
                                {getQuestionPrefix(subQuestion)}.
                              </span>
                              <span className="text-gray-900 dark:text-white print:text-black">
                                {subQuestion.question_text}
                              </span>
                            </div>
                            <span className="ml-4 whitespace-nowrap text-gray-700 dark:text-gray-300 print:text-black">
                              ({subQuestion.marks} marks)
                            </span>
                          </div>
                        ))}

                      {/* Choice Instructions */}
                      {question.is_choice && question.choice_instructions && (
                        <div className="ml-8 mt-2 italic text-gray-600 dark:text-gray-400 print:text-black">
                          {question.choice_instructions}
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            ))}

          {/* Footer */}
          <div className="mt-12 border-t-2 border-gray-300 pt-4 text-center print:border-black">
            <p className="font-bold text-gray-900 dark:text-white print:text-black">
              {paper.footer_text || '*** END OF EXAMINATION ***'}
            </p>
          </div>
        </div>
      </div>

      {/* Question Count Summary - Hidden when printing */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-md dark:border-gray-700 dark:bg-gray-800 print:hidden">
        <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          Question Summary
        </h3>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {questions.length}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Questions</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">
              {Object.keys(groupedQuestions).length}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Sections</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {paper.total_marks}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Marks</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
              {paper.duration}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Minutes</p>
          </div>
        </div>
      </div>
    </div>
  );
}