/* eslint-disable @typescript-eslint/no-unused-vars */
// src/app/courses/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Course {
  id: number;
  code: string;
  title: string;
  level: number;
  semester: number;
  credit_units: number;
  department_name: string;
  college_name: string;
  college_abbreviatio: string;
  hod_name: string;
  is_active: boolean;
  study_units_count: number;
}

interface User {
  role: string;
}

export default function CoursesPage() {
  const router = useRouter();
  const [courses, setCourses] = useState<Course[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterLevel, setFilterLevel] = useState<string>('all');
  const [filterSemester, setFilterSemester] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (openMenuId !== null && !(event.target as Element).closest('.menu-container')) {
        setOpenMenuId(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [openMenuId]);

  const fetchData = async () => {
    try {
      const [userRes, coursesRes] = await Promise.all([
        fetch('/api/auth/me'),
        fetch('/api/courses'),
      ]);

      if (userRes.ok) {
        const userData = await userRes.json();
        setUser(userData.user);
      }

      if (coursesRes.ok) {
        const coursesData = await coursesRes.json();
        setCourses(coursesData.courses || []);
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.department_name?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesLevel = filterLevel === 'all' || course.level === parseInt(filterLevel);
    const matchesSemester =
      filterSemester === 'all' || course.semester === parseInt(filterSemester);
    const matchesStatus =
      filterStatus === 'all' ||
      (filterStatus === 'active' && course.is_active) ||
      (filterStatus === 'inactive' && !course.is_active);

    return matchesSearch && matchesLevel && matchesSemester && matchesStatus;
  });

  const handleDeleteCourse = async (courseId: number) => {
    if (!confirm('Are you sure you want to delete this course? This will also delete all associated study units.')) {
      return;
    }

    try {
      const response = await fetch(`/api/courses/${courseId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setCourses(courses.filter((c) => c.id !== courseId));
        alert('Course deleted successfully');
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to delete course');
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('Failed to delete course');
    }
    setOpenMenuId(null);
  };

  const toggleMenu = (courseId: number) => {
    setOpenMenuId(openMenuId === courseId ? null : courseId);
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
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Courses</h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Manage courses and study units
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {user?.role === 'admin' && (
            <Link
              href="/courses/import"
              className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-700"
            >
              📤 Import Courses
            </Link>
          )}
          <Link
            href="/courses/create"
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            ➕ Create Course
          </Link>
        </div>
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
              placeholder="Search by code, title, or department..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Level
            </label>
            <select
              value={filterLevel}
              onChange={(e) => setFilterLevel(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            >
              <option value="all">All Levels</option>
              <option value="1">Level 1</option>
              <option value="2">Level 2</option>
              <option value="3">Level 3</option>
              <option value="4">Level 4</option>
              <option value="5">Level 5</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Semester
            </label>
            <select
              value={filterSemester}
              onChange={(e) => setFilterSemester(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            >
              <option value="all">All Semesters</option>
              <option value="1">Semester 1</option>
              <option value="2">Semester 2</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Status
            </label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {courses.length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Total Courses</div>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
            {courses.filter((c) => c.is_active).length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Active Courses</div>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {courses.reduce((sum, c) => sum + (c.study_units_count || 0), 0)}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Study Units</div>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
            {filteredCourses.length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Filtered Results</div>
        </div>
      </div>

      {/* Courses List */}
      {filteredCourses.length === 0 ? (
        <div className="rounded-lg border border-gray-200 bg-white p-12 text-center shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="text-6xl">📚</div>
          <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
            No courses found
          </h3>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {searchQuery || filterLevel !== 'all' || filterSemester !== 'all'
              ? 'Try adjusting your filters'
              : 'Get started by creating your first course'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
            >
              <div className="mb-4 flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/courses/${course.id}`}
                      className="text-lg font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400"
                    >
                      {course.code}
                    </Link>
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                        course.is_active
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                      }`}
                    >
                      {course.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  <h3 className="mt-1 font-medium text-gray-900 dark:text-white">
                    {course.title}
                  </h3>
                </div>
                
                {/* Three-dot Menu */}
                <div className="menu-container relative ml-2">
                  <button
                    onClick={() => toggleMenu(course.id)}
                    className="rounded-lg p-1 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                    </svg>
                  </button>
                  
                  {openMenuId === course.id && (
                    <div className="absolute right-0 top-8 z-10 w-48 rounded-lg border border-gray-200 bg-white shadow-lg dark:border-gray-600 dark:bg-gray-800">
                      <Link
                        href={`/courses/${course.id}`}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 rounded-t-lg"
                        onClick={() => setOpenMenuId(null)}
                      >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        View Details
                      </Link>
                      <Link
                        href={`/courses/${course.id}/study-units`}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                        onClick={() => setOpenMenuId(null)}
                      >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                        Study Units
                      </Link>
                      <Link
                        href={`/courses/edit/${course.id}`}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                        onClick={() => setOpenMenuId(null)}
                      >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Edit
                      </Link>
                      {user?.role === 'admin' && (
                        <button
                          onClick={() => handleDeleteCourse(course.id)}
                          className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 rounded-b-lg"
                        >
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          Delete
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <span className="w-24 font-medium">Department:</span>
                  <span>{course.department_name || 'N/A'}</span>
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <span className="w-24 font-medium">College:</span>
                  <span>{course.college_name || 'N/A'}</span>
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <span className="w-24 font-medium">Study Year: </span>
                  <span> {course.level}</span>
                  <span className="mx-2">:</span>
                  <span> {course.semester}</span>
                  <span className="mx-2">•</span>
                  <span className="font-medium text-blue-600 dark:text-blue-400"> {course.study_units_count || 0} </span> <span className="mx-2">SU</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}