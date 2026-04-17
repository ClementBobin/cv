import { getTech } from '@/data/tech-registry'
import type { TechEntry } from '@/data/types'
import { isTechBadgeItem } from '@/data/types'
import { ExternalLinkIcon } from '../icons'

interface TechBadgeProps { tech: TechEntry }

/** Luminance helpers (same as before) */
function getLuminance(hex: string): number {
  const r = parseInt(hex.slice(1, 3), 16) / 255
  const g = parseInt(hex.slice(3, 5), 16) / 255
  const b = parseInt(hex.slice(5, 7), 16) / 255
  const toLinear = (c: number) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4)
  return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b)
}
function lightenColor(hex: string, amount: number): string {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  const lr = Math.round(r + (255 - r) * amount)
  const lg = Math.round(g + (255 - g) * amount)
  const lb = Math.round(b + (255 - b) * amount)
  return `#${lr.toString(16).padStart(2, '0')}${lg.toString(16).padStart(2, '0')}${lb.toString(16).padStart(2, '0')}`
}
function ensureDarkModeReadable(hex: string): string {
  let color = hex
  let luminance = getLuminance(color)
  let step = 0
  while (luminance < 0.25 && step < 10) {
    color = lightenColor(color, 0.2)
    luminance = getLuminance(color)
    step++
  }
  return color
}
const LUMINANCE_THRESHOLD = 0.4

// add above TechBadge
function TechIcon({ iconHref, iconClass, displayText }: {
  iconHref?: string
  iconClass?: string
  displayText: string
}) {
  if (iconHref) return <img src={iconHref} alt={displayText} className="h-3 w-3 mr-1" />
  if (iconClass) return <i className={`${iconClass} mr-1`} />
  return null
}

export function TechBadge({ tech }: TechBadgeProps) {
  const isObj = isTechBadgeItem(tech)

  const displayText = isObj ? (tech.name) : (tech as string)
  const colorKey = isObj ? (tech.name) : (tech as string)
  const href = isObj ? tech.href : undefined

  const techConfig = getTech(colorKey)
  const color = techConfig.color
  const iconHref = isObj ? techConfig.iconHref : undefined
  const iconClass = isObj ? techConfig.icon : undefined
  const isLight = getLuminance(color) > LUMINANCE_THRESHOLD
  const darkModeColor = ensureDarkModeReadable(color)

  const badgeContent = (
    <>
      {/* Light mode */}
      <span
        className="inline-flex items-center px-2 py-1 rounded text-xs font-medium dark:hidden"
        style={{
          backgroundColor: `${color}20`,
          color: isLight ? '#374151' : color,
        }}
      >
        <TechIcon iconHref={iconHref} iconClass={iconClass} displayText={displayText} />
        {displayText}
        {href && (
          <ExternalLinkIcon
            className="
              h-3
              w-0 group-hover:w-3
              overflow-hidden
              transition-[width,margin] duration-200
              ml-0 group-hover:ml-1
              shrink-0
            "
          />
        )}
      </span>
      {/* Dark mode */}
      <span
        className="items-center px-2 py-1 rounded text-xs font-medium hidden dark:inline-flex"
        style={{
          backgroundColor: `${darkModeColor}20`,
          color: darkModeColor,
        }}
      >
        <TechIcon iconHref={iconHref} iconClass={iconClass} displayText={displayText} />
        {displayText}
        {href && (
          <ExternalLinkIcon
            className="
              h-3
              w-0 group-hover:w-3
              overflow-hidden
              transition-[width,margin] duration-200
              ml-0 group-hover:ml-1
              shrink-0
            "
          />
        )}
      </span>
    </>
  )

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        title={isObj ? tech.tooltip : undefined}
        className="group hover:opacity-80 transition-opacity inline-flex"
      >
        {badgeContent}
      </a>
    )
  }

  return <span title={isObj ? tech.tooltip : undefined}>{badgeContent}</span>
}