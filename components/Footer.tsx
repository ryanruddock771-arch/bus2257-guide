import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-auto">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="font-serif text-white text-lg font-semibold mb-2">
              BUS 2257E Guide
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              An honest, first-hand guide to navigating Western University&apos;s
              Business 2257E course from an upper-year Ivey student.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-3">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              {[
                { href: '/grading', label: 'Grading Breakdown' },
                { href: '/resources', label: 'Resources' },
                { href: '/connect', label: 'Connect on LinkedIn' },
                { href: '/about', label: 'About Me' },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-3">
              Have Questions?
            </h4>
            <p className="text-sm text-gray-400 mb-3">
              Reach out directly on LinkedIn — happy to answer any questions
              about the course.
            </p>
            <a
              href="https://www.linkedin.com/in/ryan-ruddock/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#0077B5] text-white text-sm px-4 py-2 rounded-lg hover:bg-[#005f8e] transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              Ryan Ruddock
            </a>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="border-t border-gray-800 pt-6">
          <p className="text-xs text-gray-500 leading-relaxed text-center">
            <strong className="text-gray-400">Disclaimer:</strong> This website reflects personal opinions and experiences from one student&apos;s time in BUS 2257E at Western University. It is not affiliated with, endorsed by, or representative of Western University, the Ivey Business School, or any course instructor. All advice is informal and should not be treated as official academic guidance. Grade weights and course structure may change — always refer to your official course syllabus.
          </p>
          <p className="text-xs text-gray-600 text-center mt-3">
            © {new Date().getFullYear()} BUS 2257E Student Guide · Western University
          </p>
        </div>
      </div>
    </footer>
  )
}
