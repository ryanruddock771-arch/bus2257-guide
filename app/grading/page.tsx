import Link from 'next/link'
import GradeDonut from '@/components/GradeDonut'
import { assessments } from '@/lib/assessments'

export const metadata = {
  title: 'Grading Breakdown | BUS 2257E Guide',
}

export default function GradingPage() {
  const fallAssessments = assessments.filter((a) => a.semester === 'fall')
  const winterAssessments = assessments.filter((a) => a.semester === 'winter')
  // Participation is ongoing — pull it out separately
  const ongoing = assessments.find((a) => a.slug === 'participation')

  return (
    <div>
      {/* Header */}
      <div className="section-header">
        <div className="max-w-3xl mx-auto">
          <span className="inline-block bg-white/20 text-purple-100 text-xs font-semibold px-3 py-1 rounded-full mb-4">
            5 Components
          </span>
          <h1 className="font-serif text-3xl md:text-4xl font-bold mb-3">
            Grading & Assessment
          </h1>
          <p className="text-purple-200 text-lg max-w-xl mx-auto">
            Everything you need to know about how BUS 2257E is graded — weights,
            timing, and what to expect from each assessment.
          </p>
        </div>
      </div>

      {/* Grade Breakdown Card */}
      <section className="py-14 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="card p-6 md:p-10">
            <div className="text-center mb-8">
              <h2 className="font-serif text-xl font-bold text-gray-900">
                Grade Distribution
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                All five components add up to 100%
              </p>
            </div>
            <GradeDonut />
          </div>
        </div>
      </section>

      {/* Fall Semester */}
      <section className="py-10 px-6 bg-western-purple-light">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 bg-western-purple rounded-full" />
            <h2 className="font-serif text-xl font-bold text-gray-900">
              Fall Semester
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {fallAssessments
              .filter((a) => a.slug !== 'participation')
              .map((a) => (
                <AssessmentCard key={a.slug} assessment={a} />
              ))}
          </div>
        </div>
      </section>

      {/* Winter Semester */}
      <section className="py-10 px-6 bg-ivey-green-light">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 bg-ivey-green rounded-full" />
            <h2 className="font-serif text-xl font-bold text-gray-900">
              Winter Semester
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {winterAssessments.map((a) => (
              <AssessmentCard key={a.slug} assessment={a} />
            ))}
          </div>
        </div>
      </section>

      {/* Participation — ongoing */}
      {ongoing && (
        <section className="py-10 px-6 bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-8 bg-western-purple-mid rounded-full" />
              <h2 className="font-serif text-xl font-bold text-gray-900">
                Ongoing
              </h2>
            </div>
            <div className="max-w-md">
              <AssessmentCard assessment={ongoing} />
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

function AssessmentCard({ assessment: a }: { assessment: (typeof assessments)[0] }) {
  return (
    <Link href={`/grading/${a.slug}`} className="group block">
      <div
        className="card p-6 border-l-4 h-full"
        style={{ borderLeftColor: a.color, backgroundColor: a.bgColor }}
      >
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3
              className="font-serif text-lg font-bold"
              style={{ color: a.color }}
            >
              {a.name}
            </h3>
            <p className="text-gray-500 text-xs mt-0.5">{a.timing}</p>
          </div>
          <span
            className="text-2xl font-bold flex-shrink-0 ml-2"
            style={{ color: a.color }}
          >
            {a.weight}%
          </span>
        </div>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          {a.description}
        </p>
        <div className="flex items-center gap-1 text-xs font-semibold" style={{ color: a.color }}>
          Read my advice
          <svg
            className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  )
}
