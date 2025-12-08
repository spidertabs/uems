/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/exhaustive-deps */
// src/app/question-bank/edit/[id]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

interface Course {
  id: number;
  code: string;
  title: string;
}

interface StudyUnit {
  id: number;
  code: string;
  name: string;
}

interface Question {
  id: number;
  course_id: number;
  study_unit_id?: number;
  question_type: string;
  difficulty_level: string;
  question_text: string;
  options?: string[];
  correct_answer?: string;
  marks: number;
  time_allocation?: number;
  learning_outcome?: string;
  keywords?: string;
  bloom_taxonomy?: string;
  tags?: string[];
  is_active: boolean;
}

export default function EditQuestionPage() {
  const router = useRouter();
  const params = useParams();
  const questionId = params.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [courses, setCourses] = useState<Course[]>([]);
  const [studyUnits, setStudyUnits] = useState<StudyUnit[]>([]);
  const [question, setQuestion] = useState<Question | null>(null);
  
  const [formData, setFormData] = useState({
    course_id: '',
    study_unit_id: '',
    question_type: 'multiple_choice',
    difficulty_level: 'medium',
    question_text: '',
    options: ['', '', '', ''],
    correct_answer: '',
    marks: 1,
    time_allocation: 5,
    learning_outcome: '',
    keywords: '',
    bloom_taxonomy: 'understand',
    tags: '',
    is_active: true,
  });

  useEffect(() => {
    fetchData();
  }, [questionId]);

  useEffect(() => {
    if (formData.course_id) {
      fetchStudyUnits(formData.course_id);
    }
  }, [formData.course_id]);

  const fetchData = async () => {
    try {
      const [coursesRes, questionRes] = await Promise.all([
        fetch('/api/courses'),
        fetch(`/api/question-bank/${questionId}`),
      ]);

      if (coursesRes.ok) {
        const coursesData = await coursesRes.json();
        setCourses(coursesData.courses || []);
      }

      if (questionRes.ok) {
        const questionData = await questionRes.json();
        const q = questionData.question;
        setQuestion(q);

        setFormData({
          course_id: q.course_id?.toString() || '',
          study_unit_id: q.study_unit_id?.toString() || '',
          question_type: q.question_type,
          difficulty_level: q.difficulty_level,
          question_text: q.question_text,
          options: q.options || ['', '', '', ''],
          correct_answer: q.correct_answer || '',
          marks: q.marks,
          time_allocation: q.time_allocation || 5,
          learning_outcome: q.learning_outcome || '',
          keywords: q.keywords || '',
          bloom_taxonomy: q.bloom_taxonomy || 'understand',
          tags: q.tags ? q.tags.join(', ') : '',
          is_active: q.is_active,
        });
      } else {
        alert('Question not found');
        router.push('/question-bank');
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
      alert('Failed to load question');
    } finally {
      setLoading(false);
    }
  };

  const fetchStudyUnits = async (courseId: string) => {
    try {
      const response = await fetch(`/api/courses/${courseId}/study-units`);
      if (response.ok) {
        const data = await response.json();
        setStudyUnits(data.study_units || []);
      }
    } catch (error) {
      console.error('Failed to fetch study units:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...formData.options];
    newOptions[index] = value;
    setFormData((prev) => ({ ...prev, options: newOptions }));
  };

  const addOption = () => {
    setFormData((prev) => ({
      ...prev,
      options: [...prev.options, ''],
    }));
  };

  const removeOption = (index: number) => {
    if (formData.options.length <= 2) {
      alert('At least 2 options required');
      return;
    }
    const newOptions = formData.options.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, options: newOptions }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const payload = {
        ...formData,
        course_id: parseInt(formData.course_id),
        study_unit_id: formData.study_unit_id ? parseInt(formData.study_unit_id) : null,
        marks: parseInt(formData.marks.toString()),
        time_allocation: formData.time_allocation ? parseInt(formData.time_allocation.toString()) : null,
        options: formData.question_type === 'multiple_choice' ? formData.options.filter(opt => opt.trim()) : null,
        tags: formData.tags ? formData.tags.split(',').map(tag => tag.trim()).filter(Boolean) : null,
      };

      const response = await fetch(`/api/question-bank/${questionId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert('Question updated successfully!');
        router.push('/question-bank');
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to update question');
      }
    } catch (error) {
      console.error('Submit error:', error);
      alert('Failed to update question');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!question) {
    return null;
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6 lg:pl-64">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Edit Question</h1>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          Update question details
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Course & Study Unit */}
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Course Information</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Course *
              </label>
              <select
                name="course_id"
                value={formData.course_id}
                onChange={handleInputChange}
                required
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              >
                <option value="">Select course</option>
                {courses.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.code} - {course.title}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Study Unit (Optional)
              </label>
              <select
                name="study_unit_id"
                value={formData.study_unit_id}
                onChange={handleInputChange}
                disabled={!formData.course_id || studyUnits.length === 0}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:disabled:bg-gray-800"
              >
                <option value="">Select study unit</option>
                {studyUnits.map((unit) => (
                  <option key={unit.id} value={unit.id}>
                    {unit.code} - {unit.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Question Details */}
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Question Details</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Question Type *
                </label>
                <select
                  name="question_type"
                  value={formData.question_type}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                >
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
                  Difficulty Level *
                </label>
                <select
                  name="difficulty_level"
                  value={formData.difficulty_level}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                >
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Bloom's Taxonomy
                </label>
                <select
                  name="bloom_taxonomy"
                  value={formData.bloom_taxonomy}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                >
                  <option value="remember">Remember</option>
                  <option value="understand">Understand</option>
                  <option value="apply">Apply</option>
                  <option value="analyze">Analyze</option>
                  <option value="evaluate">Evaluate</option>
                  <option value="create">Create</option>
                </select>
              </div>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Question Text *
              </label>
              <textarea
                name="question_text"
                value={formData.question_text}
                onChange={handleInputChange}
                required
                rows={4}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
            </div>

            {formData.question_type === 'multiple_choice' && (
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Options *
                </label>
                <div className="space-y-2">
                  {formData.options.map((option, index) => (
                    <div key={index} className="flex gap-2">
                      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-sm font-medium dark:bg-gray-700">
                        {String.fromCharCode(65 + index)}
                      </span>
                      <input
                        type="text"
                        value={option}
                        onChange={(e) => handleOptionChange(index, e.target.value)}
                        className="flex-1 rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                      />
                      {formData.options.length > 2 && (
                        <button
                          type="button"
                          onClick={() => removeOption(index)}
                          className="rounded-lg border border-red-300 px-3 text-red-600 hover:bg-red-50 dark:border-red-700 dark:text-red-400 dark:hover:bg-red-900/20"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={addOption}
                  className="mt-2 text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400"
                >
                  + Add Option
                </button>
              </div>
            )}

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Correct Answer
              </label>
              <input
                type="text"
                name="correct_answer"
                value={formData.correct_answer}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Marks *
                </label>
                <input
                  type="number"
                  name="marks"
                  value={formData.marks}
                  onChange={handleInputChange}
                  required
                  min="1"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Time Allocation (minutes)
                </label>
                <input
                  type="number"
                  name="time_allocation"
                  value={formData.time_allocation}
                  onChange={handleInputChange}
                  min="1"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Learning Outcome
              </label>
              <textarea
                name="learning_outcome"
                value={formData.learning_outcome}
                onChange={handleInputChange}
                rows={2}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Keywords (comma-separated)
                </label>
                <input
                  type="text"
                  name="keywords"
                  value={formData.keywords}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Tags (comma-separated)
                </label>
                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="is_active"
                name="is_active"
                checked={formData.is_active}
                onChange={handleInputChange}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="is_active" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                Active (available for use in exam papers)
              </label>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={saving}
            className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="rounded-lg border border-gray-300 px-6 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}