/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface DashboardStats {
  // Common stats
  myPapers: number;
  myQuestions: number;
  notifications: number;
  
  // Role-specific stats
  pendingApprovals?: number;
  papersToReview?: number;
  printQueue?: number;
  activeCourses?: number;
  totalUsers?: number;
  departmentCourses?: number;
  collegePapers?: number;
}

interface User {
  id: number;
  role: string;
  name: string;
  email: string;
  department_id?: number;
  college_id?: number;
}

interface RecentActivity {
  id: number;
  type: string;
  title: string;
  description: string;
  timestamp: string;
  icon: string;
  link?: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [stats, setStats] = useState<DashboardStats>({
    myPapers: 0,
    myQuestions: 0,
    notifications: 0,
  });
  const [user, setUser] = useState<User | null>(null);
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [userRes, statsRes, activityRes] = await Promise.all([
        fetch('/api/auth/me'),
        fetch('/api/stats'),
        fetch('/api/stats/recent-activity').catch(() => null), // Optional endpoint
      ]);

      // Redirect to login if not authenticated
      if (userRes.status === 401) {
        router.push('/auth/login');
        return;
      }

      if (userRes.ok) {
        const userData = await userRes.json();
        setUser(userData.user);
      }

      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setStats(statsData.data || statsData);
      }

      if (activityRes && activityRes.ok) {
        const activityData = await activityRes.json();
        setRecentActivity(activityData.data || []);
      }
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRoleSpecificCards = () => {
    const role = user?.role;

    const cardsByRole: Record<string, any[]> = {
      admin: [
        {
          title: 'Total Users',
          value: stats.totalUsers || 0,
          icon: '👥',
          href: '/users',
          color: 'bg-indigo-500',
        },
        {
          title: 'All Papers',
          value: stats.myPapers,
          icon: '📄',
          href: '/exam-papers',
          color: 'bg-blue-500',
        },
        {
          title: 'Question Bank',
          value: stats.myQuestions,
          icon: '📝',
          href: '/question-bank',
          color: 'bg-green-500',
        },
        {
          title: 'Notifications',
          value: stats.notifications,
          icon: '📬',
          href: '/notifications/inbox',
          color: 'bg-purple-500',
        },
      ],
      exam_master: [
        {
          title: 'Print Queue',
          value: stats.printQueue || 0,
          icon: '🖨️',
          href: '/print-queue',
          color: 'bg-cyan-500',
        },
        {
          title: 'Approved Papers',
          value: stats.myPapers,
          icon: '✅',
          href: '/exam-papers',
          color: 'bg-green-500',
        },
        {
          title: 'Published Papers',
          value: stats.collegePapers || 0,
          icon: '📊',
          href: '/reports',
          color: 'bg-blue-500',
        },
        {
          title: 'Notifications',
          value: stats.notifications,
          icon: '📬',
          href: '/notifications/inbox',
          color: 'bg-purple-500',
        },
      ],
      dean: [
        {
          title: 'College Papers',
          value: stats.collegePapers || 0,
          icon: '📑',
          href: '/exam-papers',
          color: 'bg-blue-500',
        },
        {
          title: 'Pending Approvals',
          value: stats.pendingApprovals || 0,
          icon: '⏳',
          href: '/approvals',
          color: 'bg-orange-500',
        },
        {
          title: 'Active Courses',
          value: stats.activeCourses || 0,
          icon: '📚',
          href: '/courses',
          color: 'bg-green-500',
        },
        {
          title: 'Notifications',
          value: stats.notifications,
          icon: '📬',
          href: '/notifications/inbox',
          color: 'bg-purple-500',
        },
      ],
      hod: [
        {
          title: 'Pending Approvals',
          value: stats.pendingApprovals || 0,
          icon: '✅',
          href: '/approvals',
          color: 'bg-orange-500',
        },
        {
          title: 'Department Papers',
          value: stats.myPapers,
          icon: '📄',
          href: '/exam-papers',
          color: 'bg-blue-500',
        },
        {
          title: 'Department Courses',
          value: stats.departmentCourses || 0,
          icon: '📚',
          href: '/courses',
          color: 'bg-green-500',
        },
        {
          title: 'Question Bank',
          value: stats.myQuestions,
          icon: '📝',
          href: '/question-bank',
          color: 'bg-teal-500',
        },
      ],
      lecturer: [
        {
          title: 'My Papers',
          value: stats.myPapers,
          icon: '📄',
          href: '/exam-papers',
          color: 'bg-blue-500',
        },
        {
          title: 'My Questions',
          value: stats.myQuestions,
          icon: '📝',
          href: '/question-bank',
          color: 'bg-green-500',
        },
        {
          title: 'Papers to Review',
          value: stats.papersToReview || 0,
          icon: '👁️',
          href: '/notifications/feedback',
          color: 'bg-orange-500',
        },
        {
          title: 'Notifications',
          value: stats.notifications,
          icon: '📬',
          href: '/notifications/inbox',
          color: 'bg-purple-500',
        },
      ],
    };

    return cardsByRole[role || 'lecturer'] || cardsByRole.lecturer;
  };

  const getQuickActions = () => {
    const role = user?.role;

    const actionsByRole: Record<string, any[]> = {
      admin: [
        {
          title: 'Manage Users',
          description: 'Add or edit system users',
          icon: '👥',
          href: '/users',
          color: 'text-indigo-600 dark:text-indigo-400',
        },
        {
          title: 'Manage Colleges',
          description: 'Organize colleges and departments',
          icon: '🏛️',
          href: '/colleges',
          color: 'text-blue-600 dark:text-blue-400',
        },
        {
          title: 'View Reports',
          description: 'System-wide analytics',
          icon: '📊',
          href: '/reports',
          color: 'text-green-600 dark:text-green-400',
        },
        {
          title: 'Audit Logs',
          description: 'View system activity',
          icon: '📋',
          href: '/audit',
          color: 'text-purple-600 dark:text-purple-400',
        },
      ],
      exam_master: [
        {
          title: 'Print Queue',
          description: 'Manage papers ready for printing',
          icon: '🖨️',
          href: '/print-queue',
          color: 'text-cyan-600 dark:text-cyan-400',
        },
        {
          title: 'View All Papers',
          description: 'Browse approved exam papers',
          icon: '📄',
          href: '/exam-papers',
          color: 'text-blue-600 dark:text-blue-400',
        },
        {
          title: 'Print History',
          description: 'View printing records',
          icon: '📜',
          href: '/print-queue/history',
          color: 'text-gray-600 dark:text-gray-400',
        },
        {
          title: 'Reports',
          description: 'View exam statistics',
          icon: '📊',
          href: '/reports',
          color: 'text-green-600 dark:text-green-400',
        },
      ],
      dean: [
        {
          title: 'Review Papers',
          description: 'Approve submitted papers',
          icon: '✅',
          href: '/approvals',
          color: 'text-orange-600 dark:text-orange-400',
        },
        {
          title: 'View College Papers',
          description: 'All papers in your college',
          icon: '📑',
          href: '/exam-papers',
          color: 'text-blue-600 dark:text-blue-400',
        },
        {
          title: 'College Reports',
          description: 'Performance analytics',
          icon: '📊',
          href: '/reports',
          color: 'text-green-600 dark:text-green-400',
        },
        {
          title: 'View Courses',
          description: 'Manage college courses',
          icon: '📚',
          href: '/courses',
          color: 'text-teal-600 dark:text-teal-400',
        },
      ],
      hod: [
        {
          title: 'Review Papers',
          description: 'Approve submitted exam papers',
          icon: '✅',
          href: '/approvals',
          color: 'text-orange-600 dark:text-orange-400',
        },
        {
          title: 'Manage Courses',
          description: 'Edit department courses',
          icon: '📚',
          href: '/courses',
          color: 'text-blue-600 dark:text-blue-400',
        },
        {
          title: 'Grant Permissions',
          description: 'Manage lecturer permissions',
          icon: '🔐',
          href: '/permissions',
          color: 'text-purple-600 dark:text-purple-400',
        },
        {
          title: 'Add Questions',
          description: 'Build question bank',
          icon: '📝',
          href: '/question-bank/create',
          color: 'text-green-600 dark:text-green-400',
        },
      ],
      lecturer: [
        {
          title: 'Create New Paper',
          description: 'Start creating a new exam paper',
          icon: '➕',
          href: '/exam-papers/create',
          color: 'text-blue-600 dark:text-blue-400',
        },
        {
          title: 'Add Questions',
          description: 'Add questions to question bank',
          icon: '📝',
          href: '/question-bank/create',
          color: 'text-green-600 dark:text-green-400',
        },
        {
          title: 'View Feedback',
          description: 'Check returned papers',
          icon: '💬',
          href: '/notifications/feedback',
          color: 'text-orange-600 dark:text-orange-400',
        },
        {
          title: 'View Inbox',
          description: 'Check pending tasks',
          icon: '📥',
          href: '/notifications/inbox',
          color: 'text-purple-600 dark:text-purple-400',
        },
      ],
    };

    return actionsByRole[role || 'lecturer'] || actionsByRole.lecturer;
  };

  const getRoleWelcomeMessage = () => {
    const messages: Record<string, string> = {
      admin: "You have full system access. Monitor users, papers, and system health.",
      exam_master: "Manage the print queue and ensure exams are ready for distribution.",
      dean: "Oversee college operations and approve papers from your departments.",
      hod: "Manage your department's courses, approve papers, and grant permissions.",
      lecturer: "Create exam papers and add questions to the question bank.",
    };

    return messages[user?.role || 'lecturer'] || messages.lecturer;
  };

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 lg:pl-64">
      {/* Welcome Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-white shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="mb-2 text-3xl font-bold">
              Welcome back, {user?.name}! 👋
            </h1>
            <p className="mb-3 text-blue-100">
              {new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
            <p className="text-sm text-blue-200">
              {getRoleWelcomeMessage()}
            </p>
          </div>
          <div className="hidden md:block">
            <div className="rounded-full bg-white/20 px-4 py-2 text-sm font-medium backdrop-blur-sm">
              {user?.role.replace('_', ' ').toUpperCase()}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {getRoleSpecificCards().map((card) => (
          <Link
            key={card.title}
            href={card.href}
            className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white p-6 shadow-lg transition-all hover:scale-105 hover:shadow-xl dark:border-gray-700 dark:bg-gray-800"
          >
            <div className="absolute right-0 top-0 h-24 w-24 translate-x-8 -translate-y-8 transform rounded-full bg-gradient-to-br from-white/10 to-transparent" />
            <div className="relative">
              <div className="mb-4 flex items-center justify-between">
                <div
                  className={`${card.color} flex h-12 w-12 items-center justify-center rounded-lg text-2xl shadow-lg transition-transform group-hover:scale-110`}
                >
                  {card.icon}
                </div>
                <span className="text-3xl font-bold text-gray-900 dark:text-white">
                  {card.value}
                </span>
              </div>
              <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {card.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {getQuickActions().map((action) => (
            <Link
              key={action.title}
              href={action.href}
              className="group rounded-xl border border-gray-200 bg-white p-6 shadow-md transition-all hover:border-blue-500 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800 dark:hover:border-blue-500"
            >
              <div className="mb-3 text-4xl transition-transform group-hover:scale-110">
                {action.icon}
              </div>
              <h3 className={`mb-2 text-lg font-semibold ${action.color}`}>
                {action.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {action.description}
              </p>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Recent Activity
          </h2>
          <Link
            href="/notifications/history"
            className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            View All →
          </Link>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800">
          {recentActivity.length > 0 ? (
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {recentActivity.slice(0, 5).map((activity) => (
                <div
                  key={activity.id}
                  className="p-4 transition-colors hover:bg-gray-50 dark:hover:bg-gray-700/50"
                >
                  <div className="flex items-start space-x-3">
                    <span className="text-2xl">{activity.icon}</span>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {activity.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {activity.description}
                      </p>
                      <p className="mt-1 text-xs text-gray-500 dark:text-gray-500">
                        {new Date(activity.timestamp).toLocaleString()}
                      </p>
                    </div>
                    {activity.link && (
                      <Link
                        href={activity.link}
                        className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400"
                      >
                        View →
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center">
              <div className="mb-3 text-5xl">📭</div>
              <p className="text-gray-600 dark:text-gray-400">
                No recent activity to display
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}