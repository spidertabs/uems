/* eslint-disable react-hooks/exhaustive-deps */
// src/app/print-queue/history/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface PrintHistory {
  id: number;
  paper_code: string;
  course_code: string;
  course_name: string;
  exam_type: string;
  exam_date: string;
  printed_at: string;
  print_quantity: number;
  exam_master_name: string;
  total_marks: number;
  duration: number;
  programmes: string;
  status: string;
}

export default function PrintHistoryPage() {
  const router = useRouter();
  const [history, setHistory] = useState<PrintHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterYear, setFilterYear] = useState<string>('all');

  useEffect(() => {
    fetchPrintHistory();
  }, []);

  const fetchPrintHistory = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/print-queue/history');
      
      if (response.status === 401) {
        router.push('/auth/login');
        return;
      }

      if (response.ok) {
        const data = await response.json();
        setHistory(data.data || []);
      }
    } catch (error) {
      console.error('Failed to fetch print history:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredHistory = history.filter(item => {
    const matchesSearch = 
      item.paper_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.course_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.programmes.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesYear = filterYear === 'all' || 
      new Date(item.printed_at).getFullYear().toString() === filterYear;

    return matchesSearch && matchesYear;
  });

  const years = Array.from(
    new Set(history.map(item => new Date(item.printed_at).getFullYear()))
  ).sort((a, b) => b - a);

  const totalPrinted = filteredHistory.reduce((sum, item) => sum + item.print_quantity, 0);

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
            📜 Print History
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Complete record of all printed exam papers
          </p>
        </div>
        <Link
          href="/print-queue"
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
        >
          ← Back to Queue
        </Link>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-md dark:border-gray-700 dark:bg-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Total Papers Printed
              </p>
              <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                {filteredHistory.length}
              </p>
            </div>
            <div className="rounded-full bg-blue-100 p-3 dark:bg-blue-900/20">
              <span className="text-2xl">📄</span>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-md dark:border-gray-700 dark:bg-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Total Copies Printed
              </p>
              <p className="mt-2 text-3xl font-bold text-green-600 dark:text-green-400">
                {totalPrinted.toLocaleString()}
              </p>
            </div>
            <div className="rounded-full bg-green-100 p-3 dark:bg-green-900/20">
              <span className="text-2xl">🖨️</span>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-md dark:border-gray-700 dark:bg-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Average Copies/Paper
              </p>
              <p className="mt-2 text-3xl font-bold text-purple-600 dark:text-purple-400">
                {filteredHistory.length > 0 ? Math.round(totalPrinted / filteredHistory.length) : 0}
              </p>
            </div>
            <div className="rounded-full bg-purple-100 p-3 dark:bg-purple-900/20">
              <span className="text-2xl">📊</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <select
          value={filterYear}
          onChange={(e) => setFilterYear(e.target.value)}
          className="rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white"
        >
          <option value="all">All Years</option>
          {years.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Search papers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white"
        />
      </div>

      {/* History Table */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800">
        {filteredHistory.length === 0 ? (
          <div className="p-12 text-center">
            <div className="mb-4 text-6xl">📭</div>
            <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
              No Print History Found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              No papers have been printed yet or no results match your filters.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-900">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Paper Code
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Course
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Exam Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Printed
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Copies
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Printed By
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                {filteredHistory.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="font-medium text-gray-900 dark:text-white">
                        {item.paper_code}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 dark:text-white">
                        {item.course_code}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {item.course_name}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {getExamTypeBadge(item.exam_type)}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900 dark:text-white">
                      {new Date(item.exam_date).toLocaleDateString()}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900 dark:text-white">
                      {new Date(item.printed_at).toLocaleDateString()}
                      <div className="text-xs text-gray-500">
                        {new Date(item.printed_at).toLocaleTimeString()}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800 dark:bg-green-900/20 dark:text-green-400">
                        {item.print_quantity}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900 dark:text-white">
                      {item.exam_master_name}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm">
                      <Link
                        href={`/exam-papers/${item.id}/preview`}
                        className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}