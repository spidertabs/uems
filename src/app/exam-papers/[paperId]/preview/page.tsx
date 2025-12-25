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
    return maxLength < 50;
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
              <span className="font-semibold">{String.fromCharCode(65 + idx)}.</span>
              <span className="flex-1">{option}</span>
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
              <span className="font-semibold">{String.fromCharCode(65 + idx)}.</span>
              <span className="flex-1">{option}</span>
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
      <div className="flex h-96 items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!paper) {
    return <div className="text-center">Paper not found</div>;
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
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            Preview: {paper.paper_code}
          </h1>
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
              🖨️ Print
            </button>
          </div>
        </div>
      </div>

      {/* Paper Preview - A4 Size */}
      <div
        className="mx-auto my-8 bg-white p-10 shadow-lg dark:bg-gray-800 print:m-0 print:shadow-none"
        style={{ width: '210mm', minHeight: '297mm' }}
      >
        {/* Header with KIU Logo and College */}
        <div className="mb-6 pb-4">
          {/* KIU Logo - Centered - Dynamic based on theme */}
          <div className="mb-4 flex justify-center">
            <img
              src={isDarkMode ? '/static/images/kiu-Photoroom_white.png' : '/static/images/kiu-Photoroom_black.png'}
              alt="KIU Logo"
              className="h-20 w-auto"
            />
          </div>

          <div className="text-center">
            <h1 className="mb-2 text-2xl font-bold uppercase">Kampala International University</h1>

            {/* College Name - Prominent Display */}
            {paper.college_name && (
              <div className="mb-3 mt-2">
                <p className="text-lg font-bold uppercase text-gray-800 dark:text-gray-200">
                  {paper.college_name}
                </p>
              </div>
            )}

            <h2 className="mb-2 text-xl font-semibold">
              {paper.exam_type} EXAMINATION {paper.academic_year}
            </h2>
            <h3>
              <p className="font-semibold">
                Time Allowed: {Math.floor(paper.duration / 60)} hour
                {Math.floor(paper.duration / 60) !== 1 ? 's' : ''}
              </p>
            </h3>
          </div>
        </div>

        {/* Course Information */}
        <div className="mb-6 p-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-semibold">Course Code:</p>
              <p className="text-lg font-bold">{paper.course_code}</p>
            </div>
            <div>
              <p className="font-semibold">Course Title:</p>
              <p className="text-lg font-bold">{paper.course_title}</p>
            </div>
            <div>
              <p className="font-semibold">Date:</p>
              <p className="text-lg font-bold">{formatDate(paper.exam_date)}</p>
            </div>
            <div>
              <p className="font-semibold">Programme(s):</p>
              <p className="text-lg font-bold">
                {programmes.length > 0 ? programmes.map((p) => p.code).join(', ') : '_______________'}
                <span className="px-2">
                  {' '}
                  / {year} : {semesterInYear}{' '}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Instructions */}
        {paper.instructions && (
          <div className="mb-6 bg-gray-50 p-4 dark:bg-gray-700">
            <p className="mb-2 font-bold uppercase">Instructions to Candidates:</p>
            <div className="whitespace-pre-wrap text-sm">{paper.instructions}</div>
          </div>
        )}

        {/* Questions by Section */}
        <div className="space-y-6">
          {Object.entries(sections)
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([section, sectionQuestions]) => (
              <div key={section} className="break-inside-avoid">
                <h3 className="mb-4 pb-2 text-lg font-bold uppercase">
                  Section {section}
                  <span className="ml-4 text-sm font-normal">
                    ({sectionQuestions.reduce((sum, q) => sum + q.marks, 0)} Marks)
                  </span>
                </h3>

                <div className="space-y-6">
                  {sectionQuestions
                    .sort((a, b) => a.sequence_order - b.sequence_order)
                    .map((question, index) => (
                      <div key={index} className="break-inside-avoid">
                        <div className="mb-2 flex items-start">
                          <span className="mr-2 font-bold">{index + 1}.</span>
                          <div className="flex-1">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <p className="text-justify">{question.question_text}</p>

                                {/* Show MCQ options if available */}
                                {question.question_type === 'multiple_choice' &&
                                  renderMCQOptions(question.shuffledOptions)}
                              </div>
                              <span className="ml-4 font-semibold">
                                [{question.marks} mark{question.marks !== 1 ? 's' : ''}]
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
        </div>

        {/* Footer */}
        <div className="mt-12 pt-4 text-center text-xs">
          <p>*** END OF EXAMINATION ***</p>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            {paper.paper_code} | Page 1 of 1
          </p>
        </div>
      </div>

      <style jsx global>{`
        @media print {
          .no-print {
            display: none !important;
          }

          body {
            margin: 0;
            padding: 0;
          }

          @page {
            size: A4;
            margin: 20mm;
          }

          .break-inside-avoid {
            page-break-inside: avoid;
          }
          
          /* Force light mode colors for print */
          .dark\\:bg-gray-800 {
            background-color: white !important;
          }
          
          .dark\\:text-white,
          .dark\\:text-gray-200 {
            color: black !important;
          }
          
          .dark\\:bg-gray-700 {
            background-color: #f9fafb !important;
          }
          
          .dark\\:text-gray-400 {
            color: #6b7280 !important;
          }
        }
      `}</style>
    </div>
  );
}