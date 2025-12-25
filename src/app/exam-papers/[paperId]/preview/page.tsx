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
  marks: number;
  section: string;
  sequence_order: number;
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

  useEffect(() => {
    fetchData();
  }, [paperId]);

  const fetchData = async () => {
    try {
      const response = await fetch(`/api/exam-papers/${paperId}`);
      if (response.ok) {
        const data = await response.json();
        setPaper(data.paper);
        setQuestions(data.questions || []);
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
      day: 'numeric' 
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
      <div className="mx-auto my-8 bg-white p-10 shadow-lg dark:bg-gray-800 print:m-0 print:shadow-none" 
           style={{ width: '210mm', minHeight: '297mm' }}>
        
        {/* Header with KIU Logo and College */}
        <div className="mb-1 border-b-2 border-gray-800 pb-4">
          {/* KIU Logo - Centered */}
          <div className="mb-4 flex justify-center">
            <img
              src="/static/images/kiu-Photoroom_white.png"
              alt="KIU Logo"
              className="h-20 w-auto"
            />
          </div>

          <div className="text-center">
            <h1 className="mb-2 text-2xl font-bold uppercase">
              Kampala International University
            </h1>
            
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
                Time Allowed: {Math.floor(paper.duration / 60)} hour{Math.floor(paper.duration / 60) !== 1 ? 's' : ''}
              </p>
            </h3>
          </div>
        </div>

        {/* Course Information */}
        <div className="mb-6 border border-gray-800 p-4">
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
              <p className="text-lg font-bold">
                {formatDate(paper.exam_date)}
              </p>
            </div>
            <div>
              <p className="font-semibold">Programme(s):</p>
              <p className="text-lg font-bold">
                {programmes.length > 0 
                  ? programmes.map(p => p.code).join(', ')
                  : '_______________'} 
                  <span className="px-2"> / {year} : {semesterInYear} </span>
              </p>
            </div>
          </div>
        </div>

        {/* Instructions */}
        {paper.instructions && (
          <div className="mb-6 border border-gray-800 bg-gray-50 p-4 dark:bg-gray-900">
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
                <h3 className="mb-4 border-b-2 border-gray-800 pb-2 text-lg font-bold uppercase">
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
                          <span className="mr-2 font-bold">
                            {index + 1}.
                          </span>
                          <div className="flex-1">
                            <div className="flex items-start justify-between">
                              <p className="flex-1 text-justify">
                                {question.question_text}
                              </p>
                              <span className="ml-4 font-semibold">
                                [{question.marks} mark{question.marks !== 1 ? 's' : ''}]
                              </span>
                            </div>
                            {/* Answer space */}
                            <div className="mt-4 border-t border-gray-300 pt-2">
                              <p className="text-xs italic text-gray-500">
                                [Answer space]
                              </p>
                              <div className="h-24"></div>
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
        <div className="mt-12 border-t-2 border-gray-800 pt-4 text-center text-xs">
          <p>*** END OF EXAMINATION ***</p>
          <p className="mt-2 text-gray-600">
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
        }
      `}</style>
    </div>
  );
}