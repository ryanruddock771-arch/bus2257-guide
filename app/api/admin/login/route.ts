import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createSessionToken } from '@/lib/auth'

const MAX_ATTEMPTS = 5
const LOCKOUT_SECONDS = 15 * 60 // 15 minutes

async function getRedis() {
  const url = process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.UPSTASH_REDIS_REST_TOKEN
  if (!url || !token) return null
  try {
    const { Redis } = await import('@upstash/redis')
    return new Redis({ url, token })
  } catch {
    return null
  }
}

export async function POST(req: Request) {
  const adminPassword = process.env.ADMIN_PASSWORD
  const sessionSecret = process.env.SESSION_SECRET

  if (!adminPassword || !sessionSecret) {
    return NextResponse.json({ error: 'Server misconfigured' }, { status: 500 })
  }

  // ── Rate limiting ───────────────────────────────────────────
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
  const rateLimitKey = `login_attempts:${ip}`
  const redis = await getRedis()

  if (redis) {
    const attempts = await redis.get<number>(rateLimitKey)
    if (attempts && attempts >= MAX_ATTEMPTS) {
      return NextResponse.json(
        { error: 'Too many failed attempts. Try again in 15 minutes.' },
        { status: 429 }
      )
    }
  }

  // ── Validate body ───────────────────────────────────────────
  let password: string
  try {
    const body = await req.json()
    if (typeof body?.password !== 'string') throw new Error()
    password = body.password
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  // ── Password check ──────────────────────────────────────────
  if (password !== adminPassword) {
    // Increment failed attempt counter with TTL
    if (redis) {
      const current = (await redis.get<number>(rateLimitKey)) ?? 0
      await redis.set(rateLimitKey, current + 1, { ex: LOCKOUT_SECONDS })
    }
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  }

  // ── Success — clear counter, issue signed token ─────────────
  if (redis) {
    await redis.del(rateLimitKey)
  }

  const token = createSessionToken(sessionSecret)

  // Cookie stores a signed token — the actual password is never in the cookie
  cookies().set('admin_session', token, {
    httpOnly: true,                                       // JS cannot read it
    secure: process.env.NODE_ENV === 'production',        // HTTPS only in prod
    sameSite: 'strict',                                   // blocks cross-site requests (CSRF)
    maxAge: 60 * 60 * 24 * 7,                            // 7 days
    path: '/',
  })

  return NextResponse.json({ ok: true })
}
