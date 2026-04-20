import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET() {
  const token = cookies().get('admin_token')?.value
  const isAuthed = token === process.env.ADMIN_PASSWORD && !!token
  return NextResponse.json({ ok: isAuthed })
}
