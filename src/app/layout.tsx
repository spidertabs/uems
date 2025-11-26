/* eslint-disable react-hooks/exhaustive-deps */
// src/app/layout.tsx
'use client';

import { useEffect, useState } from 'react';
import { Geist, Geist_Mono } from 'next/font/google';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import headerNavLinks from '@/data/headerNavLinks';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isAuthRoute = pathname.startsWith('/auth');

  useEffect(() => {
    if (!isAuthRoute) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, [pathname]);

  const fetchUser = async () => {
    try {
      const response = await fetch('/api/auth/me');
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      }
    } catch (error) {
      console.error('Failed to fetch user:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      setUser(null);
      router.push('/auth/login');
      router.refresh();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const filteredNavLinks = user
    ? headerNavLinks.filter((link) => !link.roles || link.roles.includes(user.role))
    : [];

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-gray-50 dark:bg-gray-900`}
      >
        {isAuthRoute ? (
          // Auth pages - render immediately
          children
        ) : loading ? (
          // Loading state for protected routes
          <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
            <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600"></div>
          </div>
        ) : (
          // Dashboard layout
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Top Navigation Bar */}
            <nav className="fixed top-0 z-30 w-full border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
              <div className="px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 justify-between">
                  <div className="flex items-center">
                    {/* Mobile menu button */}
                    <button
                      onClick={() => setSidebarOpen(!sidebarOpen)}
                      className="rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 lg:hidden dark:hover:bg-gray-700"
                    >
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 6h16M4 12h16M4 18h16"
                        />
                      </svg>
                    </button>

                    {/* Logo */}
                    <div className="ml-4 flex items-center lg:ml-0">
                      <Image
                        src="/static/images/kiu-logo.png"
                        alt="KIU"
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                      <span className="ml-3 hidden text-xl font-bold text-gray-900 sm:block dark:text-white">
                        UEMS
                      </span>
                    </div>
                  </div>

                  {/* User Menu */}
                  <div className="flex items-center space-x-4">
                    <div className="hidden items-center space-x-2 text-sm md:flex">
                      <span className="text-gray-600 dark:text-gray-400">{user?.name}</span>
                      <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                        {user?.role.toUpperCase()}
                      </span>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </nav>

            <div className="flex pt-16">
              {/* Sidebar */}
              <aside
                className={`fixed top-16 left-0 z-20 h-[calc(100vh-4rem)] w-64 transform transition-transform duration-200 ease-in-out lg:sticky ${
                  sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
                } overflow-y-auto border-r border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800`}
              >
                <nav className="space-y-2 p-4">
                  {filteredNavLinks.map((link) => {
                    const isActive =
                      pathname === link.href || pathname?.startsWith(link.href + '/');
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setSidebarOpen(false)}
                        className={`flex items-center rounded-lg px-4 py-3 transition-colors ${
                          isActive
                            ? 'bg-blue-50 font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                            : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                        }`}
                      >
                        <span className="mr-3 text-xl">{link.emoji}</span>
                        <span>{link.title.replace(/^[^\s]+\s/, '')}</span>
                      </Link>
                    );
                  })}
                </nav>
              </aside>

              {/* Overlay for mobile */}
              {sidebarOpen && (
                <div
                  className="bg-opacity-50 fixed inset-0 z-10 bg-gray-900 lg:hidden"
                  onClick={() => setSidebarOpen(false)}
                />
              )}

              {/* Main Content */}
              <main className="flex-1 overflow-x-hidden p-6 lg:p-8">{children}</main>
            </div>
          </div>
        )}
      </body>
    </html>
  );
}
