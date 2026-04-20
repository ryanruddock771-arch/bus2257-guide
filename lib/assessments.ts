// Static metadata for each grading assessment

export interface Assessment {
  slug: string
  name: string
  weight: number
  timing: string
  semester: 'fall' | 'winter'
  hasCheatSheet: boolean
  contentKey: keyof import('./content').SiteContent
  cheatSheetKey?: keyof import('./content').SiteContent
  color: string
  bgColor: string
  description: string
}

export const assessments: Assessment[] = [
  {
    slug: 'midterm',
    name: 'Midterm Exam',
    weight: 20,
    timing: 'Fall Reading Week — October',
    semester: 'fall',
    hasCheatSheet: true,
    contentKey: 'midterm_advice',
    cheatSheetKey: 'resources_cheatsheet_midterm',
    color: '#4F2683',
    bgColor: '#EDE8F5',
    description: 'Your first major exam. Covers Financial Accounting fundamentals.',
  },
  {
    slug: 'midyear',
    name: 'Midyear Exam',
    weight: 25,
    timing: 'Fall Exam Season — December',
    semester: 'fall',
    hasCheatSheet: true,
    contentKey: 'midyear_advice',
    cheatSheetKey: 'resources_cheatsheet_midyear',
    color: '#154733',
    bgColor: '#E8F0EC',
    description: 'Cumulative exam wrapping up the fall semester.',
  },
  {
    slug: 'feasibility',
    name: 'Feasibility Project',
    weight: 20,
    timing: 'After Winter Reading Week — February',
    semester: 'winter',
    hasCheatSheet: false,
    contentKey: 'feasibility_advice',
    color: '#4F2683',
    bgColor: '#EDE8F5',
    description: 'A project-based assessment — the only non-exam component.',
  },
  {
    slug: 'final',
    name: 'Final Exam',
    weight: 25,
    timing: 'Winter Exam Season — April',
    semester: 'winter',
    hasCheatSheet: true,
    contentKey: 'final_advice',
    cheatSheetKey: 'resources_cheatsheet_final',
    color: '#154733',
    bgColor: '#E8F0EC',
    description: 'The last and most comprehensive exam of the course.',
  },
  {
    slug: 'participation',
    name: 'Participation',
    weight: 10,
    timing: 'Ongoing — Full Year',
    semester: 'fall',
    hasCheatSheet: false,
    contentKey: 'participation_advice',
    color: '#7B54AE',
    bgColor: '#EDE8F5',
    description: 'Ongoing contribution throughout both semesters.',
  },
]

export function getAssessment(slug: string): Assessment | undefined {
  return assessments.find((a) => a.slug === slug)
}
