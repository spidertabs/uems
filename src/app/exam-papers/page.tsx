/* eslint-disable @typescript-eslint/no-unused-vars */
// src/app/exam-papers/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface ExamPaper {
  id: number;
  paper_code: string;
  course_code: string;
  course_title: string;
  exam_type: string;
  academic_year: number;
  semester: number;
  status: string;
  total_marks: number;
  created_by_name: string;
  created_at: string;
  submitted_at: string | null;
  exam_date: string | null;
}

interface User {
  role: string;
  id: number;
  first_name: string;
  last_name: string;
}

export default function ExamPapersPage() {
  const router = useRouter();
  const [papers, setPapers] = useState<ExamPaper[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Filters
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterExamType, setFilterExamType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [userRes, papersRes] = await Promise.all([
        fetch('/api/auth/me'),
        fetch('/api/exam-papers'),
      ]);

      if (userRes.ok) {
        const userData = await userRes.json();
        setUser(userData.user);
      }

      if (papersRes.ok) {
        const papersData = await papersRes.json();
        setPapers(papersData.papers || []);
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this exam paper?')) return;

    try {
      const response = await fetch(`/api/exam-papers/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setPapers(papers.filter((p) => p.id !== id));
      } else {
        alert('Failed to delete exam paper');
      }
    } catch (error) {
      console.error('Delete failed:', error);
      alert('Failed to delete exam paper');
    }
  };

  const filteredPapers = papers.filter((paper) => {
    const matchesSearch =
      paper.paper_code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      paper.course_code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      paper.course_title.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = filterStatus === 'all' || paper.status === filterStatus;
    const matchesExamType = filterExamType === 'all' || paper.exam_type === filterExamType;

    return matchesSearch && matchesStatus && matchesExamType;
  });

  const statusColors = {
    draft: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
    submitted: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    hod_review: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    hod_approved: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    hod_rejected: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    dean_review: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    dean_approved: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    dean_rejected: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    ready_for_print: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200',
    printing: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200',
    printed: 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200',
    published: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200',
  };

  const examTypeColors = {
    TEST: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    CAT: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    FINAL: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
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
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Exam Papers</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Create and manage examination papers
          </p>
        </div>

        <Link
          href="/exam-papers/create"
          className="whitespace-nowrap rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
        >
          ➕ Create Paper
        </Link>
      </div>

      {/* Filters */}
      <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <div className="mb-4">
          <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Search
          </label>
          <input
            type="text"
            placeholder="Search by paper code, course..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Status
            </label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            >
              <option value="all">All Statuses</option>
              <option value="draft">Draft</option>
              <option value="submitted">Submitted</option>
              <option value="hod_review">HOD Review</option>
              <option value="hod_approved">HOD Approved</option>
              <option value="hod_rejected">HOD Rejected</option>
              <option value="ready_for_print">Ready for Print</option>
              <option value="printed">Printed</option>
              <option value="published">Published</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Exam Type
            </label>
            <select
              value={filterExamType}
              onChange={(e) => setFilterExamType(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            >
              <option value="all">All Types</option>
              <option value="TEST">Test</option>
              <option value="CAT">CAT</option>
              <option value="FINAL">Final Exam</option>
            </select>
          </div>
        </div>

        <div className="mt-4">
          <button
            onClick={() => {
              setSearchQuery('');
              setFilterStatus('all');
              setFilterExamType('all');
            }}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {papers.length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Total Papers</div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
            {papers.filter((p) => p.status === 'draft').length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Drafts</div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {papers.filter((p) => p.status === 'submitted' || p.status === 'hod_review').length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Pending Review</div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
            {papers.filter((p) => p.status === 'hod_approved' || p.status === 'published').length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Approved</div>
        </div>
      </div>

      {/* Papers List */}
      {filteredPapers.length === 0 ? (
        <div className="rounded-lg border border-gray-200 bg-white p-12 text-center shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="text-6xl">📄</div>
          <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
            No exam papers found
          </h3>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Get started by creating your first exam paper
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredPapers.map((paper) => (
            <div
              key={paper.id}
              className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                      {paper.paper_code}
                    </span>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        examTypeColors[paper.exam_type as keyof typeof examTypeColors]
                      }`}
                    >
                      {paper.exam_type}
                    </span>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        statusColors[paper.status as keyof typeof statusColors]
                      }`}
                    >
                      {paper.status.replace(/_/g, ' ').toUpperCase()}
                    </span>
                    <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                      {paper.total_marks} marks
                    </span>
                  </div>

                  <h3 className="mb-1 text-lg font-semibold text-gray-900 dark:text-white">
                    {paper.course_code} - {paper.course_title}
                  </h3>

                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <span>AY {paper.academic_year}</span>
                    <span>•</span>
                    <span>Semester {paper.semester}</span>
                    <span>•</span>
                    <span>By {paper.created_by_name}</span>
                    {paper.exam_date && (
                      <>
                        <span>•</span>
                        <span>{new Date(paper.exam_date).toLocaleDateString()}</span>
                      </>
                    )}
                  </div>
                </div>

                <div className="ml-4 flex gap-2">
                  <Link
                    href={`/exam-papers/${paper.id}`}
                    className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                  >
                    View
                  </Link>
                  {paper.status === 'draft' && (
                    <>
                      <Link
                        href={`/exam-papers/${paper.id}/edit`}
                        className="rounded-lg border border-blue-300 px-3 py-1.5 text-sm font-medium text-blue-700 transition hover:bg-blue-50 dark:border-blue-600 dark:text-blue-400 dark:hover:bg-blue-900/20"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(paper.id)}
                        className="rounded-lg border border-red-300 px-3 py-1.5 text-sm font-medium text-red-700 transition hover:bg-red-50 dark:border-red-600 dark:text-red-400 dark:hover:bg-red-900/20"
                      >
                        Delete
                      </button>
                    </>
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