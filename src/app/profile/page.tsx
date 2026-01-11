/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/profile/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface UserProfile {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  phone: string | null;
  department_name: string | null;
  college_name: string | null;
  is_active: boolean;
  last_login: string | null;
  created_at: string;
}

interface ProfileStats {
  papers_created: number;
  questions_created: number;
  papers_approved: number;
  pending_approvals: number;
  permissions_granted: number;
  total_contributions: number;
}

export default function ProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [stats, setStats] = useState<ProfileStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [activeTab, setActiveTab] = useState('profile');
  
  // Form state
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    phone: '',
  });

  const [passwordData, setPasswordData] = useState({
    current_password: '',
    new_password: '',
    confirm_password: ''
  });

  useEffect(() => {
    fetchProfile();
    fetchStats();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await fetch('/api/auth/me');
      
      // Log response details for debugging
      console.log('Response status:', res.status);
      console.log('Response headers:', res.headers);
      
      if (!res.ok) {
        if (res.status === 401) {
          router.push('/auth/login');
          return;
        }
        // Try to get error message
        const text = await res.text();
        console.error('Response text:', text);
        throw new Error('Failed to fetch profile');
      }
      
      const data = await res.json();
      console.log('Profile data:', data);
      
      if (!data.success || !data.user) {
        throw new Error('Invalid response format');
      }
      
      setProfile(data.user);
      setFormData({
        first_name: data.user.first_name,
        last_name: data.user.last_name,
        phone: data.user.phone || '',
      });
    } catch (err: any) {
      console.error('Fetch profile error:', err);
      setError('Failed to load profile: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/stats/profile');
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } catch (err) {
      console.error('Failed to fetch stats:', err);
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setSaving(true);

    try {
      const res = await fetch('/api/auth/me', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      console.log('Update response status:', res.status);
      
      // Get response text first
      const text = await res.text();
      console.log('Update response text:', text);
      
      // Try to parse as JSON
      let data;
      try {
        data = JSON.parse(text);
      } catch (parseError) {
        console.error('JSON parse error:', parseError);
        throw new Error('Invalid response from server. Check console for details.');
      }

      if (!res.ok) {
        throw new Error(data.error || 'Failed to update profile');
      }

      if (!data.success) {
        throw new Error(data.error || 'Update failed');
      }

      setSuccess('Profile updated successfully');
      setEditing(false);
      await fetchProfile();
      
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      console.error('Update profile error:', err);
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (passwordData.new_password !== passwordData.confirm_password) {
      setError('New passwords do not match');
      return;
    }

    if (passwordData.new_password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    setSaving(true);

    try {
      const res = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          current_password: passwordData.current_password,
          new_password: passwordData.new_password
        })
      });

      const text = await res.text();
      console.log('Change password response:', text);
      
      let data;
      try {
        data = JSON.parse(text);
      } catch (parseError) {
        console.error('JSON parse error:', parseError);
        throw new Error('Invalid response from server');
      }

      if (!res.ok) {
        throw new Error(data.error || 'Failed to change password');
      }

      setSuccess('Password changed successfully');
      setChangingPassword(false);
      setPasswordData({
        current_password: '',
        new_password: '',
        confirm_password: ''
      });
      
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      console.error('Change password error:', err);
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const getRoleBadgeColor = (role: string) => {
    const colors: Record<string, string> = {
      admin: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
      exam_master: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200',
      dean: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      hod: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      lecturer: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
    };
    return colors[role] || colors.lecturer;
  };

  const getStatsCards = () => {
    if (!stats) return [];

    const cards = [
      {
        title: 'Papers Created',
        value: stats.papers_created,
        icon: '📄',
        color: 'bg-blue-500',
      },
      {
        title: 'Questions Created',
        value: stats.questions_created,
        icon: '📝',
        color: 'bg-green-500',
      },
    ];

    if (profile?.role === 'hod' || profile?.role === 'dean') {
      cards.push({
        title: 'Papers Approved',
        value: stats.papers_approved,
        icon: '✅',
        color: 'bg-purple-500',
      });
    }

    if (profile?.role === 'hod') {
      cards.push({
        title: 'Permissions Granted',
        value: stats.permissions_granted,
        icon: '🔐',
        color: 'bg-orange-500',
      });
    }

    return cards;
  };

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center lg:pl-64">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex h-96 items-center justify-center lg:pl-64">
        <div className="text-center">
          <div className="mb-3 text-5xl">⚠️</div>
          <p className="text-gray-600 dark:text-gray-400">Failed to load profile</p>
          {error && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 lg:pl-64">
      {/* Page Header */}
      <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-white shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="mb-2 text-3xl font-bold">
              My Profile 👤
            </h1>
            <p className="text-blue-100">
              Manage your account settings and preferences
            </p>
          </div>
          <Link
            href="/"
            className="rounded-lg bg-white/20 px-4 py-2 text-sm font-medium backdrop-blur-sm transition-colors hover:bg-white/30"
          >
            ← Back to Dashboard
          </Link>
        </div>
      </div>

      {/* Alerts */}
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-900/20">
          <div className="flex items-center">
            <span className="mr-2 text-xl">⚠️</span>
            <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
          </div>
        </div>
      )}

      {success && (
        <div className="rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-900/20">
          <div className="flex items-center">
            <span className="mr-2 text-xl">✅</span>
            <p className="text-sm text-green-800 dark:text-green-200">{success}</p>
          </div>
        </div>
      )}

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {getStatsCards().map((card) => (
            <div
              key={card.title}
              className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white p-6 shadow-lg dark:border-gray-700 dark:bg-gray-800"
            >
              <div className="absolute right-0 top-0 h-24 w-24 translate-x-8 -translate-y-8 transform rounded-full bg-gradient-to-br from-white/10 to-transparent" />
              <div className="relative">
                <div className="mb-4 flex items-center justify-between">
                  <div
                    className={`${card.color} flex h-12 w-12 items-center justify-center rounded-lg text-2xl shadow-lg`}
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
            </div>
          ))}
        </div>
      )}

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('profile')}
            className={`border-b-2 px-1 py-4 text-sm font-medium transition-colors ${
              activeTab === 'profile'
                ? 'border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            📋 Profile Information
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className={`border-b-2 px-1 py-4 text-sm font-medium transition-colors ${
              activeTab === 'security'
                ? 'border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            🔒 Security
          </button>
          <button
            onClick={() => setActiveTab('activity')}
            className={`border-b-2 px-1 py-4 text-sm font-medium transition-colors ${
              activeTab === 'activity'
                ? 'border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            📊 Activity
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      <div className="space-y-6">
        {/* Profile Information Tab */}
        {activeTab === 'profile' && (
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-md dark:border-gray-700 dark:bg-gray-800">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Profile Information
              </h2>
              {!editing && (
                <button
                  onClick={() => setEditing(true)}
                  className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                >
                  ✏️ Edit Profile
                </button>
              )}
            </div>

            {editing ? (
              <form onSubmit={handleUpdateProfile} className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      First Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.first_name}
                      onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.last_name}
                      onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+256 700 000 000"
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    disabled={saving}
                    className="rounded-lg bg-blue-600 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
                  >
                    {saving ? '💾 Saving...' : '💾 Save Changes'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setEditing(false);
                      setFormData({
                        first_name: profile.first_name,
                        last_name: profile.last_name,
                        phone: profile.phone || '',
                      });
                      setError('');
                    }}
                    className="rounded-lg border border-gray-300 px-6 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-500 dark:text-gray-400">
                      Full Name
                    </label>
                    <p className="text-lg font-medium text-gray-900 dark:text-white">
                      {profile.first_name} {profile.last_name}
                    </p>
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-500 dark:text-gray-400">
                      Email Address
                    </label>
                    <p className="text-lg font-medium text-gray-900 dark:text-white">
                      {profile.email}
                    </p>
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-500 dark:text-gray-400">
                      Role
                    </label>
                    <span className={`inline-block rounded-full px-3 py-1 text-sm font-medium ${getRoleBadgeColor(profile.role)}`}>
                      {profile.role.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-500 dark:text-gray-400">
                      Phone Number
                    </label>
                    <p className="text-lg font-medium text-gray-900 dark:text-white">
                      {profile.phone || 'Not provided'}
                    </p>
                  </div>
                  {profile.department_name && (
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-500 dark:text-gray-400">
                        Department
                      </label>
                      <p className="text-lg font-medium text-gray-900 dark:text-white">
                        {profile.department_name}
                      </p>
                    </div>
                  )}
                  {profile.college_name && (
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-500 dark:text-gray-400">
                        College
                      </label>
                      <p className="text-lg font-medium text-gray-900 dark:text-white">
                        {profile.college_name}
                      </p>
                    </div>
                  )}
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-500 dark:text-gray-400">
                      Account Status
                    </label>
                    <span className={`inline-block rounded-full px-3 py-1 text-sm font-medium ${
                      profile.is_active
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    }`}>
                      {profile.is_active ? '✓ Active' : '✗ Inactive'}
                    </span>
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-500 dark:text-gray-400">
                      Member Since
                    </label>
                    <p className="text-lg font-medium text-gray-900 dark:text-white">
                      {new Date(profile.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>

                {profile.last_login && (
                  <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900/50">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      <strong>Last Login:</strong> {new Date(profile.last_login).toLocaleString()}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Security Tab */}
        {activeTab === 'security' && (
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-md dark:border-gray-700 dark:bg-gray-800">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Security Settings
              </h2>
            </div>

            {!changingPassword ? (
              <div className="space-y-4">
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-900/50">
                  <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                    Password
                  </h3>
                  <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                    Manage your password to keep your account secure
                  </p>
                  <button
                    onClick={() => setChangingPassword(true)}
                    className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                  >
                    🔑 Change Password
                  </button>
                </div>

                <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4 dark:border-yellow-800 dark:bg-yellow-900/20">
                  <div className="flex items-start">
                    <span className="mr-2 text-xl">💡</span>
                    <div>
                      <h4 className="font-medium text-yellow-800 dark:text-yellow-200">
                        Password Requirements
                      </h4>
                      <ul className="mt-2 space-y-1 text-sm text-yellow-700 dark:text-yellow-300">
                        <li>• Minimum 8 characters</li>
                        <li>• Mix of uppercase and lowercase letters recommended</li>
                        <li>• Include numbers and special characters for better security</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleChangePassword} className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Current Password *
                  </label>
                  <input
                    type="password"
                    required
                    value={passwordData.current_password}
                    onChange={(e) => setPasswordData({ ...passwordData, current_password: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    New Password *
                  </label>
                  <input
                    type="password"
                    required
                    minLength={8}
                    value={passwordData.new_password}
                    onChange={(e) => setPasswordData({ ...passwordData, new_password: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Confirm New Password *
                  </label>
                  <input
                    type="password"
                    required
                    minLength={8}
                    value={passwordData.confirm_password}
                    onChange={(e) => setPasswordData({ ...passwordData, confirm_password: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    disabled={saving}
                    className="rounded-lg bg-blue-600 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
                  >
                    {saving ? '🔄 Changing...' : '🔑 Change Password'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setChangingPassword(false);
                      setPasswordData({
                        current_password: '',
                        new_password: '',
                        confirm_password: ''
                      });
                      setError('');
                    }}
                    className="rounded-lg border border-gray-300 px-6 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Activity Tab */}
        {activeTab === 'activity' && (
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-md dark:border-gray-700 dark:bg-gray-800">
            <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
              Account Activity
            </h2>
            
            <div className="space-y-4">
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900/50">
                <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">
                  Recent Activity
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  View your recent actions and activities in the system
                </p>
                <Link
                  href="/audit"
                  className="mt-3 inline-block text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400"
                >
                  View Full Activity Log →
                </Link>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Papers Created
                    </span>
                    <span className="text-2xl">📄</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stats?.papers_created || 0}
                  </p>
                </div>

                <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Questions Added
                    </span>
                    <span className="text-2xl">📝</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stats?.questions_created || 0}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}