// src/app/api/auth/me/route.ts
import { NextResponse } from 'next/server'
import { getUserFromSession } from '@/lib/auth'

export async function GET() {
  try {
    const user = await getUserFromSession()

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Not authenticated' },
        { status: 401 }
      )
    }

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: `${user.first_name} ${user.last_name}`,
        first_name: user.first_name,
        last_name: user.last_name,
        role: user.role,
        department_id: user.department_id,
        college_id: user.college_id,
      },
    })
  } catch (error) {
    console.error('Get user error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to get user' },
      { status: 500 }
    )
  }
}
