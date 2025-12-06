/* eslint-disable react-hooks/exhaustive-deps */
// src/app/courses/[id]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

interface Course {
  id: number;
  code: string;
  title: string;
  level: number;
  semester: number;
  credit_units: number;
  description: string;
  is_active: boolean;
  department_name: string;
  college_name: string;
  hod_name: string;
  created_at: string;
  updated_at: string;
}

interface StudyUnit {
  id: number;
  code: string;
  name: string;
  sequence_order: number;
  is_active: boolean;
  questions_count: number;
}

interface Stats {
  total_study_units: number;
  total_questions: number;
  total_papers: number;
  active_lecturers: number;
}

export default function CourseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const courseId = params.id as string;

  const [course, setCourse] = useState<Course | null>(null);
  const [studyUnits, setStudyUnits] = useState<StudyUnit[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (courseId) {
      fetchCourseData();
    }
  }, [courseId]);

  const fetchCourseData = async () => {
    try {
      const [courseRes, unitsRes, statsRes] = await Promise.all([
        fetch(`/api/courses/${courseId}`),
        fetch(`/api/courses/${courseId}/study-units`),
        fetch(`/api/courses/${courseId}/stats`),
      ]);

      if (courseRes.ok) {
        const data = await courseRes.json();
        setCourse(data.course);
      }

      if (unitsRes.ok) {
        const data = await unitsRes.json();
        setStudyUnits(data.study_units || []);
      }

      if (statsRes.ok) {
        const data = await statsRes.json();
        setStats(data.stats);
      }
    } catch (error) {
      console.error('Failed to fetch course data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCourse = async () => {
    if (!confirm('Are you sure you want to delete this course? All study units and associated data will be permanently deleted.')) {
      return;
    }

    try {
      const response = await fetch(`/api/courses/${courseId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('Course deleted successfully');
        router.push('/courses');
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to delete course');
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('Failed to delete course');
    }
  };

  const toggleCourseStatus = async () => {
    if (!course) return;

    try {
      const response = await fetch(`/api/courses/${courseId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_active: !course.is_active }),
      });

      if (response.ok) {
        const data = await response.json();
        setCourse(data.course);
        alert(`Course ${data.course.is_active ? 'activated' : 'deactivated'} successfully`);
      }
    } catch (error) {
      console.error('Toggle status error:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-12 text-center dark:border-gray-700 dark:bg-gray-800">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Course not found</h2>
        <Link href="/courses" className="mt-4 inline-block text-blue-600 hover:text-blue-700">
          ← Back to Courses
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <Link
          href="/courses"
          className="mb-4 inline-flex items-center text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400"
        >
          ← Back to Courses
        </Link>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                {course.code}
              </h1>
              <span
                className={`rounded-full px-3 py-1 text-sm font-medium ${
                  course.is_active
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                }`}
              >
                {course.is_active ? 'Active' : 'Inactive'}
              </span>
            </div>
            <h2 className="mt-2 text-xl text-gray-700 dark:text-gray-300">{course.title}</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              href={`/courses/edit/${courseId}`}
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
            >
              ✏️ Edit
            </Link>
            <button
              onClick={toggleCourseStatus}
              className="rounded-lg bg-yellow-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-yellow-700"
            >
              {course.is_active ? '❌ Deactivate' : '✅ Activate'}
            </button>
            <button
              onClick={handleDeleteCourse}
              className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
            >
              🗑️ Delete
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      {stats && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {stats.total_study_units}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Study Units</div>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {stats.total_questions}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Questions</div>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {stats.total_papers}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Exam Papers</div>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
              {stats.active_lecturers}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Active Lecturers</div>
          </div>
        </div>
      )}

      {/* Course Details */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          Course Information
        </h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              College:
            </span>
            <p className="mt-1 text-gray-900 dark:text-white">
              {course.college_name || 'N/A'}
            </p>
          </div>
          <div>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Department:
            </span>
            <p className="mt-1 text-gray-900 dark:text-white">
              {course.department_name || 'N/A'}
            </p>
          </div>
          <div>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Level & Semester:
            </span>
            <p className="mt-1 text-gray-900 dark:text-white">
              Level {course.level}, Semester {course.semester}
            </p>
          </div>
          <div>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Credit Units:
            </span>
            <p className="mt-1 text-gray-900 dark:text-white">{course.credit_units} CU</p>
          </div>
          <div className="md:col-span-2">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              HOD:
            </span>
            <p className="mt-1 text-gray-900 dark:text-white">{course.hod_name || 'Not assigned'}</p>
          </div>
          {course.description && (
            <div className="md:col-span-2">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Description:
              </span>
              <p className="mt-1 text-gray-900 dark:text-white">{course.description}</p>
            </div>
          )}
        </div>
      </div>

      {/* Study Units */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Study Units</h3>
          <Link
            href={`/courses/${courseId}/study-units/create`}
            className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-700"
          >
            ➕ Add Study Unit
          </Link>
        </div>

        {studyUnits.length === 0 ? (
          <div className="py-12 text-center">
            <div className="text-5xl">📚</div>
            <h4 className="mt-4 font-medium text-gray-900 dark:text-white">
              No study units yet
            </h4>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Add study units to organize course content
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {studyUnits.map((unit) => (
              <Link
                key={unit.id}
                href={`/courses/${courseId}/study-units/${unit.id}`}
                className="block rounded-lg border border-gray-200 p-4 transition hover:border-blue-500 hover:shadow-md dark:border-gray-700 dark:hover:border-blue-500"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-blue-600 dark:text-blue-400">
                        {unit.code}
                      </span>
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                          unit.is_active
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                            : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                        }`}
                      >
                        {unit.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    <h4 className="mt-1 text-gray-900 dark:text-white">{unit.name}</h4>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                      {unit.questions_count} question{unit.questions_count !== 1 ? 's' : ''}
                    </p>
                  </div>
                  <div className="text-2xl text-gray-400">→</div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Metadata */}
      <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 text-sm dark:border-gray-700 dark:bg-gray-800">
        <div className="flex flex-wrap gap-4">
          <div>
            <span className="text-gray-600 dark:text-gray-400">Created:</span>{' '}
            <span className="text-gray-900 dark:text-white">
              {new Date(course.created_at).toLocaleString()}
            </span>
          </div>
          <div>
            <span className="text-gray-600 dark:text-gray-400">Last Updated:</span>{' '}
            <span className="text-gray-900 dark:text-white">
              {new Date(course.updated_at).toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}