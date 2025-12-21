/* eslint-disable react-hooks/exhaustive-deps */
// src/app/exam-papers/[paperId]/edit/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

export default function EditExamPaperPage() {
  const router = useRouter();
  const params = useParams();
  const paperId = params.paperId as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    exam_type: 'TEST',
    academic_year: new Date().getFullYear(),
    semester: 1,
    exam_date: '',
    duration: 60,
    instructions: '',
  });

  useEffect(() => {
    fetchPaper();
  }, [paperId]);

  const fetchPaper = async () => {
    try {
      const response = await fetch(`/api/exam-papers/${paperId}`);
      if (response.ok) {
        const data = await response.json();
        const paper = data.paper;
        
        setFormData({
          exam_type: paper.exam_type,
          academic_year: paper.academic_year,
          semester: paper.semester,
          exam_date: paper.exam_date ? paper.exam_date.split('T')[0] : '',
          duration: paper.duration || 60,
          instructions: paper.instructions || '',
        });
      } else {
        alert('Failed to load paper details');
        router.push('/exam-papers');
      }
    } catch (error) {
      console.error('Failed to fetch paper:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const response = await fetch(`/api/exam-papers/${paperId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Paper updated successfully!');
        router.push(`/exam-papers/${paperId}`);
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to update paper');
      }
    } catch (error) {
      console.error('Update error:', error);
      alert('Failed to update paper');
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'semester' || name === 'academic_year' || name === 'duration'
        ? parseInt(value) || ''
        : value,
    }));
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
            Edit Exam Paper
          </h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Update paper details
          </p>
        </div>
        <Link
          href={`/exam-papers/${paperId}`}
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
        >
          ← Back to Paper
        </Link>
      </div>

      {/* Form */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Exam Type */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Exam Type <span className="text-red-500">*</span>
            </label>
            <select
              name="exam_type"
              value={formData.exam_type}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            >
              <option value="TEST">Test</option>
              <option value="CAT">CAT</option>
              <option value="FINAL">Final Exam</option>
            </select>
          </div>

          {/* Academic Year and Semester */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Academic Year <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="academic_year"
                value={formData.academic_year}
                onChange={handleChange}
                required
                min="2020"
                max="2099"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Semester <span className="text-red-500">*</span>
              </label>
              <select
                name="semester"
                value={formData.semester}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              >
                <option value={1}>Semester 1</option>
                <option value={2}>Semester 2</option>
                <option value={3}>Semester 3</option>
              </select>
            </div>
          </div>

          {/* Exam Date and Duration */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Exam Date
              </label>
              <input
                type="date"
                name="exam_date"
                value={formData.exam_date}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Duration (minutes)
              </label>
              <input
                type="number"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                min="30"
                step="15"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>

          {/* Instructions */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Instructions
            </label>
            <textarea
              name="instructions"
              value={formData.instructions}
              onChange={handleChange}
              rows={6}
              placeholder="Enter exam instructions..."
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-3">
            <Link
              href={`/exam-papers/${paperId}`}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}