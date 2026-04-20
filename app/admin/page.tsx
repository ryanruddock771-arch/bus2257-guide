'use client'

import { useState, useEffect } from 'react'
import type { SiteContent, ContentSection } from '@/lib/content'

const SECTION_LABELS: Record<keyof SiteContent, string> = {
  homepage_survival_tips: 'Homepage — Survival Tips',
  about_intro: 'About — Who I Am',
  about_why: 'About — Why I Took BUS 2257E',
  about_thoughts: 'About — My Thoughts Throughout',
  midterm_advice: 'Midterm — My Advice',
  midyear_advice: 'Midyear — My Advice',
  feasibility_advice: 'Feasibility Project — My Advice',
  final_advice: 'Final — My Advice',
  participation_advice: 'Participation — My Advice',
  resources_cheatsheet_midterm: 'Resources — Midterm Cheat Sheet',
  resources_cheatsheet_midyear: 'Resources — Midyear Cheat Sheet',
  resources_cheatsheet_final: 'Resources — Final Cheat Sheet',
  resources_study_strategies: 'Resources — Study Strategies',
  resources_textbook: 'Resources — Textbook Advice',
  connect_message: 'Connect — Message',
}

const SECTION_GROUPS = [
  {
    label: 'Homepage',
    keys: ['homepage_survival_tips'] as (keyof SiteContent)[],
  },
  {
    label: 'About Me',
    keys: ['about_intro', 'about_why', 'about_thoughts'] as (keyof SiteContent)[],
  },
  {
    label: 'Grading Advice',
    keys: [
      'midterm_advice',
      'midyear_advice',
      'feasibility_advice',
      'final_advice',
      'participation_advice',
    ] as (keyof SiteContent)[],
  },
  {
    label: 'Resources',
    keys: [
      'resources_cheatsheet_midterm',
      'resources_cheatsheet_midyear',
      'resources_cheatsheet_final',
      'resources_study_strategies',
      'resources_textbook',
    ] as (keyof SiteContent)[],
  },
  {
    label: 'Connect',
    keys: ['connect_message'] as (keyof SiteContent)[],
  },
]

const FONT_SIZES = [
  { label: 'Small', value: '14' },
  { label: 'Normal', value: '16' },
  { label: 'Large', value: '18' },
  { label: 'X-Large', value: '20' },
  { label: 'XX-Large', value: '24' },
]

