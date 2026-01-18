/* eslint-disable react-hooks/exhaustive-deps */
// src/app/print-queue/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface PrintQueuePaper {
  id: number;
  paper_code: string;
  status: string;
  exam_type: string;
  exam_date: string;
  course_code: string;
  course_name: string;
  total_marks: number;
  duration: number;
  hod_approved_at: string;
  print_quantity: number;
  department_name: string;
  college_name: string;
  programmes: string;
  programme_names: string;
}

export default function PrintQueuePage() {
  const router = useRouter();
  const [papers, setPapers] = useState<PrintQueuePaper[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'ready_for_print' | 'printing'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchPrintQueue();
  }, [filter]);

  const fetchPrintQueue = async () => {
    try {
      setLoading(true);
      const url = `/api/print-queue${filter !== 'all' ? `?status=${filter}` : ''}`;
      const response = await fetch(url);
      
      if (response.status === 401) {
        router.push('/auth/login');
        return;
      }

      if (response.ok) {
        const data = await response.json();
        setPapers(data.data || []);
      }
    } catch (error) {
      console.error('Failed to fetch print queue:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStartPrinting = async (paperId: number) => {
    if (!confirm('Start printing this paper?')) return;

    try {
      const response = await fetch(`/api/print-queue/${paperId}/start`, {
        method: 'POST',
      });

      if (response.ok) {
        alert('Printing started successfully');
        fetchPrintQueue();
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to start printing');
      }
    } catch (error) {
      console.error('Failed to start printing:', error);
      alert('Failed to start printing');
    }
  };

  const handleCompletePrinting = async (paperId: number) => {
    const quantity = prompt('Enter number of copies printed:');
    if (!quantity || isNaN(Number(quantity))) return;

    try {
      const response = await fetch(`/api/print-queue/${paperId}/complete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity: Number(quantity) }),
      });

      if (response.ok) {
        alert('Printing completed successfully');
        fetchPrintQueue();
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to complete printing');
      }
    } catch (error) {
      console.error('Failed to complete printing:', error);
      alert('Failed to complete printing');
    }
  };

  const filteredPapers = papers.filter(paper =>
    paper.paper_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    paper.course_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    paper.programmes.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    const badges: Record<string, { bg: string; text: string; label: string }> = {
      ready_for_print: { bg: 'bg-green-100', text: 'text-green-800', label: 'Ready' },
      printing: { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Printing' },
      printed: { bg: 'bg-gray-100', text: 'text-gray-800', label: 'Printed' },
    };

    const badge = badges[status] || { bg: 'bg-gray-100', text: 'text-gray-800', label: status };

    return (
      <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${badge.bg} ${badge.text}`}>
        {badge.label}
      </span>
    );
  };

  const getExamTypeBadge = (type: string) => {
    const colors: Record<string, string> = {
      TEST: 'bg-blue-500',
      CAT: 'bg-purple-500',
      FINAL: 'bg-red-500',
    };

    return (
      <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium text-white ${colors[type] || 'bg-gray-500'}`}>
        {type}
      </span>
    );
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
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            🖨️ Print Queue
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Manage papers ready for printing
          </p>
        </div>
        <Link
          href="/print-queue/history"
          className="rounded-lg bg-gray-200 px-4 py-2 text-sm font-medium text-gray-900 transition hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
        >
          📜 Print History
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-md dark:border-gray-700 dark:bg-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Ready for Print
              </p>
              <p className="mt-2 text-3xl font-bold text-green-600 dark:text-green-400">
                {papers.filter(p => p.status === 'ready_for_print').length}
              </p>
            </div>
            <div className="rounded-full bg-green-100 p-3 dark:bg-green-900/20">
              <span className="text-2xl">✅</span>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-md dark:border-gray-700 dark:bg-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Currently Printing
              </p>
              <p className="mt-2 text-3xl font-bold text-blue-600 dark:text-blue-400">
                {papers.filter(p => p.status === 'printing').length}
              </p>
            </div>
            <div className="rounded-full bg-blue-100 p-3 dark:bg-blue-900/20">
              <span className="text-2xl">🖨️</span>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-md dark:border-gray-700 dark:bg-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Total in Queue
              </p>
              <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                {papers.length}
              </p>
            </div>
            <div className="rounded-full bg-gray-100 p-3 dark:bg-gray-700">
              <span className="text-2xl">📋</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
              filter === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-900 hover:bg-gray-300 dark:bg-gray-700 dark:text-white'
            }`}
          >
            All Papers
          </button>
          <button
            onClick={() => setFilter('ready_for_print')}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
              filter === 'ready_for_print'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-900 hover:bg-gray-300 dark:bg-gray-700 dark:text-white'
            }`}
          >
            Ready to Print
          </button>
          <button
            onClick={() => setFilter('printing')}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
              filter === 'printing'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-900 hover:bg-gray-300 dark:bg-gray-700 dark:text-white'
            }`}
          >
            Printing
          </button>
        </div>

        <input
          type="text"
          placeholder="Search papers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white"
        />
      </div>

      {/* Papers List */}
      <div className="space-y-4">
        {filteredPapers.length === 0 ? (
          <div className="rounded-xl border border-gray-200 bg-white p-12 text-center shadow-md dark:border-gray-700 dark:bg-gray-800">
            <div className="mb-4 text-6xl">📭</div>
            <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
              No Papers in Queue
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              There are no papers ready for printing at the moment.
            </p>
          </div>
        ) : (
          filteredPapers.map((paper) => (
            <div
              key={paper.id}
              className="rounded-xl border border-gray-200 bg-white p-6 shadow-md transition hover:shadow-lg dark:border-gray-700 dark:bg-gray-800"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="mb-3 flex items-center gap-3">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {paper.paper_code}
                    </h3>
                    {getStatusBadge(paper.status)}
                    {getExamTypeBadge(paper.exam_type)}
                  </div>

                  <p className="mb-2 text-gray-900 dark:text-white">
                    <strong>Course:</strong> {paper.course_code} - {paper.course_name}
                  </p>

                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <div>
                      <p><strong>College:</strong> {paper.college_name}</p>
                      <p><strong>Department:</strong> {paper.department_name}</p>
                      <p><strong>Programmes:</strong> {paper.programmes}</p>
                    </div>
                    <div>
                      <p><strong>Exam Date:</strong> {new Date(paper.exam_date).toLocaleDateString()}</p>
                      <p><strong>Duration:</strong> {paper.duration} minutes</p>
                      <p><strong>Total Marks:</strong> {paper.total_marks}</p>
                      <p><strong>Approved:</strong> {new Date(paper.hod_approved_at).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>

                <div className="ml-4 flex flex-col gap-2">
                  <Link
                    href={`/print-queue/${paper.id}`}
                    className="rounded-lg bg-blue-600 px-4 py-2 text-center text-sm font-medium text-white transition hover:bg-blue-700"
                  >
                    👁️ Preview
                  </Link>

                  {paper.status === 'ready_for_print' && (
                    <button
                      onClick={() => handleStartPrinting(paper.id)}
                      className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-700"
                    >
                      🖨️ Start Printing
                    </button>
                  )}

                  {paper.status === 'printing' && (
                    <button
                      onClick={() => handleCompletePrinting(paper.id)}
                      className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-purple-700"
                    >
                      ✅ Complete
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}