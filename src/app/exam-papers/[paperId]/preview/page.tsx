/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
// src/app/exam-papers/[paperId]/preview/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

interface ExamPaper {
  paper_code: string;
  course_code: string;
  course_title: string;
  college_name?: string;
  exam_type: string;
  academic_year: number;
  semester: number;
  exam_date: string;
  duration: number;
  total_marks: number;
  instructions: string;
}

interface Question {
  question_text: string;
  question_type: string;
  marks: number;
  section: string;
  sequence_order: number;
  options?: string | string[];
  option_order?: number[] | null;
  shuffledOptions?: string[];
}

interface Programme {
  id: number;
  code: string;
  name: string;
  level: string;
}

export default function PreviewExamPaperPage() {
  const params = useParams();
  const paperId = params.paperId as string;

  const [paper, setPaper] = useState<ExamPaper | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [programmes, setProgrammes] = useState<Programme[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Helper function to parse options
  const parseOptions = (options: any): string[] | undefined => {
    if (!options) return undefined;

    if (typeof options === 'string') {
      try {
        const parsed = JSON.parse(options);
        if (Array.isArray(parsed)) {
          return parsed.map((opt) => (typeof opt === 'string' ? opt : opt.text));
        }
        return undefined;
      } catch {
        return undefined;
      }
    }

    if (Array.isArray(options)) {
      return options.map((opt) => (typeof opt === 'string' ? opt : opt.text));
    }

    return undefined;
  };

  // Helper function to apply saved order to options
  const applySavedOrder = <T,>(array: T[], order: number[]): T[] => {
    if (!order || order.length !== array.length) {
      return array;
    }
    return order.map((idx) => array[idx]);
  };

  // Detect dark mode
  useEffect(() => {
    const checkDarkMode = () => {
      const isDark = document.documentElement.classList.contains('dark');
      setIsDarkMode(isDark);
    };

    // Check initially
    checkDarkMode();

    // Watch for changes
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    fetchData();
  }, [paperId]);

  const fetchData = async () => {
    try {
      const response = await fetch(`/api/exam-papers/${paperId}`);
      if (response.ok) {
        const data = await response.json();
        setPaper(data.paper);

        // Parse and apply shuffle order to questions
        const parsedQuestions = (data.questions || []).map((q: Question) => {
          const parsedOptions = parseOptions(q.options);

          if (q.question_type === 'multiple_choice' && parsedOptions) {
            // If we have a saved order, use it
            let shuffledOptions: string[];

            if (q.option_order && Array.isArray(q.option_order)) {
              shuffledOptions = applySavedOrder(parsedOptions, q.option_order);
            } else {
              // No saved order, just use original
              shuffledOptions = parsedOptions;
            }

            return {
              ...q,
              options: parsedOptions,
              shuffledOptions,
            };
          }

          return {
            ...q,
            options: parsedOptions,
          };
        });

        setQuestions(parsedQuestions);
        setProgrammes(data.programmes || []);
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  // Helper function to check if options can fit in two columns
  const canUseTwoColumns = (options: string[]): boolean => {
    // Use two columns if all options are short (less than 50 characters)
    const maxLength = Math.max(...options.map((opt) => opt.length));
    return maxLength < 50 && options.length >= 4;
  };

  // Helper function to render MCQ options
  const renderMCQOptions = (shuffledOptions: string[] | undefined) => {
    if (!shuffledOptions || !Array.isArray(shuffledOptions)) return null;

    const useTwoColumns = canUseTwoColumns(shuffledOptions);

    if (useTwoColumns) {
      // Two-column layout
      return (
        <div className="mt-3 ml-6 grid grid-cols-2 gap-x-6 gap-y-2">
          {shuffledOptions.map((option, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <span className="font-semibold print-text-black">{String.fromCharCode(65 + idx)}.</span>
              <span className="flex-1 print-text-black">{option}</span>
            </div>
          ))}
        </div>
      );
    } else {
      // Single-column layout for longer options
      return (
        <div className="mt-3 ml-6 space-y-2">
          {shuffledOptions.map((option, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <span className="font-semibold print-text-black">{String.fromCharCode(65 + idx)}.</span>
              <span className="flex-1 print-text-black">{option}</span>
            </div>
          ))}
        </div>
      );
    }
  };

  // Helper function to determine year from semester
  const getYearFromSemester = (semester: number) => {
    return Math.ceil(semester / 2);
  };

  // Helper function to get semester in year (1 or 2)
  const getSemesterInYear = (semester: number) => {
    return semester % 2 === 0 ? 2 : 1;
  };

  // Helper to format date (e.g., "Dec 24 2025")
  const formatDate = (dateString: string) => {
    if (!dateString) return '_______________';
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    };
    return date.toLocaleDateString('en-US', options);
  };

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center lg:pl-64">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!paper) {
    return (
      <div className="flex h-96 items-center justify-center lg:pl-64">
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400">Paper not found</p>
          <Link
            href="/exam-papers"
            className="mt-4 inline-block text-blue-600 hover:underline dark:text-blue-400"
          >
            ← Back to Papers
          </Link>
        </div>
      </div>
    );
  }

  // Group questions by section
  const sections = questions.reduce((acc, q) => {
    if (!acc[q.section]) {
      acc[q.section] = [];
    }
    acc[q.section].push(q);
    return acc;
  }, {} as Record<string, Question[]>);

  const year = getYearFromSemester(paper.semester);
  const semesterInYear = getSemesterInYear(paper.semester);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 lg:pl-64">
      {/* Print Controls - Hidden when printing */}
      <div className="no-print sticky top-0 z-10 bg-white p-4 shadow-md dark:bg-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              Preview: {paper.paper_code}
            </h1>
            <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200">
              {questions.length} Questions
            </span>
          </div>
          <div className="flex gap-3">
            <Link
              href={`/exam-papers/${paperId}`}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              ← Back
            </Link>
            <button
              onClick={handlePrint}
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
            >
              🖨️ Print / Save as PDF
            </button>
          </div>
        </div>
      </div>

      {/* Paper Preview - A4 Size */}
      <div
        className="mx-auto my-8 bg-white p-10 shadow-lg dark:bg-gray-800 print:m-0 print:bg-white print:shadow-none"
        style={{ width: '210mm', minHeight: '297mm' }}
      >
        {/* Header with KIU Logo and College */}
        <div className="mb-2 border-gray-900 pb-4 print:border-gray-900">
          {/* KIU Logo - Centered - Dynamic based on theme */}
          <div className="mb-4 flex justify-center">
            <img
              src={
                isDarkMode
                  ? '/static/images/kiu-Photoroom_white.png'
                  : '/static/images/kiu-Photoroom_black.png'
              }
              alt="KIU Logo"
              className="h-20 w-auto print:hidden"
            />
            {/* Separate logo for print - always use black */}
            <img
              src="/static/images/kiu-Photoroom_black.png"
              alt="KIU Logo"
              className="hidden h-20 w-auto print:block"
            />
          </div>

          <div className="text-center">
            <h1 className="mb-2 text-2xl font-bold uppercase text-gray-900 dark:text-white print:text-gray-900">
              Kampala International University
            </h1>

            {/* College Name - Prominent Display */}
            {paper.college_name && (
              <div className="mb-3 mt-2">
                <p className="text-lg font-bold uppercase text-gray-800 dark:text-gray-200 print:text-gray-800">
                  {paper.college_name}
                </p>
              </div>
            )}

            <h2 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white print:text-gray-900">
              {paper.exam_type} EXAMINATION {paper.academic_year}
            </h2>
            <p className="font-semibold text-gray-900 dark:text-white print:text-gray-900">
              Time Allowed: {Math.floor(paper.duration / 60)} hour
              {Math.floor(paper.duration / 60) !== 1 ? 's' : ''}
              {paper.duration % 60 > 0 && ` ${paper.duration % 60} minutes`}
            </p>
          </div>
        </div>

        {/* Course Information */}
        <div className="mb-6 rounded-lg border-gray-300 px-4 py-3 dark:border-gray-600 print:border-gray-300">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-semibold text-gray-700 dark:text-gray-300 print:text-gray-700">
                Course Code:
              </p>
              <p className="text-lg font-bold text-gray-900 dark:text-white print:text-gray-900">
                {paper.course_code}
              </p>
            </div>
            <div>
              <p className="font-semibold text-gray-700 dark:text-gray-300 print:text-gray-700">
                Course Title:
              </p>
              <p className="text-lg font-bold text-gray-900 dark:text-white print:text-gray-900">
                {paper.course_title}
              </p>
            </div>
            <div>
              <p className="font-semibold text-gray-700 dark:text-gray-300 print:text-gray-700">
                Date:
              </p>
              <p className="text-lg font-bold text-gray-900 dark:text-white print:text-gray-900">
                {formatDate(paper.exam_date)}
              </p>
            </div>
            <div>
              <p className="font-semibold text-gray-700 dark:text-gray-300 print:text-gray-700">
                Programme(s):
              </p>
              <p className="text-lg font-bold text-gray-900 dark:text-white print:text-gray-900">
                {programmes.length > 0
                  ? programmes.map((p) => p.code).join(', ')
                  : '_______________'}
                <span className="px-2">
                  {' '}
                  / {year} : {semesterInYear}{' '}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mb-6 rounded-lg bg-gray-50 p-4 dark:bg-gray-700 print:bg-gray-50">
          <p className="mb-2 font-bold uppercase text-gray-900 dark:text-white print:text-gray-900">
            Instructions to Candidates:
          </p>
          {paper.instructions ? (
            <div className="whitespace-pre-wrap text-sm text-gray-800 dark:text-gray-200 print:text-gray-800">
              {paper.instructions}
            </div>
          ) : (
            <ul className="list-inside list-disc space-y-1 text-sm text-gray-800 dark:text-gray-200 print:text-gray-800">
              <li>All answers and Rough work should be booklet provided.</li>
              <li>Write clearly and legibly.</li>
              <li>Show all working for problem-solving questions.</li>
              <li>Calculators may be used where appropriate.</li>
            </ul>
          )}
        </div>

        

        {/* Questions by Section */}
        <div className="space-y-8">
          {Object.entries(sections).length === 0 ? (
            <div className="rounded-lg border-2 border-dashed border-gray-300 p-8 text-center">
              <p className="text-gray-600 dark:text-gray-400 print:text-gray-600">
                No questions available
              </p>
            </div>
          ) : (
            Object.entries(sections)
              .sort(([a], [b]) => a.localeCompare(b))
              .map(([section, sectionQuestions]) => (
                <div key={section} className="break-inside-avoid">
                  <div className="mb-4 border-b-2 border-gray-700 pb-2 dark:border-gray-300 print:border-gray-700">
                    <h3 className="text-lg font-bold uppercase text-gray-900 dark:text-white print:text-gray-900">
                      Section {section}
                      <span className="ml-4 text-sm font-normal">
                        ({sectionQuestions.reduce((sum, q) => sum + q.marks, 0)} Marks)
                      </span>
                    </h3>
                  </div>

                  <div className="space-y-6">
                    {sectionQuestions
                      .sort((a, b) => a.sequence_order - b.sequence_order)
                      .map((question, index) => (
                        <div key={index} className="break-inside-avoid">
                          <div className="flex items-start">
                            <span className="mr-3 font-bold text-gray-900 dark:text-white print:text-gray-900">
                              {index + 1}.
                            </span>
                            <div className="flex-1">
                              <div className="flex items-start justify-between gap-4">
                                <div className="flex-1">
                                  <p className="text-justify text-gray-900 dark:text-white print:text-gray-900">
                                    {question.question_text}
                                  </p>

                                  {/* Show MCQ options if available */}
                                  {question.question_type === 'multiple_choice' &&
                                    renderMCQOptions(question.shuffledOptions)}
                                </div>
                                <span className="flex-shrink-0 font-semibold text-gray-900 dark:text-white print:text-gray-900">
                                  [{question.marks} mark{question.marks !== 1 ? 's' : ''}]
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ))
          )}
        </div>

        {/* Footer */}
        <div className="mt-12 border-t-2 border-gray-900 pt-4 text-center text-xs text-gray-700 dark:border-gray-300 dark:text-gray-400 print:border-gray-900 print:text-gray-700">
          <p className="font-bold">*** END OF EXAMINATION ***</p>
          <p className="mt-2">{paper.paper_code} | Page 1 of 1</p>
        </div>
      </div>

      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          /* Hide non-print elements */
          .no-print {
            display: none !important;
          }

          /* Reset body */
          body {
            margin: 0;
            padding: 0;
            background: white !important;
          }

          /* Page setup */
          @page {
            size: A4;
            margin: 20mm;
          }

          /* Prevent breaks inside elements */
          .break-inside-avoid {
            page-break-inside: avoid;
            break-inside: avoid;
          }

          /* Force light mode colors for print */
          .dark\\:bg-gray-800,
          .dark\\:bg-gray-700 {
            background-color: white !important;
          }

          .dark\\:text-white,
          .dark\\:text-gray-200,
          .dark\\:text-gray-300 {
            color: black !important;
          }

          .dark\\:border-gray-600,
          .dark\\:border-gray-500,
          .dark\\:border-gray-300 {
            border-color: #d1d5db !important;
          }

          /* Ensure black text for print */
          .print-text-black,
          .print\\:text-gray-900,
          .print\\:text-gray-800,
          .print\\:text-gray-700 {
            color: black !important;
          }

          /* Print-specific styles */
          .print\\:bg-white {
            background-color: white !important;
          }

          .print\\:bg-gray-50 {
            background-color: #f9fafb !important;
          }

          .print\\:border-gray-300 {
            border-color: #d1d5db !important;
          }

          .print\\:border-gray-400 {
            border-color: #9ca3af !important;
          }

          .print\\:border-gray-700 {
            border-color: #374151 !important;
          }

          .print\\:border-gray-900 {
            border-color: #111827 !important;
          }

          .print\\:shadow-none {
            box-shadow: none !important;
          }

          .print\\:m-0 {
            margin: 0 !important;
          }

          .print\\:block {
            display: block !important;
          }

          .print\\:hidden {
            display: none !important;
          }

          /* Print quality */
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
          }
        }
      `}</style>
    </div>
  );
}