export default function AdminPage() {
  const [password, setPassword] = useState('')
  const [authed, setAuthed] = useState(false)
  const [authError, setAuthError] = useState('')
  const [content, setContent] = useState<SiteContent | null>(null)
  const [activeKey, setActiveKey] = useState<keyof SiteContent>('homepage_survival_tips')
  const [saving, setSaving] = useState(false)
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saved' | 'error'>('idle')
  const [loading, setLoading] = useState(false)

  // Check existing auth cookie on load
  useEffect(() => {
    fetch('/api/admin/check')
      .then((r) => r.json())
      .then((d) => {
        if (d.ok) {
          setAuthed(true)
          loadContent()
        }
      })
      .catch(() => {})
  }, [])

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setAuthError('')
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })
    if (res.ok) {
      setAuthed(true)
      loadContent()
    } else {
      setAuthError('Incorrect password. Try again.')
    }
  }

  async function loadContent() {
    setLoading(true)
    const res = await fetch('/api/content')
    const data = await res.json()
    setContent(data)
    setLoading(false)
  }

  async function handleSaveSection(key: keyof SiteContent) {
    if (!content) return
    setSaving(true)
    setSaveStatus('idle')
    const res = await fetch('/api/content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(content),
    })
    setSaving(false)
    setSaveStatus(res.ok ? 'saved' : 'error')
    setTimeout(() => setSaveStatus('idle'), 3000)
  }

  function updateSection(key: keyof SiteContent, field: keyof ContentSection, value: string) {
    if (!content) return
    setContent({ ...content, [key]: { ...content[key], [field]: value } })
    setSaveStatus('idle')
  }

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' })
    setAuthed(false)
    setContent(null)
    setPassword('')
  }

  // ── Login screen ─────────────────────────────────────────────
  if (!authed) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-6">
        <div className="w-full max-w-sm">
          <div className="card p-8 text-center">
            <div className="w-12 h-12 bg-western-purple-light rounded-xl flex items-center justify-center mx-auto mb-5">
              <svg className="w-6 h-6 text-western-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h1 className="font-serif text-2xl font-bold text-gray-900 mb-1">Admin Panel</h1>
            <p className="text-gray-400 text-sm mb-6">BUS 2257E Guide · Content Editor</p>

            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-western-purple focus:border-transparent"
              />
              {authError && (
                <p className="text-red-500 text-xs">{authError}</p>
              )}
              <button
                type="submit"
                className="w-full btn-primary py-3 text-sm"
              >
                Sign In
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }

  // ── Loading ──────────────────────────────────────────────────
  if (loading || !content) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-western-purple border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-gray-400 text-sm">Loading content...</p>
        </div>
      </div>
    )
  }

  const activeSection = content[activeKey]

  // ── Editor ───────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <div className="bg-western-purple px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-white font-serif font-bold text-lg">Content Editor</h1>
          <p className="text-purple-200 text-xs">BUS 2257E Guide</p>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="/"
            target="_blank"
            className="text-purple-200 hover:text-white text-sm transition-colors"
          >
            View Site ↗
          </a>
          <button
            onClick={handleLogout}
            className="bg-white/10 border border-white/20 text-white px-4 py-1.5 rounded-lg text-xs hover:bg-white/20 transition-colors"
          >
            Sign Out
          </button>
        </div>
      </div>

      <div className="flex h-[calc(100vh-64px)]">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-100 overflow-y-auto flex-shrink-0">
          <div className="p-4 space-y-4">
            {SECTION_GROUPS.map((group) => (
              <div key={group.label}>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider px-2 mb-2">
                  {group.label}
                </p>
                <ul className="space-y-1">
                  {group.keys.map((key) => (
                    <li key={key}>
                      <button
                        onClick={() => setActiveKey(key)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-colors ${
                          activeKey === key
                            ? 'bg-western-purple text-white font-semibold'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                      >
                        {SECTION_LABELS[key].split(' — ')[1] || SECTION_LABELS[key]}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </aside>

        {/* Editor pane */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-3xl mx-auto">
            <div className="mb-5">
              <h2 className="font-serif text-xl font-bold text-gray-900">
                {SECTION_LABELS[activeKey]}
              </h2>
              <p className="text-gray-400 text-xs mt-1">
                Changes are saved when you click Save. Refresh the live site to see them.
              </p>
            </div>

            {/* Font size picker */}
            <div className="mb-4">
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Font Size
              </label>
              <div className="flex gap-2 flex-wrap">
                {FONT_SIZES.map((f) => (
                  <button
                    key={f.value}
                    onClick={() => updateSection(activeKey, 'fontSize', f.value)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                      activeSection.fontSize === f.value
                        ? 'bg-western-purple text-white border-western-purple'
                        : 'bg-white text-gray-600 border-gray-200 hover:border-western-purple hover:text-western-purple'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Textarea */}
            <div className="mb-4">
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Content
              </label>
              <textarea
                value={activeSection.text}
                onChange={(e) => updateSection(activeKey, 'text', e.target.value)}
                className="w-full min-h-[320px] px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-western-purple focus:border-transparent resize-y text-gray-700 leading-relaxed"
                style={{ fontSize: `${activeSection.fontSize}px` }}
                placeholder="Write your advice here..."
              />
            </div>

            {/* Preview */}
            <div className="mb-6">
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Preview
              </label>
              <div className="bg-white border border-gray-100 rounded-xl p-5 min-h-[100px]">
                <p
                  className="content-display text-gray-700 leading-relaxed"
                  style={{ fontSize: `${activeSection.fontSize}px` }}
                >
                  {activeSection.text || (
                    <span className="text-gray-300 italic">Nothing written yet...</span>
                  )}
                </p>
              </div>
            </div>

            {/* Save button */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => handleSaveSection(activeKey)}
                disabled={saving}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {saving ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Saving...
                  </>
                ) : (
                  'Save Changes'
                )}
              </button>
              {saveStatus === 'saved' && (
                <span className="text-ivey-green text-sm font-medium flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Saved successfully
                </span>
              )}
              {saveStatus === 'error' && (
                <span className="text-red-500 text-sm">Save failed — check your connection.</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
