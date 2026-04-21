import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { verifySessionToken } from '@/lib/auth'

export async function GET() {
  const token = cookies().get('admin_session')?.value
  const secret = process.env.SESSION_SECRET

  if (!token || !secret) {
    return NextResponse.json({ ok: false })
  }

  const isAuthed = verifySessionToken(token, secret)
  return NextResponse.json({ ok: isAuthed })
}
