'use client'

interface Segment {
  label: string
  weight: number
  color: string
}

const segments: Segment[] = [
  { label: 'Participation', weight: 10, color: '#9B72CF' },
  { label: 'Midterm', weight: 20, color: '#4F2683' },
  { label: 'Midyear', weight: 25, color: '#154733' },
  { label: 'Feasibility', weight: 20, color: '#2D8C5F' },
  { label: 'Final', weight: 25, color: '#7B54AE' },
]

const r = 45
const cx = 60
const cy = 60
const circumference = 2 * Math.PI * r

function buildSegments() {
  let offset = 0
  return segments.map((seg) => {
    const dash = (seg.weight / 100) * circumference
    const gap = circumference - dash
    const rotation = (offset / 100) * 360 - 90
    offset += seg.weight
    return { ...seg, dash, gap, rotation }
  })
}

export default function GradeDonut() {
  const built = buildSegments()

  return (
    <div className="flex flex-col md:flex-row items-center gap-8">
      {/* SVG Donut */}
      <div className="relative flex-shrink-0">
        <svg width="120" height="120" viewBox="0 0 120 120" className="drop-shadow-md">
          {built.map((seg, i) => (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r={r}
              fill="none"
              stroke={seg.color}
              strokeWidth="18"
              strokeDasharray={`${seg.dash} ${seg.gap}`}
              strokeDashoffset="0"
              transform={`rotate(${seg.rotation} ${cx} ${cy})`}
              className="transition-all duration-300"
            />
          ))}
          <text
            x={cx}
            y={cy - 6}
            textAnchor="middle"
            className="font-bold"
            fontSize="10"
            fill="#1a1a1a"
            fontFamily="Georgia, serif"
          >
            BUS
          </text>
          <text
            x={cx}
            y={cy + 8}
            textAnchor="middle"
            fontSize="9"
            fill="#555"
            fontFamily="Georgia, serif"
          >
            2257E
          </text>
        </svg>
      </div>

      {/* Legend */}
      <div className="grid grid-cols-1 gap-2 w-full">
        {segments.map((seg) => (
          <div key={seg.label} className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full flex-shrink-0"
                style={{ backgroundColor: seg.color }}
              />
              <span className="text-sm text-gray-700 font-medium">{seg.label}</span>
            </div>
            <span
              className="text-sm font-bold px-2 py-0.5 rounded-full text-white"
              style={{ backgroundColor: seg.color }}
            >
              {seg.weight}%
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
