/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
// src/app/exam-papers/[paperId]/select-questions/page.tsx
'use client';

import { useEffect, useState } from 'react';
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
}

interface SelectedQuestion {
  question_id: number;
  question_number: number;
  marks: number;
  question: Question;
}

export default function SelectQuestionsPage() {
  const router = useRouter();
  const params = useParams();
  const paperId = params.paperId;

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

  const [studyUnits, setStudyUnits] = useState<any[]>([]);
  const [courses, setCourses] = useState<any[]>([]);
  const [loadingStudyUnits, setLoadingStudyUnits] = useState(false);
  const [questionTypes, setQuestionTypes] = useState<string[]>([
    'Multiple Choice',
    'Short Answer', 
    'Essay',
    'Problem Solving',
    'Practical'
  ]);

  useEffect(() => {
    fetchData();
  }, [paperId]);

  const fetchData = async () => {
    try {
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
          setSelectedQuestions(selectedData.questions || []);
        }
      } else {
        const error = await paperRes.json();
        console.error('Paper API error:', error);
      }

      if (questionsRes.ok) {
        const questionsData = await questionsRes.json();
        console.log('Questions data:', questionsData);
        setQuestions(questionsData.questions || []);
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
      console.log('Study units API response headers:', response.headers);
      
      // Get the raw response text first
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
        console.log('Study units array:', data.study_units);
        console.log('First study unit:', data.study_units?.[0]);
        
        // Support both response formats
        const unitsArray = data.study_units || data.studyUnits || [];
        
        if (Array.isArray(unitsArray)) {
          setStudyUnits(unitsArray);
          console.log('Set study units state with', unitsArray.length, 'items');
        } else {
          console.error('study_units is not an array:', data);
          console.error('Type of study_units:', typeof unitsArray);
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
  const availableQuestions = questions.filter((question) => {
    // Remove questions that are already selected
    const isAlreadySelected = selectedQuestions.some(
      sq => sq.question_id === question.id
    );
    if (isAlreadySelected) return false;

    // Apply other filters
    const matchesSearch =
      question.question_text.toLowerCase().includes(searchQuery.toLowerCase()) ||
      question.course_code.toLowerCase().includes(searchQuery.toLowerCase());

    // Only show questions from the paper's course
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

  const handleSelectQuestion = async (question: Question) => {
    try {
      const response = await fetch(`/api/exam-papers/${paperId}/questions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question_id: question.id,
          marks: question.marks,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        // Refresh the selected questions list
        const selectedRes = await fetch(`/api/exam-papers/${paperId}/questions`);
        if (selectedRes.ok) {
          const selectedData = await selectedRes.json();
          setSelectedQuestions(selectedData.questions || []);
        }
      } else {
        const error = await response.json();
        console.error('Add question error:', error);
        alert(error.error || 'Failed to add question');
      }
    } catch (error) {
      console.error('Failed to select question:', error);
      alert('Failed to add question');
    }
  };

  const handleRemoveQuestion = async (selectedQuestion: SelectedQuestion) => {
    if (!confirm('Remove this question from the paper?')) return;

    try {
      const response = await fetch(
        `/api/exam-papers/${paperId}/questions/${selectedQuestion.question_id}`,
        { method: 'DELETE' }
      );

      if (response.ok) {
        // Refresh the selected questions list
        const selectedRes = await fetch(`/api/exam-papers/${paperId}/questions`);
        if (selectedRes.ok) {
          const selectedData = await selectedRes.json();
          setSelectedQuestions(selectedData.questions || []);
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
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Select Questions
          </h1>
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
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
            {totalMarks}
          </div>
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
                  <div className="mb-2 flex items-start justify-between">
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
                      <p className="line-clamp-2 text-sm text-gray-900 dark:text-white">
                        {question.question_text}
                      </p>
                      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        {question.question_type} • {question.marks} marks
                      </p>
                    </div>
                    <button
                      onClick={() => handleSelectQuestion(question)}
                      className="ml-2 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-blue-700"
                    >
                      Add →
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Selected Questions */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Selected Questions ({selectedQuestions.length})
            </h2>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Total: {totalMarks} marks
            </span>
          </div>

          <div className="max-h-[600px] space-y-3 overflow-y-auto">
            {selectedQuestions.length === 0 ? (
              <div className="rounded-lg border border-gray-200 bg-white p-8 text-center dark:border-gray-700 dark:bg-gray-800">
                <div className="text-4xl">📝</div>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  No questions selected yet
                </p>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-500">
                  Select questions from the available list
                </p>
              </div>
            ) : (
              selectedQuestions.map((sq, index) => (
                <div
                  key={sq.question_id}
                  className="rounded-lg border border-green-200 bg-green-50 p-4 shadow-sm dark:border-green-800 dark:bg-green-900/20"
                >
                  <div className="mb-2 flex items-start justify-between">
                    <div className="flex-1">
                      <div className="mb-1 flex items-center gap-2">
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
                      </div>
                      <p className="line-clamp-2 text-sm text-gray-900 dark:text-white">
                        {sq.question.question_text}
                      </p>
                      <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">
                        {sq.question.question_type} • {sq.marks} marks
                      </p>
                    </div>
                    <button
                      onClick={() => handleRemoveQuestion(sq)}
                      className="ml-2 rounded-lg border border-red-300 px-3 py-1.5 text-xs font-medium text-red-700 transition hover:bg-red-50 dark:border-red-600 dark:text-red-400 dark:hover:bg-red-900/20"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}