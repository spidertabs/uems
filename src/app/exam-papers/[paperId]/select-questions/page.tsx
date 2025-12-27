/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
// src/app/exam-papers/[paperId]/select-questions/page.tsx
'use client';

import { useEffect, useState, useMemo } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

interface Question {
  id: number;
  question_text: string;
  question_type: string;
  marks: number;
  difficulty_level: string;
  bloom_level: string;
  course_code: string;
  course_title: string;
  study_unit_title: string;
  created_by_name: string;
  usage_count: number;
  options?: string | string[];
  shuffledOptions?: string[];
  optionOrder?: number[];
}

interface SelectedQuestion {
  question_id: number;
  question_number: number;
  marks: number;
  section: string;
  option_order?: number[] | null;
  question: Question;
}

export default function SelectQuestionsPage() {
  const router = useRouter();
  const params = useParams();
  const paperId = params.paperId as string;

  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedQuestions, setSelectedQuestions] = useState<SelectedQuestion[]>([]);
  const [paper, setPaper] = useState<any>(null);

  // Filters
  const [filterStudyUnit, setFilterStudyUnit] = useState<string>('all');
  const [filterDifficulty, setFilterDifficulty] = useState<string>('all');
  const [filterBloom, setFilterBloom] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Section selection state - NOW WITH PROPER INITIALIZATION
  const [selectedSection, setSelectedSection] = useState<Record<number, string>>({});
  const sections = ['A', 'B', 'C', 'D', 'E'];

  const [studyUnits, setStudyUnits] = useState<any[]>([]);
  const [courses, setCourses] = useState<any[]>([]);
  const [loadingStudyUnits, setLoadingStudyUnits] = useState(false);
  const [questionTypes, setQuestionTypes] = useState<string[]>([
    'Multiple Choice',
    'Short Answer',
    'Essay',
    'Problem Solving',
    'Practical',
  ]);

  // Helper function to check if options should not be shuffled
  const shouldNotShuffle = (options: string[]): boolean => {
    const combinedText = options.join(' ').toLowerCase();
    return combinedText.includes('neither') || combinedText.includes('both');
  };

  // Helper function to shuffle array and return both shuffled array and order indices
  const shuffleArrayWithOrder = <T,>(array: T[]): { shuffled: T[]; order: number[] } => {
    const indices = array.map((_, idx) => idx);
    const shuffledIndices = [...indices];

    // Fisher-Yates shuffle on indices
    for (let i = shuffledIndices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledIndices[i], shuffledIndices[j]] = [shuffledIndices[j], shuffledIndices[i]];
    }

    // Create shuffled array based on shuffled indices
    const shuffled = shuffledIndices.map((idx) => array[idx]);

    return { shuffled, order: shuffledIndices };
  };

  // Helper function to apply saved order to options
  const applySavedOrder = <T,>(array: T[], order: number[]): T[] => {
    if (!order || order.length !== array.length) {
      return array;
    }
    return order.map((idx) => array[idx]);
  };

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

  useEffect(() => {
    if (paperId) {
      fetchData();
    }
  }, [paperId]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [paperRes, questionsRes, typesRes] = await Promise.all([
        fetch(`/api/exam-papers/${paperId}`),
        fetch('/api/question-bank'),
        fetch('/api/questions?types=true'),
      ]);

      if (paperRes.ok) {
        const paperData = await paperRes.json();
        console.log('Paper data:', paperData);
        setPaper(paperData.paper);

        // Fetch study units for this paper's course
        if (paperData.paper && paperData.paper.course_id) {
          console.log('Loading study units for course:', paperData.paper.course_id);
          fetchStudyUnits(paperData.paper.course_id);
        }

        // Fetch already selected questions for this paper
        const selectedRes = await fetch(`/api/exam-papers/${paperId}/questions`);
        if (selectedRes.ok) {
          const selectedData = await selectedRes.json();
          console.log('Selected questions:', selectedData);

          // Parse options for selected questions and apply saved order
          const parsedSelected = (selectedData.questions || []).map((sq: SelectedQuestion) => {
            const parsedOptions = parseOptions(sq.question.options);

            if (sq.question.question_type === 'multiple_choice' && parsedOptions) {
              let shuffledOptions: string[];
              let optionOrder: number[];

              if (sq.option_order && Array.isArray(sq.option_order)) {
                shuffledOptions = applySavedOrder(parsedOptions, sq.option_order);
                optionOrder = sq.option_order;
              } else {
                if (shouldNotShuffle(parsedOptions)) {
                  shuffledOptions = parsedOptions;
                  optionOrder = parsedOptions.map((_, idx) => idx);
                } else {
                  const { shuffled, order } = shuffleArrayWithOrder(parsedOptions);
                  shuffledOptions = shuffled;
                  optionOrder = order;
                }
              }

              return {
                ...sq,
                question: {
                  ...sq.question,
                  options: parsedOptions,
                  shuffledOptions,
                  optionOrder,
                },
              };
            }

            return {
              ...sq,
              question: {
                ...sq.question,
                options: parsedOptions,
              },
            };
          });

          setSelectedQuestions(parsedSelected);
        }
      } else {
        const error = await paperRes.json();
        console.error('Paper API error:', error);
      }

      if (questionsRes.ok) {
        const questionsData = await questionsRes.json();
        console.log('Questions data:', questionsData);

        // Parse and shuffle options for preview (not saved yet)
        const parsedQuestions = (questionsData.questions || []).map((q: Question) => {
          const parsedOptions = parseOptions(q.options);

          if (q.question_type === 'multiple_choice' && parsedOptions) {
            if (shouldNotShuffle(parsedOptions)) {
              return {
                ...q,
                options: parsedOptions,
                shuffledOptions: parsedOptions,
                optionOrder: parsedOptions.map((_, idx) => idx),
              };
            } else {
              const { shuffled, order } = shuffleArrayWithOrder(parsedOptions);

              return {
                ...q,
                options: parsedOptions,
                shuffledOptions: shuffled,
                optionOrder: order,
              };
            }
          }

          return {
            ...q,
            options: parsedOptions,
          };
        });

        setQuestions(parsedQuestions);
      } else {
        const error = await questionsRes.json();
        console.error('Questions API error:', error);
      }

      if (typesRes.ok) {
        const typesData = await typesRes.json();
        console.log('Question types data:', typesData);
        if (typesData.questionTypes && typesData.questionTypes.length > 0) {
          setQuestionTypes(typesData.questionTypes);
        }
      } else {
        console.log('Using default question types');
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStudyUnits = async (courseId: number | string) => {
    try {
      setLoadingStudyUnits(true);
      console.log('Fetching study units for course ID:', courseId);

      console.log('Making API call to:', `/api/courses/${courseId}/study-units`);
      const response = await fetch(`/api/courses/${courseId}/study-units`);
      console.log('Study units API response status:', response.status);

      const responseText = await response.text();
      console.log('Raw response text:', responseText);

      if (response.ok) {
        let data;
        try {
          data = JSON.parse(responseText);
        } catch (e) {
          console.error('Failed to parse JSON:', e);
          alert('Failed to parse study units response');
          setStudyUnits([]);
          return;
        }

        console.log('Study units data:', data);

        const unitsArray = data.study_units || data.studyUnits || [];

        if (Array.isArray(unitsArray)) {
          setStudyUnits(unitsArray);
          console.log('Set study units state with', unitsArray.length, 'items');
        } else {
          console.error('study_units is not an array:', data);
          setStudyUnits([]);
        }
      } else {
        const error = await response.json().catch(() => ({ error: 'Unknown error' }));
        console.error('Study units API error:', error);
        alert(`Failed to load study units: ${error.error || 'Unknown error'}`);
        setStudyUnits([]);
      }
    } catch (error) {
      console.error('Failed to fetch study units:', error);
      alert(`Error loading study units: ${error}`);
      setStudyUnits([]);
    } finally {
      setLoadingStudyUnits(false);
    }
  };

  // Filter available questions (exclude already selected ones)
  // USING useMemo to ensure this updates when dependencies change
  const availableQuestions = useMemo(() => {
    return questions.filter((question) => {
      const isAlreadySelected = selectedQuestions.some((sq) => sq.question_id === question.id);
      if (isAlreadySelected) return false;

      const matchesSearch =
        question.question_text.toLowerCase().includes(searchQuery.toLowerCase()) ||
        question.course_code.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCourse = paper && question.course_code === paper.course_code;
      const matchesStudyUnit =
        filterStudyUnit === 'all' || question.study_unit_title === filterStudyUnit;
      const matchesDifficulty =
        filterDifficulty === 'all' || question.difficulty_level === filterDifficulty;
      const matchesBloom = filterBloom === 'all' || question.bloom_level === filterBloom;
      const matchesType = filterType === 'all' || question.question_type === filterType;

      return (
        matchesSearch &&
        matchesCourse &&
        matchesStudyUnit &&
        matchesDifficulty &&
        matchesBloom &&
        matchesType
      );
    });
  }, [questions, selectedQuestions, searchQuery, paper, filterStudyUnit, filterDifficulty, filterBloom, filterType]);

  // Initialize section selection for available questions
  // This ensures every question has a section value
  useEffect(() => {
    const initialSections: Record<number, string> = { ...selectedSection };
    let hasChanges = false;

    availableQuestions.forEach((q: Question) => {
      if (!initialSections[q.id]) {
        initialSections[q.id] = 'A';
        hasChanges = true;
      }
    });

    if (hasChanges) {
      setSelectedSection(initialSections);
    }
  }, [availableQuestions]);

  const handleSelectQuestion = async (question: Question) => {
    try {
      // Get the selected section, with fallback to 'A'
      const section = selectedSection[question.id] || 'A';
      
      console.log(`Adding question ${question.id} to section ${section}`);
      
      const requestData: any = {
        question_id: question.id,
        marks: question.marks,
        section: section,
      };

      if (question.question_type === 'multiple_choice' && question.optionOrder) {
        requestData.option_order = question.optionOrder;
      }

      console.log('Request data:', requestData);

      const response = await fetch(`/api/exam-papers/${paperId}/questions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestData),
      });

      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);

      // Try to parse the response
      let responseData;
      const contentType = response.headers.get('content-type');
      console.log('Content-Type:', contentType);

      if (contentType && contentType.includes('application/json')) {
        responseData = await response.json();
      } else {
        // If not JSON, get as text
        const text = await response.text();
        console.log('Response text:', text);
        responseData = { error: text || 'Non-JSON response received' };
      }

      console.log('API Response Data:', responseData);

      if (response.ok) {
        console.log('Question added successfully:', responseData);

        // Refresh the selected questions list
        const selectedRes = await fetch(`/api/exam-papers/${paperId}/questions`);
        if (selectedRes.ok) {
          const selectedData = await selectedRes.json();

          const parsedSelected = (selectedData.questions || []).map((sq: SelectedQuestion) => {
            const parsedOptions = parseOptions(sq.question.options);

            if (sq.question.question_type === 'multiple_choice' && parsedOptions) {
              let shuffledOptions: string[];
              let optionOrder: number[];

              if (sq.option_order && Array.isArray(sq.option_order)) {
                shuffledOptions = applySavedOrder(parsedOptions, sq.option_order);
                optionOrder = sq.option_order;
              } else {
                if (shouldNotShuffle(parsedOptions)) {
                  shuffledOptions = parsedOptions;
                  optionOrder = parsedOptions.map((_, idx) => idx);
                } else {
                  const { shuffled, order } = shuffleArrayWithOrder(parsedOptions);
                  shuffledOptions = shuffled;
                  optionOrder = order;
                }
              }

              return {
                ...sq,
                question: {
                  ...sq.question,
                  options: parsedOptions,
                  shuffledOptions,
                  optionOrder,
                },
              };
            }

            return {
              ...sq,
              question: {
                ...sq.question,
                options: parsedOptions,
              },
            };
          });

          setSelectedQuestions(parsedSelected);
        }
      } else {
        // Enhanced error reporting
        console.error('Add question failed with status:', response.status);
        console.error('Add question error data:', responseData);
        
        const errorMessage = responseData?.error 
          || responseData?.message 
          || `Failed to add question (Status: ${response.status})`;
        
        alert(errorMessage);
      }
    } catch (error) {
      console.error('Failed to select question - Exception:', error);
      console.error('Error details:', {
        name: error instanceof Error ? error.name : 'Unknown',
        message: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined
      });
      alert('Failed to add question: ' + (error instanceof Error ? error.message : 'Unknown error'));
    }
  };

  const handleRemoveQuestion = async (selectedQuestion: SelectedQuestion) => {
    if (!confirm('Remove this question from the paper?')) return;

    try {
      // Use query parameter for DELETE as expected by the API
      const response = await fetch(
        `/api/exam-papers/${paperId}/questions?question_id=${selectedQuestion.question_id}`,
        { method: 'DELETE' }
      );

      if (response.ok) {
        console.log('Question removed successfully');

        const selectedRes = await fetch(`/api/exam-papers/${paperId}/questions`);
        if (selectedRes.ok) {
          const selectedData = await selectedRes.json();

          const parsedSelected = (selectedData.questions || []).map((sq: SelectedQuestion) => {
            const parsedOptions = parseOptions(sq.question.options);

            if (sq.question.question_type === 'multiple_choice' && parsedOptions) {
              let shuffledOptions: string[];
              let optionOrder: number[];

              if (sq.option_order && Array.isArray(sq.option_order)) {
                shuffledOptions = applySavedOrder(parsedOptions, sq.option_order);
                optionOrder = sq.option_order;
              } else {
                if (shouldNotShuffle(parsedOptions)) {
                  shuffledOptions = parsedOptions;
                  optionOrder = parsedOptions.map((_, idx) => idx);
                } else {
                  const { shuffled, order } = shuffleArrayWithOrder(parsedOptions);
                  shuffledOptions = shuffled;
                  optionOrder = order;
                }
              }

              return {
                ...sq,
                question: {
                  ...sq.question,
                  options: parsedOptions,
                  shuffledOptions,
                  optionOrder,
                },
              };
            }

            return {
              ...sq,
              question: {
                ...sq.question,
                options: parsedOptions,
              },
            };
          });

          setSelectedQuestions(parsedSelected);
        }
      } else {
        const error = await response.json();
        console.error('Remove question error:', error);
        alert(error.error || 'Failed to remove question');
      }
    } catch (error) {
      console.error('Failed to remove question:', error);
      alert('Failed to remove question');
    }
  };

  // Helper function to render MCQ options
  const renderMCQOptions = (shuffledOptions: string[] | undefined) => {
    if (!shuffledOptions || !Array.isArray(shuffledOptions)) return null;

    return (
      <div className="mt-2 ml-3 space-y-1.5">
        {shuffledOptions.map((option, idx) => (
          <div key={idx} className="flex items-start gap-2 text-xs text-gray-600 dark:text-gray-400">
            <span className="font-semibold mt-0.5">{String.fromCharCode(65 + idx)}.</span>
            <span className="flex-1">{option}</span>
          </div>
        ))}
      </div>
    );
  };

  // Group selected questions by section
  const groupedBySection = selectedQuestions.reduce((acc, sq) => {
    const section = sq.section || 'A';
    if (!acc[section]) {
      acc[section] = [];
    }
    acc[section].push(sq);
    return acc;
  }, {} as Record<string, SelectedQuestion[]>);

  const totalMarks = selectedQuestions.reduce((sum, sq) => sum + sq.marks, 0);

  const difficultyColors = {
    Easy: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    Medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    Hard: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  };

  const bloomColors = {
    Remember: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    Understand: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200',
    Apply: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    Analyze: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    Evaluate: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
    Create: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  };

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center lg:pl-64">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 lg:pl-64">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Select Questions</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {paper?.title} {paper?.course_code && `• ${paper.course_code}`}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500">
            Add questions from {paper?.course_code || 'this course'} to your exam paper
          </p>
        </div>

        <Link
          href={`/exam-papers/${paperId}`}
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
        >
          ← Back to Paper
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {selectedQuestions.length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Selected Questions</div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">{totalMarks}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Total Marks</div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
            {availableQuestions.length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Available Questions</div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Available Questions */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Available Questions
            </h2>
          </div>

          {/* Filters */}
          <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Search questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />

              <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
                <select
                  value={filterStudyUnit}
                  onChange={(e) => setFilterStudyUnit(e.target.value)}
                  disabled={loadingStudyUnits}
                  className="rounded-lg border border-gray-300 px-2 py-1.5 text-sm focus:border-blue-500 focus:outline-none disabled:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:disabled:bg-gray-800"
                >
                  <option value="all">
                    {loadingStudyUnits
                      ? 'Loading units...'
                      : studyUnits.length === 0
                      ? 'No study units'
                      : 'All Study Units'}
                  </option>
                  {studyUnits.map((unit) => (
                    <option key={unit.id} value={unit.name || unit.title}>
                      {unit.name || unit.title}
                    </option>
                  ))}
                </select>

                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="rounded-lg border border-gray-300 px-2 py-1.5 text-sm focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                >
                  <option value="all">All Types</option>
                  {questionTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>

                <select
                  value={filterDifficulty}
                  onChange={(e) => setFilterDifficulty(e.target.value)}
                  className="rounded-lg border border-gray-300 px-2 py-1.5 text-sm focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                >
                  <option value="all">All Difficulties</option>
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>

                <select
                  value={filterBloom}
                  onChange={(e) => setFilterBloom(e.target.value)}
                  className="rounded-lg border border-gray-300 px-2 py-1.5 text-sm focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                >
                  <option value="all">All Bloom Levels</option>
                  <option value="Remember">Remember</option>
                  <option value="Understand">Understand</option>
                  <option value="Apply">Apply</option>
                  <option value="Analyze">Analyze</option>
                  <option value="Evaluate">Evaluate</option>
                  <option value="Create">Create</option>
                </select>
              </div>
            </div>
          </div>

          {/* Available Questions List */}
          <div className="max-h-[600px] space-y-3 overflow-y-auto">
            {availableQuestions.length === 0 ? (
              <div className="rounded-lg border border-gray-200 bg-white p-8 text-center dark:border-gray-700 dark:bg-gray-800">
                <div className="text-4xl">🔍</div>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  {selectedQuestions.length > 0 && questions.length > 0
                    ? 'All matching questions have been selected'
                    : 'No questions available'}
                </p>
              </div>
            ) : (
              availableQuestions.map((question) => (
                <div
                  key={question.id}
                  className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
                >
                  <div className="mb-3 flex items-start justify-between">
                    <div className="flex-1">
                      <div className="mb-2 flex flex-wrap gap-1">
                        <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                          {question.course_code}
                        </span>
                        {question.study_unit_title && (
                          <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                            {question.study_unit_title}
                          </span>
                        )}
                        <span
                          className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                            difficultyColors[
                              question.difficulty_level as keyof typeof difficultyColors
                            ]
                          }`}
                        >
                          {question.difficulty_level}
                        </span>
                        <span
                          className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                            bloomColors[question.bloom_level as keyof typeof bloomColors]
                          }`}
                        >
                          {question.bloom_level}
                        </span>
                      </div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                        {question.question_text}
                      </p>

                      {/* Show MCQ options if available */}
                      {question.question_type === 'multiple_choice' &&
                        renderMCQOptions(question.shuffledOptions)}

                      <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                        {question.question_type} • {question.marks} marks
                      </p>
                    </div>
                  </div>
                  
                  {/* Section Selection and Add Button - IMPROVED */}
                  <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                    <label className="text-xs font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
                      Add to:
                    </label>
                    <select
                      value={selectedSection[question.id] || 'A'}
                      onChange={(e) => {
                        const newSection = e.target.value;
                        console.log(`Section changed for question ${question.id}: ${newSection}`);
                        setSelectedSection((prev) => ({
                          ...prev,
                          [question.id]: newSection,
                        }));
                      }}
                      className="flex-1 rounded-lg border border-gray-300 px-3 py-1.5 text-sm font-medium focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    >
                      {sections.map((section) => (
                        <option key={section} value={section}>
                          Section {section}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={() => handleSelectQuestion(question)}
                      className="rounded-lg bg-blue-600 px-4 py-1.5 text-xs font-medium text-white transition hover:bg-blue-700 active:bg-blue-800 flex-shrink-0 shadow-sm"
                    >
                      Add →
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Selected Questions - Grouped by Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Selected Questions ({selectedQuestions.length})
            </h2>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Total: {totalMarks} marks
            </span>
          </div>

          <div className="max-h-[600px] space-y-4 overflow-y-auto">
            {selectedQuestions.length === 0 ? (
              <div className="rounded-lg border border-gray-200 bg-white p-8 text-center dark:border-gray-700 dark:bg-gray-800">
                <div className="text-4xl">📝</div>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  No questions selected yet
                </p>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-500">
                  Select questions from the available list and assign them to sections
                </p>
              </div>
            ) : (
              // Display questions grouped by section
              Object.entries(groupedBySection)
                .sort(([a], [b]) => a.localeCompare(b))
                .map(([section, sectionQuestions]) => (
                  <div key={section} className="space-y-3">
                    {/* Section Header */}
                    <div className="sticky top-0 z-10 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-2 shadow-md">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-bold text-white">
                          SECTION {section}
                        </h3>
                        <span className="text-xs font-medium text-blue-100">
                          {sectionQuestions.length} question{sectionQuestions.length !== 1 ? 's' : ''} • {' '}
                          {sectionQuestions.reduce((sum, sq) => sum + sq.marks, 0)} marks
                        </span>
                      </div>
                    </div>

                    {/* Section Questions */}
                    {sectionQuestions.map((sq, index) => (
                      <div
                        key={sq.question_id}
                        className="rounded-lg border border-green-200 bg-green-50 p-4 shadow-sm dark:border-green-800 dark:bg-green-900/20"
                      >
                        <div className="mb-2 flex items-start justify-between">
                          <div className="flex-1">
                            <div className="mb-1 flex items-center gap-2 flex-wrap">
                              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-600 text-xs font-bold text-white">
                                {index + 1}
                              </span>
                              <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                                {sq.question.course_code}
                              </span>
                              <span
                                className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                                  difficultyColors[
                                    sq.question.difficulty_level as keyof typeof difficultyColors
                                  ]
                                }`}
                              >
                                {sq.question.difficulty_level}
                              </span>
                              {sq.option_order && (
                                <span className="rounded-full bg-purple-100 px-2 py-0.5 text-xs font-medium text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                                  🔀 Shuffled
                                </span>
                              )}
                            </div>
                            <p className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                              {sq.question.question_text}
                            </p>

                            {/* Show MCQ options if available */}
                            {sq.question.question_type === 'multiple_choice' &&
                              renderMCQOptions(sq.question.shuffledOptions)}

                            <p className="mt-2 text-xs text-gray-600 dark:text-gray-400">
                              {sq.question.question_type} • {sq.marks} marks
                            </p>
                          </div>
                          <button
                            onClick={() => handleRemoveQuestion(sq)}
                            className="ml-2 rounded-lg border border-red-300 px-3 py-1.5 text-xs font-medium text-red-700 transition hover:bg-red-50 dark:border-red-600 dark:text-red-400 dark:hover:bg-red-900/20 flex-shrink-0"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}