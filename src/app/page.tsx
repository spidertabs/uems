// src/app/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface DashboardStats {
  myPapers: number;
  pendingApprovals: number;
  questions: number;
  notifications: number;
}

interface User {
  role: string;
  name: string;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    myPapers: 0,
    pendingApprovals: 0,
    questions: 0,
    notifications: 0,
  });

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [userRes, statsRes] = await Promise.all([
        fetch('/api/auth/me'),
        fetch('/api/dashboard/stats'),
      ]);

      // 🚨 Redirect to login if not authenticated
      if (userRes.status === 401) {
        window.location.href = '/auth/login';
        return;
      }

      if (userRes.ok) {
        const userData = await userRes.json();
        setUser(userData.user);
      }

      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setStats(statsData);
      }
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRoleSpecificCards = () => {
    const role = user?.role;

    const allCards = [
      {
        title: 'My Exam Papers',
        value: stats.myPapers,
        icon: '📄',
        href: '/exam-papers',
        color: 'bg-blue-500',
        roles: ['lecturer', 'hod', 'exam_master', 'admin'],
      },
      {
        title: 'Pending Approvals',
        value: stats.pendingApprovals,
        icon: '✅',
        href: '/approvals',
        color: 'bg-orange-500',
        roles: ['hod', 'admin'],
      },
      {
        title: 'Question Bank',
        value: stats.questions,
        icon: '📝',
        href: '/question-bank',
        color: 'bg-green-500',
        roles: ['lecturer', 'hod', 'admin'],
      },
      {
        title: 'Notifications',
        value: stats.notifications,
        icon: '📬',
        href: '/notifications/inbox',
        color: 'bg-purple-500',
        roles: ['lecturer', 'hod', 'exam_master', 'admin'],
      },
    ];

    return allCards.filter((card) => card.roles.includes(role || ''));
  };

  const getQuickActions = () => {
    const role = user?.role;

    const allActions = [
      {
        title: 'Create New Paper',
        description: 'Start creating a new exam paper',
        icon: '➕',
        href: '/exam-papers/create',
        color: 'text-blue-600 dark:text-blue-400',
        roles: ['lecturer', 'admin'],
      },
      {
        title: 'Add Questions',
        description: 'Add questions to question bank',
        icon: '📝',
        href: '/question-bank/create',
        color: 'text-green-600 dark:text-green-400',
        roles: ['lecturer', 'hod', 'admin'],
      },
      {
        title: 'Review Papers',
        description: 'Review submitted exam papers',
        icon: '👁️',
        href: '/approvals',
        color: 'text-orange-600 dark:text-orange-400',
        roles: ['hod', 'admin'],
      },
      {
        title: 'View Inbox',
        description: 'Check pending tasks',
        icon: '📥',
        href: '/notifications/inbox',
        color: 'text-purple-600 dark:text-purple-400',
        roles: ['lecturer', 'hod', 'exam_master', 'admin'],
      },
    ];

    return allActions.filter((action) => action.roles.includes(role || ''));
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
      {/* Welcome */}
      <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-white shadow-xl">
        <h1 className="mb-2 text-3xl font-bold">
          Welcome back, {user?.name}! 👋
        </h1>

        <p className="text-blue-100">
          {new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {getRoleSpecificCards().map((card) => (
          <Link
            key={card.title}
            href={card.href}
            className="rounded-xl border border-gray-200 bg-white p-6 shadow-lg transition-shadow hover:shadow-xl dark:border-gray-700 dark:bg-gray-800"
          >
            <div className="mb-4 flex items-center justify-between">
              <div
                className={`${card.color} flex h-12 w-12 items-center justify-center rounded-lg text-2xl`}
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
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
          Quick Actions
        </h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {getQuickActions().map((action) => (
            <Link
              key={action.title}
              href={action.href}
              className="rounded-xl border border-gray-200 bg-white p-6 shadow-md transition-all hover:border-blue-500 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800 dark:hover:border-blue-500"
            >
              <div className="flex items-start space-x-4">
                <div className="text-4xl">{action.icon}</div>
                <div className="flex-1">
                  <h3 className={`mb-1 text-lg font-semibold ${action.color}`}>
                    {action.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {action.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
          Recent Activity
        </h2>
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-md dark:border-gray-700 dark:bg-gray-800">
          <p className="py-8 text-center text-gray-600 dark:text-gray-400">
            No recent activity to display
          </p>
        </div>
      </div>
    </div>
  );
}
