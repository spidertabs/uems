// src/app/api/auth/logout/route.ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { query } from '@/lib/db';

export async function POST() {
  try {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get('session')?.value;

    console.log('🚪 Logout request, session:', sessionId);

    // Delete session from database if it exists
    if (sessionId) {
      await query('DELETE FROM sessions WHERE session_id = ?', [sessionId]);
      console.log('✅ Session deleted from database');
    }

    // Clear the session cookie
    cookieStore.delete('session');
    console.log('🍪 Session cookie cleared');

    return NextResponse.json({
      success: true,
      message: 'Logged out successfully',
    });
  } catch (error) {
    console.error('❌ Logout error:', error);
    
    // Even if there's an error, clear the cookie
    const cookieStore = await cookies();
    cookieStore.delete('session');
    
    return NextResponse.json(
      { success: true, message: 'Logged out' },
      { status: 200 }
    );
  }
}