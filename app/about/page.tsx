import { getContent } from '@/lib/content'

export const metadata = {
  title: 'About | BUS 2257E Guide',
}

export default async function AboutPage() {
  const content = await getContent()

  const sections = [
    {
      key: 'about_intro',
      title: 'Who I Am',
      icon: '👋',
      content: content.about_intro,
      color: 'purple' as const,
    },
    {
      key: 'about_why',
      title: 'Why I Took BUS 2257E',
      icon: '💡',
      content: content.about_why,
      color: 'green' as const,
    },
    {
      key: 'about_thoughts',
      title: 'My Thoughts Going In — and Throughout',
      icon: '📖',
      content: content.about_thoughts,
      color: 'purple' as const,
    },
  ]

  return (
    <div>
      {/* Header */}
      <div
        className="py-16 px-6 text-white text-center"
        style={{ background: 'linear-gradient(135deg, #154733 0%, #0f3326 100%)' }}
      >
        <div className="max-w-3xl mx-auto">
          <span className="inline-block bg-white/20 text-green-100 text-xs font-semibold px-3 py-1 rounded-full mb-4">
            Upper Year Student
          </span>
          <h1 className="font-serif text-3xl md:text-4xl font-bold mb-3">About Me</h1>
          <p className="text-green-100 text-lg max-w-xl mx-auto">
            Who I am, why I took this course, and what I actually thought of it.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-12 space-y-8">
        {sections.map((s) => {
          const isPurple = s.color === 'purple'
          return (
            <div
              key={s.key}
              className={`card p-6 md:p-8 border-l-4 ${
                isPurple ? 'border-western-purple' : 'border-ivey-green'
              }`}
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="text-2xl">{s.icon}</span>
                <h2
                  className={`font-serif text-xl font-bold ${
                    isPurple ? 'text-western-purple' : 'text-ivey-green'
                  }`}
                >
                  {s.title}
                </h2>
              </div>
              <p
                className="content-display text-gray-700 leading-relaxed"
                style={{ fontSize: `${s.content.fontSize}px` }}
              >
                {s.content.text}
              </p>
            </div>
          )
        })}

        {/* LinkedIn CTA */}
        <div className="card p-6 bg-western-purple-light border-l-4 border-western-purple text-center">
          <p className="text-gray-700 mb-4 text-sm">
            Want to know more or have questions? Connect with me directly on LinkedIn.
          </p>
          <a
            href="https://www.linkedin.com/in/ryan-ruddock/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-western-purple text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-western-purple-dark transition-colors"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            Ryan Ruddock on LinkedIn
          </a>
        </div>
      </div>
    </div>
  )
}
