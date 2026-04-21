/** @type {import('next').NextConfig} */

const securityHeaders = [
  // Prevent MIME-type sniffing
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  // Block this site from being embedded in iframes elsewhere (clickjacking)
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  // Enforce HTTPS for 2 years, include subdomains
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  // Control referrer information sent to other sites
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  // Disable browser features this site doesn't need
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
  // Basic XSS protection header (defence-in-depth alongside React's escaping)
  { key: 'X-XSS-Protection', value: '1; mode=block' },
  // Content Security Policy — restricts where scripts/styles/fonts can load from
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline'",   // Next.js needs unsafe-inline for hydration
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: https:",
      "connect-src 'self'",
      "frame-ancestors 'none'",              // No iframes embedding this site
    ].join('; '),
  },
]

const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',   // Apply to all routes
        headers: securityHeaders,
      },
    ]
  },
  // No wildcard image remotePatterns — this site doesn't use next/image for remote URLs
}

module.exports = nextConfig
