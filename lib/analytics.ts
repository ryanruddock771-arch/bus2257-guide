// Simple Redis-based page view counter
// Tracks total views + daily views per page — silently fails if Redis is unavailable

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

function today() {
  return new Date().toISOString().split('T')[0] // YYYY-MM-DD
}

export async function recordPageView(page: string) {
  const redis = await getRedis()
  if (!redis) return

  try {
    await Promise.all([
      redis.incr('pv:total'),
      redis.incr(`pv:page:${page}`),
      redis.incr(`pv:day:${today()}`),
    ])
    // Keep daily keys for 60 days
    await redis.expire(`pv:day:${today()}`, 60 * 60 * 24 * 60)
  } catch {
    // Never let analytics break the page
  }
}

export interface AnalyticsData {
  total: number
  today: number
  yesterday: number
  pages: { name: string; views: number }[]
}

export async function getAnalytics(): Promise<AnalyticsData | null> {
  const redis = await getRedis()
  if (!redis) return null

  try {
    const yest = new Date(Date.now() - 86_400_000).toISOString().split('T')[0]

    const pageKeys = [
      { key: 'pv:page:home', name: 'Home' },
      { key: 'pv:page:grading', name: 'Grading' },
      { key: 'pv:page:grading-detail', name: 'Assessment Pages' },
      { key: 'pv:page:resources', name: 'Resources' },
      { key: 'pv:page:connect', name: 'Connect' },
      { key: 'pv:page:about', name: 'About' },
    ]

    const [total, todayViews, yesterdayViews, ...pageCounts] = await Promise.all([
      redis.get<number>('pv:total'),
      redis.get<number>(`pv:day:${today()}`),
      redis.get<number>(`pv:day:${yest}`),
      ...pageKeys.map((p) => redis.get<number>(p.key)),
    ])

    return {
      total: total ?? 0,
      today: todayViews ?? 0,
      yesterday: yesterdayViews ?? 0,
      pages: pageKeys.map((p, i) => ({
        name: p.name,
        views: (pageCounts[i] as number) ?? 0,
      })),
    }
  } catch {
    return null
  }
}
