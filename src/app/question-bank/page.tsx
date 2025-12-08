/* eslint-disable @typescript-eslint/no-unused-vars */
// src/app/question-bank/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Question {
  id: number;
  course_code: string;
  course_name: string;
  study_unit_name?: string;
  question_type: string;
  difficulty_level: string;
  question_text: string;
  marks: number;
  bloom_taxonomy?: string;
  tags?: string[];
  usage_count: number;
  is_active: boolean;
  created_by_name: string;
  approved_by_name?: string;
  created_at: string;
}

interface User {
  role: string;
  id: number;
}

export default function QuestionBankPage() {
  const router = useRouter();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterDifficulty, setFilterDifficulty] = useState<string>('all');
  const [filterCourse, setFilterCourse] = useState<string>('all');
  const [courses, setCourses] = useState<string[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [userRes, questionsRes] = await Promise.all([
        fetch('/api/auth/me'),
        fetch('/api/question-bank'),
      ]);

      if (userRes.ok) {
        const userData = await userRes.json();
        setUser(userData.user);
      }

      if (questionsRes.ok) {
        const data = await questionsRes.json();
        setQuestions(data.questions || []);
        
        // Extract unique courses
        const uniqueCourses = Array.from(
          new Set(data.questions.map((q: Question) => q.course_code))
        );
        setCourses(uniqueCourses as string[]);
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredQuestions = questions.filter((question) => {
    const matchesSearch =
      question.question_text.toLowerCase().includes(searchQuery.toLowerCase()) ||
      question.course_code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      question.course_name.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType = filterType === 'all' || question.question_type === filterType;
    const matchesDifficulty = filterDifficulty === 'all' || question.difficulty_level === filterDifficulty;
    const matchesCourse = filterCourse === 'all' || question.course_code === filterCourse;

    return matchesSearch && matchesType && matchesDifficulty && matchesCourse;
  });

  const handleDeleteQuestion = async (questionId: number) => {
    if (!confirm('Are you sure you want to delete this question?')) {
      return;
    }

    try {
      const response = await fetch(`/api/question-bank/${questionId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setQuestions(questions.filter((q) => q.id !== questionId));
        alert('Question deleted successfully');
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to delete question');
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('Failed to delete question');
    }
  };

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      multiple_choice: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      true_false: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      short_answer: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
      essay: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
      practical: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
      case_study: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200',
    };
    return colors[type] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
  };

  const getDifficultyColor = (level: string) => {
    const colors: Record<string, string> = {
      easy: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
      hard: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    };
    return colors[level] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
  };

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 lg:pl-64">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Question Bank</h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Manage exam questions for courses
          </p>
        </div>
        <Link
          href="/question-bank/create"
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
        >
          ➕ Add Question
        </Link>
      </div>

      {/* Filters */}
      <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Search
            </label>
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Course
            </label>
            <select
              value={filterCourse}
              onChange={(e) => setFilterCourse(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            >
              <option value="all">All Courses</option>
              {courses.map((course) => (
                <option key={course} value={course}>
                  {course}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Type
            </label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            >
              <option value="all">All Types</option>
              <option value="multiple_choice">Multiple Choice</option>
              <option value="true_false">True/False</option>
              <option value="short_answer">Short Answer</option>
              <option value="essay">Essay</option>
              <option value="practical">Practical</option>
              <option value="case_study">Case Study</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Difficulty
            </label>
            <select
              value={filterDifficulty}
              onChange={(e) => setFilterDifficulty(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            >
              <option value="all">All Levels</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {questions.length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Total Questions</div>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
            {questions.filter((q) => q.is_active).length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Active Questions</div>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {questions.filter((q) => q.approved_by_name).length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Approved Questions</div>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
            {filteredQuestions.length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Filtered Results</div>
        </div>
      </div>

      {/* Questions List */}
      {filteredQuestions.length === 0 ? (
        <div className="rounded-lg border border-gray-200 bg-white p-12 text-center shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="text-6xl">📝</div>
          <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
            No questions found
          </h3>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {searchQuery || filterType !== 'all' || filterDifficulty !== 'all'
              ? 'Try adjusting your filters'
              : 'Get started by adding your first question'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredQuestions.map((question) => (
            <div
              key={question.id}
              className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <span className="font-mono text-sm font-medium text-blue-600 dark:text-blue-400">
                      {question.course_code}
                    </span>
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${getTypeColor(question.question_type)}`}>
                      {question.question_type.replace('_', ' ')}
                    </span>
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${getDifficultyColor(question.difficulty_level)}`}>
                      {question.difficulty_level}
                    </span>
                    {question.marks > 0 && (
                      <span className="rounded-full bg-purple-100 px-2 py-0.5 text-xs font-medium text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                        {question.marks} marks
                      </span>
                    )}
                    {question.approved_by_name && (
                      <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-200">
                        ✓ Approved
                      </span>
                    )}
                  </div>
                  <p className="mb-2 text-gray-900 dark:text-white">
                    {question.question_text.length > 200
                      ? question.question_text.substring(0, 200) + '...'
                      : question.question_text}
                  </p>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-gray-600 dark:text-gray-400">
                    <span>📚 {question.course_name}</span>
                    {question.study_unit_name && <span>📖 {question.study_unit_name}</span>}
                    <span>👤 {question.created_by_name}</span>
                    <span>🔄 Used {question.usage_count} times</span>
                    {question.bloom_taxonomy && <span>🎯 {question.bloom_taxonomy}</span>}
                  </div>
                  {question.tags && question.tags.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {question.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex gap-2">
                  <Link
                    href={`/question-bank/edit/${question.id}`}
                    className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm text-gray-700 transition hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                  >
                    Edit
                  </Link>
                  {(user?.role === 'admin' || user?.role === 'hod') && (
                    <button
                      onClick={() => handleDeleteQuestion(question.id)}
                      className="rounded-lg border border-red-300 px-3 py-1.5 text-sm text-red-600 transition hover:bg-red-50 dark:border-red-700 dark:text-red-400 dark:hover:bg-red-900/20"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}