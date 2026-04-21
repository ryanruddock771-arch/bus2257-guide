// Content data layer — reads/writes from Vercel KV
// All editable sections are defined here with their default placeholder text

export interface ContentSection {
  text: string
  fontSize: string // '14' | '16' | '18' | '20' | '24'
}

export interface SiteContent {
  homepage_survival_tips: ContentSection
  about_intro: ContentSection
  about_why: ContentSection
  about_thoughts: ContentSection
  midterm_advice: ContentSection
  midyear_advice: ContentSection
  feasibility_advice: ContentSection
  final_advice: ContentSection
  participation_advice: ContentSection
  resources_cheatsheet_midterm: ContentSection
  resources_cheatsheet_midyear: ContentSection
  resources_cheatsheet_final: ContentSection
  resources_study_strategies: ContentSection
  resources_textbook: ContentSection
  connect_message: ContentSection
}

export const defaultContent: SiteContent = {
  homepage_survival_tips: {
    text: '• [Tip 1 — e.g., Start problem sets early, accounting builds on itself]\n• [Tip 2 — e.g., Attend every lecture, concepts move fast]\n• [Tip 3 — e.g., Form a study group before the Midterm]\n• [Tip 4 — e.g., The Midyear and Final are cumulative]\n• [Tip 5 — e.g., Use your cheat sheet strategically]',
    fontSize: '16',
  },
  about_intro: {
    text: '[Write a bit about yourself here — your year, program, and background going into BUS 2257E.]',
    fontSize: '16',
  },
  about_why: {
    text: '[Why did you choose to take BUS 2257E? Was it required? Were you interested in accounting? Share your honest reasons.]',
    fontSize: '16',
  },
  about_thoughts: {
    text: '[What were your thoughts going into the course? How did those thoughts evolve throughout the semester? What surprised you?]',
    fontSize: '16',
  },
  midterm_advice: {
    text: '[Your honest advice for the Midterm. What topics should students focus on? What tripped you up? What would you do differently?]',
    fontSize: '16',
  },
  midyear_advice: {
    text: '[Your advice for the Midyear exam. How is it different from the Midterm? What new material does it cover? How should students prepare?]',
    fontSize: '16',
  },
  feasibility_advice: {
    text: '[Your advice for the Feasibility Project. What is it asking you to do? What mistakes do first-years commonly make? What made yours successful?]',
    fontSize: '16',
  },
  final_advice: {
    text: '[Your advice for the Final exam. How does it compare to the Midyear? What topics deserve the most attention in the final stretch?]',
    fontSize: '16',
  },
  participation_advice: {
    text: '[Your advice on Participation. How was it graded? How often should students speak up? What counts as good participation in this course?]',
    fontSize: '16',
  },
  resources_cheatsheet_midterm: {
    text: '[What would you put on your Midterm cheat sheet? Which formulas, concepts, or journal entry templates were most valuable? How did you organize it?]',
    fontSize: '16',
  },
  resources_cheatsheet_midyear: {
    text: '[What would you put on your Midyear cheat sheet? How does it differ from the Midterm cheat sheet? What new content needs to be added?]',
    fontSize: '16',
  },
  resources_cheatsheet_final: {
    text: '[What would you put on your Final cheat sheet? By this point you have a lot of material — how do you prioritize what makes it onto one sheet?]',
    fontSize: '16',
  },
  resources_study_strategies: {
    text: '[What study strategies worked for you in BUS 2257E? Group studying? Practice problems? Rewriting notes? Share what actually moved the needle.]',
    fontSize: '16',
  },
  resources_textbook: {
    text: '[The textbook runs around $300 and covers roughly half the course. Here\'s my honest take on whether it\'s worth buying, renting, or skipping altogether.]',
    fontSize: '16',
  },
  connect_message: {
    text: 'Have a question about BUS 2257E that isn\'t answered here? Feel free to reach out on LinkedIn — I\'m happy to chat with anyone navigating this course.',
    fontSize: '16',
  },
}

// ─── Redis helpers ─────────────────────────────────────────────────────────────

async function getRedis() {
  const url = process.env.REDIS_URL
  if (!url) return null

  try {
    const { createClient } = await import('redis')
    const client = createClient({ url })
    await client.connect()
    return client
  } catch {
    return null
  }
}

export async function getContent(): Promise<SiteContent> {
  const redis = await getRedis()
  if (!redis) return defaultContent

  try {
    const raw = await redis.get('site_content')
const stored = raw ? JSON.parse(raw as string) as SiteContent : null
    if (!stored) return defaultContent
    // Merge with defaults so new keys added later still appear
    return { ...defaultContent, ...stored }
  } catch {
    return defaultContent
  }
}

export async function saveContent(content: SiteContent): Promise<boolean> {
  const redis = await getRedis()
  if (!redis) return false

  try {
    await redis.set('site_content', JSON.stringify(content))
    return true
  } catch {
    return false
  }
}
