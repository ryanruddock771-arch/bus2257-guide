export const dynamic = 'force-dynamic'

import { getContent } from '@/lib/content'
import { recordPageView } from '@/lib/analytics'

export const metadata = {
  title: 'Resources | BUS 2257E Guide',
}

interface ResourceCardProps {
  title: string
  subtitle?: string
  text: string
  fontSize: string
  color: 'purple' | 'green'
  icon: string
}

function ResourceCard({ title, subtitle, text, fontSize, color, icon }: ResourceCardProps) {
  const isPurple = color === 'purple'
  return (
    <div
      className={`card p-6 md:p-8 border-l-4 ${
        isPurple ? 'border-western-purple' : 'border-ivey-green'
      }`}
    >
      <div className="flex items-start gap-3 mb-4">
        <span className="text-2xl">{icon}</span>
        <div>
          <h3
            className={`font-serif text-lg font-bold ${
              isPurple ? 'text-western-purple' : 'text-ivey-green'
            }`}
          >
            {title}
          </h3>
          {subtitle && <p className="text-gray-400 text-xs mt-0.5">{subtitle}</p>}
        </div>
      </div>
      <p
        className="content-display text-gray-700 leading-relaxed"
        style={{ fontSize: `${fontSize}px` }}
      >
        {text}
      </p>
    </div>
  )
}

export default async function ResourcesPage() {
  await recordPageView('resources')
  const content = await getContent()

  return (
    <div>
      {/* Header */}
      <div className="section-header-green">
        <div className="max-w-3xl mx-auto">
          <span className="inline-block bg-white/20 text-green-100 text-xs font-semibold px-3 py-1 rounded-full mb-4">
            Study Tools
          </span>
          <h1 className="font-serif text-3xl md:text-4xl font-bold mb-3">Resources</h1>
          <p className="text-green-100 text-lg max-w-xl mx-auto">
            Cheat sheet strategies, study tips, and an honest take on the textbook — everything
            to help you prepare smarter.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-12 space-y-10">
        {/* Cheat Sheets */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 bg-western-purple rounded-full" />
            <div>
              <h2 className="font-serif text-xl font-bold text-gray-900">Cheat Sheet Advice</h2>
              <p className="text-gray-500 text-sm">
                For the Midterm, Midyear, and Final — cheat sheets are allowed. Here&apos;s how to
                use them wisely.
              </p>
            </div>
          </div>

          <div className="space-y-5">
            <ResourceCard
              title="Midterm Cheat Sheet"
              subtitle="October · Fall Reading Week"
              text={content.resources_cheatsheet_midterm.text}
              fontSize={content.resources_cheatsheet_midterm.fontSize}
              color="purple"
              icon="📝"
            />
            <ResourceCard
              title="Midyear Cheat Sheet"
              subtitle="December · Fall Exam Season"
              text={content.resources_cheatsheet_midyear.text}
              fontSize={content.resources_cheatsheet_midyear.fontSize}
              color="green"
              icon="📊"
            />
            <ResourceCard
              title="Final Exam Cheat Sheet"
              subtitle="April · Winter Exam Season"
              text={content.resources_cheatsheet_final.text}
              fontSize={content.resources_cheatsheet_final.fontSize}
              color="purple"
              icon="🎯"
            />
          </div>
        </div>

        {/* Study Strategies */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 bg-ivey-green rounded-full" />
            <div>
              <h2 className="font-serif text-xl font-bold text-gray-900">Study Strategies</h2>
              <p className="text-gray-500 text-sm">What actually moved the needle.</p>
            </div>
          </div>
          <ResourceCard
            title="What Worked for Me"
            text={content.resources_study_strategies.text}
            fontSize={content.resources_study_strategies.fontSize}
            color="green"
            icon="🧠"
          />
        </div>

        {/* Textbook */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 bg-western-purple rounded-full" />
            <div>
              <h2 className="font-serif text-xl font-bold text-gray-900">The Textbook</h2>
              <p className="text-gray-500 text-sm">~$300 · Used for roughly half the course</p>
            </div>
          </div>
          <ResourceCard
            title="Is the Textbook Worth It?"
            subtitle="My honest take on buying vs. renting vs. skipping"
            text={content.resources_textbook.text}
            fontSize={content.resources_textbook.fontSize}
            color="purple"
            icon="📖"
          />
        </div>
      </div>
    </div>
  )
}
