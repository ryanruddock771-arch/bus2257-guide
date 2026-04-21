import { createHmac, timingSafeEqual } from 'crypto'

const EXPIRY_MS = 7 * 24 * 60 * 60 * 1000 // 7 days

/**
 * Creates a signed, expiring session token.
 * The token is base64url(payload).base64url(HMAC-SHA256 signature).
 * The actual admin password is NEVER stored in the token or the cookie.
 */
export function createSessionToken(secret: string): string {
  const payload = Buffer.from(
    JSON.stringify({ ok: true, exp: Date.now() + EXPIRY_MS })
  ).toString('base64url')

  const sig = createHmac('sha256', secret).update(payload).digest('base64url')
  return `${payload}.${sig}`
}

/**
 * Verifies a session token using a timing-safe comparison to prevent
 * timing attacks, then checks the expiry timestamp.
 */
export function verifySessionToken(token: string, secret: string): boolean {
  const parts = token.split('.')
  if (parts.length !== 2) return false
  const [payload, sig] = parts

  const expectedSig = createHmac('sha256', secret).update(payload).digest('base64url')

  const sigBuf = Buffer.from(sig, 'base64url')
  const expectedBuf = Buffer.from(expectedSig, 'base64url')

  // Lengths must match before timingSafeEqual (it throws on mismatch)
  if (sigBuf.length !== expectedBuf.length) return false
  if (!timingSafeEqual(sigBuf, expectedBuf)) return false

  try {
    const { ok, exp } = JSON.parse(Buffer.from(payload, 'base64url').toString())
    return ok === true && typeof exp === 'number' && exp > Date.now()
  } catch {
    return false
  }
}
