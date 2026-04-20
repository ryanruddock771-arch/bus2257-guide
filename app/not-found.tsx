import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-6">
      <div className="text-center">
        <div className="text-6xl font-serif font-bold text-western-purple mb-3">404</div>
        <h1 className="text-2xl font-serif font-bold text-gray-900 mb-2">Page not found</h1>
        <p className="text-gray-500 mb-6">That page doesn&apos;t exist.</p>
        <Link href="/" className="btn-primary">
          Back to Home
        </Link>
      </div>
    </div>
  )
}
