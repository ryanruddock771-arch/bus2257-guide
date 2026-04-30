export const dynamic = 'force-dynamic'

import { notFound } from 'next/navigation'
import Link from 'next/link'
import { assessments, getAssessment } from '@/lib/assessments'
import { getContent } from '@/lib/content'

export async function generateStaticParams() {
  return assessments.map((a) => ({ assessment: a.slug }))
}

export async function generateMetadata({ params }: { params: { assessment: string } }) {
  const a = getAssessment(params.assessment)
  if (!a) return {}
  return { title: `${a.name} | BUS 2257E Guide` }
}

export default async function AssessmentPage({
  params,
}: {
  params: { assessment: string }
}) {
  const a = getAssessment(params.assessment)
  if (!a) notFound()

  const content = await getContent()
  const advice = content[a.contentKey]
  const cheatSheet = a.cheatSheetKey ? content[a.cheatSheetKey] : null

  return (
    <div>
      {/* Header */}
      <div
        className="py-16 px-6 text-white"
        style={{ background: `linear-gradient(135deg, ${a.color} 0%, ${a.color}cc 100%)` }}
      >
        <div className="max-w-3xl mx-auto">
          <Link
            href="/grading"
            className="inline-flex items-center gap-1 text-white/70 hover:text-white text-sm mb-6 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Grading
          </Link>

          <div className="flex items-start gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full">
                  {a.weight}% of Final Grade
                </span>
                {a.hasCheatSheet && (
                  <span className="bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    Cheat Sheet Allowed
                  </span>
                )}
              </div>
              <h1 className="font-serif text-3xl md:text-4xl font-bold mb-2">{a.name}</h1>
              <p className="text-white/80 text-base">{a.timing}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-12 space-y-8">
        {/* Main Advice */}
        <div className="card p-6 md:p-8">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-1 h-6 rounded-full" style={{ backgroundColor: a.color }} />
            <h2 className="font-serif text-xl font-bold text-gray-900">
              My Advice
            </h2>
          </div>
          <p
            className="content-display text-gray-700 leading-relaxed"
            style={{ fontSize: `${advice.fontSize}px` }}
          >
            {advice.text}
          </p>
        </div>

        {/* Cheat Sheet Section */}
        {cheatSheet && (
          <div
            className="card p-6 md:p-8"
            style={{ borderLeft: `4px solid ${a.color}` }}
          >
            <div className="flex items-center gap-2 mb-5">
              <div className="w-1 h-6 rounded-full" style={{ backgroundColor: a.color }} />
              <h2 className="font-serif text-xl font-bold text-gray-900">
                Cheat Sheet Advice
              </h2>
            </div>
            <p className="text-sm text-gray-500 mb-4 italic">
              A cheat sheet is allowed for this exam. Here&apos;s what I&apos;d put on mine:
            </p>
            <p
              className="content-display text-gray-700 leading-relaxed"
              style={{ fontSize: `${cheatSheet.fontSize}px` }}
            >
              {cheatSheet.text}
            </p>
          </div>
        )}

        {/* Quick stats bar */}
        {a.hasCheatSheet ? (
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-gray-50 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold" style={{ color: a.color }}>
                {a.weight}%
              </div>
              <div className="text-xs text-gray-500 mt-1">Grade Weight</div>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 text-center">
              <div className="text-sm font-bold text-gray-700">{a.timing.split(' — ')[0]}</div>
              <div className="text-xs text-gray-500 mt-1">When</div>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 text-center">
              <div className="text-sm font-bold text-gray-700">✓ Allowed</div>
              <div className="text-xs text-gray-500 mt-1">Cheat Sheet</div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto w-full">
            <div className="bg-gray-50 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold" style={{ color: a.color }}>
                {a.weight}%
              </div>
              <div className="text-xs text-gray-500 mt-1">Grade Weight</div>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 text-center">
              <div className="text-sm font-bold text-gray-700">{a.timing.split(' — ')[0]}</div>
              <div className="text-xs text-gray-500 mt-1">When</div>
            </div>
          </div>
        )}

        {/* Back link */}
        <div className="text-center pt-2">
          <Link
            href="/grading"
            className="inline-flex items-center gap-2 text-sm font-semibold"
            style={{ color: a.color }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            View all assessments
          </Link>
        </div>
      </div>
    </div>
  )
}
