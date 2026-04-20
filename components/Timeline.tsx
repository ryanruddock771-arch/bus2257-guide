const events = [
  {
    month: 'Sept',
    label: 'Course Begins',
    detail: 'Fall semester kicks off',
    semester: 'fall',
    dot: 'bg-gray-400',
  },
  {
    month: 'Oct',
    label: 'Midterm',
    detail: 'Fall Reading Week · 20%',
    semester: 'fall',
    dot: 'bg-western-purple',
    highlight: true,
  },
  {
    month: 'Dec',
    label: 'Midyear Exam',
    detail: 'Fall Exam Season · 25%',
    semester: 'fall',
    dot: 'bg-ivey-green',
    highlight: true,
  },
  {
    month: 'Jan',
    label: 'Winter Semester',
    detail: 'Course continues',
    semester: 'winter',
    dot: 'bg-gray-400',
  },
  {
    month: 'Feb',
    label: 'Feasibility Project',
    detail: 'After Winter Reading Week · 20%',
    semester: 'winter',
    dot: 'bg-western-purple',
    highlight: true,
  },
  {
    month: 'Apr',
    label: 'Final Exam',
    detail: 'Winter Exam Season · 25%',
    semester: 'winter',
    dot: 'bg-ivey-green',
    highlight: true,
  },
]

export default function Timeline() {
  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-[28px] top-3 bottom-3 w-0.5 bg-gray-200 md:hidden" />
      {/* Horizontal line (desktop) */}
      <div className="hidden md:block absolute top-5 left-8 right-8 h-0.5 bg-gray-200" />

      {/* Mobile layout */}
      <div className="md:hidden space-y-6 pl-16">
        {events.map((e, i) => (
          <div key={i} className="relative">
            <div
              className={`absolute -left-10 w-5 h-5 rounded-full border-2 border-white shadow ${e.dot} ${
                e.highlight ? 'w-6 h-6 -left-11' : ''
              }`}
            />
            <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5">
              {e.month}
            </div>
            <div
              className={`font-semibold ${
                e.highlight ? 'text-western-purple' : 'text-gray-700'
              }`}
            >
              {e.label}
            </div>
            <div className="text-sm text-gray-500">{e.detail}</div>
          </div>
        ))}
      </div>

      {/* Desktop layout */}
      <div className="hidden md:grid grid-cols-6 gap-2 text-center">
        {events.map((e, i) => (
          <div key={i} className="flex flex-col items-center gap-2">
            <div
              className={`w-5 h-5 rounded-full border-2 border-white shadow z-10 ${e.dot} ${
                e.highlight ? 'w-6 h-6' : ''
              }`}
            />
            <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              {e.month}
            </div>
            <div
              className={`text-sm font-semibold leading-tight ${
                e.highlight ? 'text-western-purple' : 'text-gray-600'
              }`}
            >
              {e.label}
            </div>
            {e.highlight && (
              <div className="text-xs text-gray-500 leading-snug">{e.detail}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
