export const dynamic = 'force-dynamic'

import { getContent } from '@/lib/content'
import { recordPageView } from '@/lib/analytics'

export const metadata = {
  title: 'Connect | BUS 2257E Guide',
}

export default async function ConnectPage() {
  await recordPageView('connect')
  const content = await getContent()
  const msg = content.connect_message

  return (
    <div>
      {/* Header */}
      <div className="section-header">
        <div className="max-w-3xl mx-auto">
          <span className="inline-block bg-white/20 text-purple-100 text-xs font-semibold px-3 py-1 rounded-full mb-4">
            Get in Touch
          </span>
          <h1 className="font-serif text-3xl md:text-4xl font-bold mb-3">Connect</h1>
          <p className="text-purple-200 text-lg max-w-xl mx-auto">
            Have a question this site didn&apos;t answer? I&apos;m happy to chat.
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-16">
        {/* LinkedIn Card */}
        <div className="card p-8 md:p-12 text-center">
          {/* LinkedIn Icon */}
          <div className="w-16 h-16 bg-[#0077B5] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </div>

          <h2 className="font-serif text-2xl font-bold text-gray-900 mb-1">Ryan Ruddock</h2>
          <p className="text-gray-400 text-sm mb-6">Western University · Ivey Business School</p>

          <p
            className="content-display text-gray-600 leading-relaxed mb-8 max-w-md mx-auto"
            style={{ fontSize: `${msg.fontSize}px` }}
          >
            {msg.text}
          </p>

          <a
            href="https://www.linkedin.com/in/ryan-ruddock/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#0077B5] text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-[#005f8e] transition-colors shadow-md text-sm"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            Connect on LinkedIn
          </a>
        </div>

        {/* What to ask */}
        <div className="mt-10 card p-6 bg-western-purple-light border-l-4 border-western-purple">
          <h3 className="font-serif text-lg font-bold text-western-purple mb-3">
            What to Message About
          </h3>
          <ul className="space-y-2 text-sm text-gray-600">
            {[
              'Questions about a specific exam or assessment',
              'Advice on balancing BUS 2257E with other second-year courses',
              'When should I use the textbook and is it worth it?',
              'Tips for the Feasibility Project',
              'Anything else about navigating the course',
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-western-purple font-bold mt-0.5">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
