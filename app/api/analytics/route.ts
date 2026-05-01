import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { verifySessionToken } from '@/lib/auth'
import { getAnalytics } from '@/lib/analytics'

export async function GET() {
  const token = cookies().get('admin_session')?.value
  const secret = process.env.SESSION_SECRET
  if (!token || !secret || !verifySessionToken(token, secret)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const data = await getAnalytics()
  return NextResponse.json(data ?? { total: 0, today: 0, yesterday: 0, pages: [] })
}
