/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
// src/app/exam-papers/[paperId]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

interface ExamPaper {
  id: number;
  paper_code: string;
  course_code: string;
  course_title: string;
  exam_type: string;
  academic_year: number;
  semester: number;
  exam_date: string;
  duration: number;
  total_marks: number;
  instructions: string;
  status: string;
  created_by: number;
  created_by_name: string;
  created_at: string;
  submitted_at: string;
  hod_name: string;
  dean_name: string;
}

interface Question {
  id: number;
  question_text: string;
  question_type: string;
  marks: number;
  section: string;
  sequence_order: number;
  difficulty_level: string;
  bloom_taxonomy: string;
  study_unit_name: string;
}

interface Programme {
  id: number;
  code: string;
  name: string;
  level: string;
  duration_years: number;
  department_name: string | null;
  department_code: string | null;
  college_name: string | null;
  college_code: string | null;
}

interface User {
  role: string;
  id: number;
}

export default function ViewExamPaperPage() {
  const router = useRouter();
  const params = useParams();
  const paperId = params.paperId as string;

  const [paper, setPaper] = useState<ExamPaper | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [programmes, setProgrammes] = useState<Programme[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [approvalAction, setApprovalAction] = useState<'approve' | 'reject'>('approve');
  const [comments, setComments] = useState('');
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    fetchData();
  }, [paperId]);

  const fetchData = async () => {
    try {
      const [userRes, paperRes] = await Promise.all([
        fetch('/api/auth/me'),
        fetch(`/api/exam-papers/${paperId}`),
      ]);

      if (userRes.ok) {
        const userData = await userRes.json();
        setUser(userData.user);
      }

      if (paperRes.ok) {
        const paperData = await paperRes.json();
        setPaper(paperData.paper);
        setQuestions(paperData.questions || []);
        setProgrammes(paperData.programmes || []);
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!confirm('Are you sure you want to submit this paper for approval?')) return;

    setProcessing(true);
    try {
      const response = await fetch(`/api/exam-papers/${paperId}/submit`, {
        method: 'POST',
      });

      if (response.ok) {
        alert('Paper submitted successfully!');
        fetchData();
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to submit paper');
      }
    } catch (error) {
      console.error('Submit error:', error);
      alert('Failed to submit paper');
    } finally {
      setProcessing(false);
    }
  };

  const handleApproval = async () => {
    setProcessing(true);
    try {
      const response = await fetch(`/api/exam-papers/${paperId}/approve`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: approvalAction,
          comments,
        }),
      });

      if (response.ok) {
        alert(`Paper ${approvalAction === 'approve' ? 'approved' : 'rejected'} successfully!`);
        setShowApprovalModal(false);
        setComments('');
        fetchData();
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to process approval');
      }
    } catch (error) {
      console.error('Approval error:', error);
      alert('Failed to process approval');
    } finally {
      setProcessing(false);
    }
  };

  // Helper to format date (e.g., "Dec 24 2025")
  const formatDate = (dateString: string) => {
    if (!dateString) return 'Not set';
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    };
    return date.toLocaleDateString('en-US', options);
  };

  const canEdit = user && paper && paper.created_by === user.id && paper.status === 'draft';
  const canSubmit = user && paper && paper.created_by === user.id && paper.status === 'draft' && questions.length > 0;
  const canApprove = user && paper && (
    (user.role === 'hod' && paper.status === 'submitted') ||
    (user.role === 'dean' && paper.status === 'hod_approved') ||
    user.role === 'admin'
  );

  const statusColors: { [key: string]: string } = {
    draft: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
    submitted: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    hod_review: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    hod_approved: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    hod_rejected: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    ready_for_print: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200',
    printed: 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200',
    published: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200',
  };

  const levelColors: { [key: string]: string } = {
    diploma: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
    bachelors: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
    masters: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300',
    phd: 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300',
  };

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!paper) {
    return (
      <div className="text-center">
        <p className="text-gray-600 dark:text-gray-400">Paper not found</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 lg:pl-64">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {paper.paper_code}
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {paper.course_code} - {paper.course_title}
          </p>
        </div>
        <Link
          href="/exam-papers"
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
        >
          ← Back to Papers
        </Link>
      </div>

      {/* Paper Details */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Paper Details
          </h2>
          <span
            className={`rounded-full px-4 py-1 text-sm font-medium ${
              statusColors[paper.status]
            }`}
          >
            {paper.status.replace(/_/g, ' ').toUpperCase()}
          </span>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Exam Type
            </label>
            <p className="mt-1 text-gray-900 dark:text-white">{paper.exam_type}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Total Marks
            </label>
            <p className="mt-1 text-gray-900 dark:text-white">{paper.total_marks}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Academic Year
            </label>
            <p className="mt-1 text-gray-900 dark:text-white">{paper.academic_year}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Semester
            </label>
            <p className="mt-1 text-gray-900 dark:text-white">Semester {paper.semester}</p>
          </div>

          {paper.exam_date && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Exam Date
              </label>
              <p className="mt-1 text-gray-900 dark:text-white">
                {formatDate(paper.exam_date)}
              </p>
            </div>
          )}

          {paper.duration && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Duration
              </label>
              <p className="mt-1 text-gray-900 dark:text-white">{paper.duration} minutes</p>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Created By
            </label>
            <p className="mt-1 text-gray-900 dark:text-white">{paper.created_by_name}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Created At
            </label>
            <p className="mt-1 text-gray-900 dark:text-white">
              {formatDate(paper.created_at)}
            </p>
          </div>
        </div>

        {paper.instructions && (
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Instructions
            </label>
            <p className="mt-1 whitespace-pre-wrap text-gray-900 dark:text-white">
              {paper.instructions}
            </p>
          </div>
        )}
      </div>

      {/* Programmes Section */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Programmes ({programmes.length})
          </h2>
          {canEdit && (
            <Link
              href={`/exam-papers/${paperId}/edit`}
              className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400"
            >
              Edit Programmes
            </Link>
          )}
        </div>

        {programmes.length === 0 ? (
          <div className="rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 py-8 text-center dark:border-gray-600 dark:bg-gray-700/50">
            <div className="text-4xl">🎓</div>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              No programmes assigned yet
            </p>
            {canEdit && (
              <Link
                href={`/exam-papers/${paperId}/edit`}
                className="mt-3 inline-block text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400"
              >
                Assign Programmes →
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
            {programmes.map((programme) => (
              <div
                key={programme.id}
                className="rounded-lg border border-gray-200 bg-gradient-to-br from-white to-gray-50 p-4 transition hover:shadow-md dark:border-gray-700 dark:from-gray-800 dark:to-gray-800/50"
              >
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-lg font-bold text-gray-900 dark:text-white">
                    {programme.code}
                  </span>
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                      levelColors[programme.level] || 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {programme.level.charAt(0).toUpperCase() + programme.level.slice(1)}
                  </span>
                </div>
                <p className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  {programme.name}
                </p>
                {(programme.department_name || programme.college_name) && (
                  <div className="mt-2 space-y-1 border-t border-gray-200 pt-2 text-xs text-gray-500 dark:border-gray-700 dark:text-gray-400">
                    {programme.department_name && (
                      <p className="flex items-center gap-1">
                        <span className="font-medium">Dept:</span>
                        <span>{programme.department_name}</span>
                      </p>
                    )}
                    {programme.college_name && (
                      <p className="flex items-center gap-1">
                        <span className="font-medium">College:</span>
                        <span>{programme.college_name}</span>
                      </p>
                    )}
                  </div>
                )}
                {programme.duration_years && (
                  <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                    Duration: {programme.duration_years} year{programme.duration_years > 1 ? 's' : ''}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Questions */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Questions ({questions.length})
          </h2>
          {canEdit && (
            <Link
              href={`/exam-papers/${paperId}/select-questions`}
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
            >
              {questions.length === 0 ? 'Add Questions' : 'Manage Questions'}
            </Link>
          )}
        </div>

        {questions.length === 0 ? (
          <div className="py-12 text-center">
            <div className="text-6xl">📝</div>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              No questions added yet
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {questions.map((question, index) => (
              <div
                key={question.id}
                className="rounded-lg border border-gray-200 p-4 dark:border-gray-700"
              >
                <div className="mb-2 flex items-start justify-between">
                  <div className="flex gap-2">
                    <span className="font-semibold text-gray-900 dark:text-white">
                      Q{index + 1}.
                    </span>
                    <span className="rounded bg-purple-100 px-2 py-0.5 text-xs text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                      {question.marks} marks
                    </span>
                    <span className="rounded bg-gray-100 px-2 py-0.5 text-xs dark:bg-gray-700">
                      Section {question.section}
                    </span>
                  </div>
                  <div className="flex gap-2 text-xs">
                    <span className="rounded bg-yellow-100 px-2 py-0.5 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                      {question.difficulty_level}
                    </span>
                    <span className="rounded bg-blue-100 px-2 py-0.5 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                      {question.bloom_taxonomy}
                    </span>
                  </div>
                </div>
                <p className="text-gray-900 dark:text-white">{question.question_text}</p>
                {question.study_unit_name && (
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    Study Unit: {question.study_unit_name}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3">
        {canEdit && (
          <Link
            href={`/exam-papers/${paperId}/edit`}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            Edit Details
          </Link>
        )}

        <Link
          href={`/exam-papers/${paperId}/preview`}
          className="rounded-lg border border-blue-300 px-4 py-2 text-sm font-medium text-blue-700 transition hover:bg-blue-50 dark:border-blue-600 dark:text-blue-400 dark:hover:bg-blue-900/20"
        >
          Preview Paper
        </Link>

        {canSubmit && (
          <button
            onClick={handleSubmit}
            disabled={processing}
            className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {processing ? 'Submitting...' : 'Submit for Approval'}
          </button>
        )}

        {canApprove && (
          <>
            <button
              onClick={() => {
                setApprovalAction('reject');
                setShowApprovalModal(true);
              }}
              className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
            >
              Reject
            </button>
            <button
              onClick={() => {
                setApprovalAction('approve');
                setShowApprovalModal(true);
              }}
              className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-700"
            >
              Approve
            </button>
          </>
        )}
      </div>

      {/* Approval Modal */}
      {showApprovalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md rounded-lg bg-white p-6 dark:bg-gray-800">
            <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
              {approvalAction === 'approve' ? 'Approve Paper' : 'Reject Paper'}
            </h3>
            <textarea
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              placeholder={`Add ${approvalAction === 'reject' ? 'rejection reasons' : 'approval notes'} (optional)`}
              rows={4}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
            <div className="mt-4 flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowApprovalModal(false);
                  setComments('');
                }}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleApproval}
                disabled={processing}
                className={`rounded-lg px-4 py-2 text-sm font-medium text-white transition disabled:cursor-not-allowed disabled:opacity-50 ${
                  approvalAction === 'approve'
                    ? 'bg-green-600 hover:bg-green-700'
                    : 'bg-red-600 hover:bg-red-700'
                }`}
              >
                {processing ? 'Processing...' : approvalAction === 'approve' ? 'Confirm Approval' : 'Confirm Rejection'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}