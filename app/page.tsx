export const dynamic = 'force-dynamic'

import Link from 'next/link'
import GradeDonut from '@/components/GradeDonut'
import Timeline from '@/components/Timeline'
import { getContent } from '@/lib/content'

const navCards = [
  {
    href: '/grading',
    title: 'Grading Breakdown',
    description: 'Understand the weight of each assessment and when they hit.',
    icon: '📊',
    bg: 'bg-western-purple-light',
    border: 'border-western-purple',
    text: 'text-western-purple',
  },
  {
    href: '/resources',
    title: 'Resources',
    description: 'Cheat sheet advice, study strategies, and textbook tips.',
    icon: '📚',
    bg: 'bg-ivey-green-light',
    border: 'border-ivey-green',
    text: 'text-ivey-green',
  },
  {
    href: '/connect',
    title: 'Connect',
    description: 'Still have questions? Reach out directly on LinkedIn.',
    icon: '🔗',
    bg: 'bg-western-purple-light',
    border: 'border-western-purple',
    text: 'text-western-purple',
  },
  {
    href: '/about',
    title: 'About Me',
    description: 'Who I am, why I took this course, and what I learned.',
    icon: '👋',
    bg: 'bg-ivey-green-light',
    border: 'border-ivey-green',
    text: 'text-ivey-green',
  },
]

export default async function HomePage() {
  const content = await getContent()
  const tips = content.homepage_survival_tips

  return (
    <div>
      {/* ── Hero ────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden py-20 px-6 text-white text-center"
        style={{ background: 'linear-gradient(135deg, #4F2683 0%, #3d1f7a 35%, #1a6b4a 65%, #154733 100%)' }}
      >
        {/* Decorative circles */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

        <div className="relative max-w-3xl mx-auto">
          {/* University labels */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className="bg-white/10 backdrop-blur-sm text-purple-100 text-xs font-semibold px-4 py-1.5 rounded-full border border-white/20">
              Western University
            </span>
            <span className="text-white/40">·</span>
            <span className="bg-white/10 backdrop-blur-sm text-green-100 text-xs font-semibold px-4 py-1.5 rounded-full border border-white/20">
              Ivey Business School
            </span>
          </div>

          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
            BUS 2257E
            <br />
            <span className="text-purple-200">The Honest Guide</span>
          </h1>

          <p className="text-purple-100 text-lg md:text-xl mb-8 leading-relaxed max-w-2xl mx-auto">
            An upper-year Western student&apos;s straight-talk advice on Financial &amp;
            Managerial Accounting — so you know exactly what you&apos;re walking into.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/grading"
              className="bg-white text-western-purple px-8 py-3 rounded-xl font-bold hover:bg-purple-50 transition-colors shadow-lg"
            >
              See the Grading Breakdown
            </Link>
            <Link
              href="/about"
              className="bg-white/10 border border-white/30 text-white px-8 py-3 rounded-xl font-semibold hover:bg-white/20 transition-colors backdrop-blur-sm"
            >
              About Me
            </Link>
          </div>
        </div>
      </section>

      {/* ── Grade Weight Snapshot ─────────────────────────────── */}
      <section className="py-14 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <span className="badge-purple">At a Glance</span>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-gray-900 mt-3">
              How You&apos;re Graded
            </h2>
            <p className="text-gray-500 mt-2 text-sm">
              Five components across the full academic year
            </p>
          </div>
          <div className="card p-6 max-w-sm mx-auto">
            <GradeDonut />
          </div>
        </div>
      </section>

      {/* ── Survival Tips ─────────────────────────────────────── */}
      <section className="py-14 px-6 bg-western-purple-light">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <span className="badge-purple">Upper Year Advice</span>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-gray-900 mt-3">
              Survival Tips
            </h2>
            <p className="text-gray-500 mt-2 text-sm">
              Things I wish someone told me before I started
            </p>
          </div>

          <div className="card p-6 md:p-8">
            <p
              className="content-display text-gray-700 leading-relaxed"
              style={{ fontSize: `${tips.fontSize}px` }}
            >
              {tips.text}
            </p>
          </div>
        </div>
      </section>

      {/* ── Course Timeline ───────────────────────────────────── */}
      <section className="py-14 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <span className="badge-green">Academic Year</span>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-gray-900 mt-3">
              Course Timeline
            </h2>
            <p className="text-gray-500 mt-2 text-sm">
              Know exactly when everything hits so nothing sneaks up on you
            </p>
          </div>
          <div className="card p-6 md:p-10">
            <Timeline />
          </div>
        </div>
      </section>

      {/* ── Navigation Cards ──────────────────────────────────── */}
      <section className="py-14 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-gray-900">
              Explore the Guide
            </h2>
            <p className="text-gray-500 mt-2">
              Jump to any section that&apos;s most useful to you right now
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {navCards.map((card) => (
              <Link key={card.href} href={card.href} className="group">
                <div
                  className={`card p-6 border-l-4 ${card.border} ${card.bg} h-full`}
                >
                  <div className="text-3xl mb-3">{card.icon}</div>
                  <h3 className={`font-serif text-lg font-bold ${card.text} mb-1`}>
                    {card.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
