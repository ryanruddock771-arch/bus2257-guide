import { NextResponse } from 'next/server'
import { getContent, saveContent } from '@/lib/content'
import { cookies } from 'next/headers'

function isAuthed(): boolean {
  const token = cookies().get('admin_token')?.value
  return token === process.env.ADMIN_PASSWORD
}

// GET /api/content — return current site content
export async function GET() {
  const content = await getContent()
  return NextResponse.json(content)
}

// POST /api/content — save updated content (admin only)
export async function POST(req: Request) {
  if (!isAuthed()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const ok = await saveContent(body)
    if (!ok) {
      return NextResponse.json({ error: 'Save failed' }, { status: 500 })
    }
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
