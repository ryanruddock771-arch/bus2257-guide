import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { getContent, saveContent, defaultContent } from '@/lib/content'
import { verifySessionToken } from '@/lib/auth'

const MAX_FIELD_LENGTH = 10_000  // 10k chars per content section
const MAX_BODY_BYTES = 500_000   // 500 KB total body limit

function isAuthed(): boolean {
  const token = cookies().get('admin_session')?.value
  const secret = process.env.SESSION_SECRET
  if (!token || !secret) return false
  return verifySessionToken(token, secret)
}

// GET /api/content — return current site content (public, read-only)
export async function GET() {
  const content = await getContent()
  return NextResponse.json(content)
}

// POST /api/content — save updated content (admin only)
export async function POST(req: Request) {
  if (!isAuthed()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // ── Body size guard ─────────────────────────────────────────
  const contentLength = req.headers.get('content-length')
  if (contentLength && parseInt(contentLength) > MAX_BODY_BYTES) {
    return NextResponse.json({ error: 'Request too large' }, { status: 413 })
  }

  // ── Parse body ──────────────────────────────────────────────
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  // ── Schema validation ────────────────────────────────────────
  // Ensure body has exactly the expected keys with valid ContentSection shapes
  if (typeof body !== 'object' || body === null || Array.isArray(body)) {
    return NextResponse.json({ error: 'Invalid content shape' }, { status: 400 })
  }

  const expectedKeys = Object.keys(defaultContent) as (keyof typeof defaultContent)[]
  const validated: Record<string, { text: string; fontSize: string }> = {}
  const validFontSizes = new Set(['14', '16', '18', '20', '24'])

  for (const key of expectedKeys) {
    const section = (body as Record<string, unknown>)[key]
    if (
      typeof section !== 'object' ||
      section === null ||
      typeof (section as Record<string, unknown>).text !== 'string' ||
      typeof (section as Record<string, unknown>).fontSize !== 'string'
    ) {
      return NextResponse.json(
        { error: `Invalid section: ${key}` },
        { status: 400 }
      )
    }

    const text = ((section as Record<string, unknown>).text as string).slice(
      0,
      MAX_FIELD_LENGTH
    )
    const fontSize = (section as Record<string, unknown>).fontSize as string

    if (!validFontSizes.has(fontSize)) {
      return NextResponse.json(
        { error: `Invalid fontSize in section: ${key}` },
        { status: 400 }
      )
    }

    validated[key] = { text, fontSize }
  }

  // ── Save ────────────────────────────────────────────────────
  const ok = await saveContent(validated as any)
  if (!ok) {
    return NextResponse.json({ error: 'Save failed' }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
