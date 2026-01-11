/* eslint-disable react-hooks/exhaustive-deps */
// src/app/layout.tsx
'use client';

import { useEffect, useState } from 'react';
import { Inter } from 'next/font/google';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import headerNavLinks from '@/data/headerNavLinks';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
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
  const [darkMode, setDarkMode] = useState(false);

  const isAuthRoute = pathname.startsWith('/auth');

  // Initialize theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

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

  const toggleTheme = () => {
    if (darkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setDarkMode(true);
    }
  };

  const filteredNavLinks = user
    ? headerNavLinks.filter((link) => !link.roles || link.roles.includes(user.role))
    : [];

  return (
    <html lang="en">
      <body
        className={`${inter.variable} min-h-screen bg-gray-50 dark:bg-gray-900`}
      >
        {isAuthRoute ? (
          children
        ) : loading ? (
          <div className="flex min-h-screen items-center justify-center">
            <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600" />
          </div>
        ) : (
          <div className="min-h-screen">
            {/* Top Navigation */}
            <nav className="fixed top-0 z-30 w-full border-b bg-white dark:bg-gray-800">
              <div className="flex h-16 items-center justify-between px-4">
                <div className="flex items-center">
                  <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="lg:hidden rounded-md p-2"
                  >
                    ☰
                  </button>

                  <div className="ml-4 flex items-center">
                    <Image
                      src="/static/images/kiu-logo.png"
                      alt="KIU"
                      width={40}
                      height={40}
                    />
                    <span className="ml-3 text-xl font-bold">UEMS</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button onClick={toggleTheme}>
                    {darkMode ? '☀️' : '🌙'}
                  </button>
                  <span>{user?.name}</span>
                  <button
                    onClick={handleLogout}
                    className="rounded bg-red-600 px-4 py-2 text-white"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </nav>

            <div className="flex pt-16">
              <aside
                className={`fixed top-16 h-full w-64 bg-white dark:bg-gray-800 transition-transform ${
                  sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
                }`}
              >
                <nav className="p-4 space-y-2">
                  {filteredNavLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setSidebarOpen(false)}
                      className="block rounded px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      {link.emoji} {link.title}
                    </Link>
                  ))}
                </nav>
              </aside>

              {sidebarOpen && (
                <div
                  className="fixed inset-0 bg-black/50 lg:hidden"
                  onClick={() => setSidebarOpen(false)}
                />
              )}

              <main className="flex-1 p-6">{children}</main>
            </div>
          </div>
        )}
      </body>
    </html>
  );
}
