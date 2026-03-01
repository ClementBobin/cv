import { useState } from 'react'
import { assetUrl } from '@/lib/utils'
import { TechBadge } from './TechBadge'
import type { TechEntry } from '@/data/types'
import { ExternalLinkIcon } from '../icons'

interface EducationItemProps {
  school: string
  degree: string
  degreeHref?: string
  href?: string
  specialty?: string
  period?: string
  logo?: string
  techs?: TechEntry[]
  maxTechs?: number
  showMoreLabel?: string
  showLessLabel?: string
}

export function EducationItem({
  school,
  degree,
  degreeHref,
  href,
  specialty,
  period,
  logo,
  techs,
  maxTechs,
  showMoreLabel = 'Show more',
  showLessLabel = 'Show less',
}: EducationItemProps) {
  const [techsExpanded, setTechsExpanded] = useState(false)

  const visibleTechs =
    maxTechs && techs && techs.length > maxTechs && !techsExpanded
      ? techs.slice(0, maxTechs)
      : techs

  const inner = (
    <EducationItemInner
      school={school}
      href={href}
      degree={degree}
      degreeHref={degreeHref}
      specialty={specialty}
      period={period}
      logo={logo}
    />
  )

  return (
    <div>
      <div className="flex items-start gap-4">{inner}</div>
      {visibleTechs && visibleTechs.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {visibleTechs.map((tech, i) => (
            <TechBadge key={i} tech={tech} />
          ))}
          {maxTechs && techs && techs.length > maxTechs && (
            <button
              onClick={() => setTechsExpanded(!techsExpanded)}
              className="text-xs text-resume-primary hover:underline"
            >
              {techsExpanded ? showLessLabel : `+${techs.length - maxTechs} ${showMoreLabel}`}
            </button>
          )}
        </div>
      )}
    </div>
  )
}

function EducationItemInner({
  school,
  href,
  degree,
  degreeHref,
  specialty,
  period,
  logo,
}: {
  school: string
  href?: string
  degree: string
  degreeHref?: string
  specialty?: string
  period?: string
  logo?: string
}) {
  return (
    <>
      {logo && (
        <div className="w-14 h-14 rounded-lg overflow-hidden flex-shrink-0">
          <img src={assetUrl(logo)} alt={`${school} logo`} className="object-contain w-full h-full" loading="lazy" />
        </div>
      )}
      <div>
        {href ? (
          <a 
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-base font-semibold text-resume-text flex flex-row hover:text-resume-primary hover:underline transition-colors"
          >
            {school}
            <ExternalLinkIcon className="w-4 h-4 text-resume-primary inline-block ml-1" />
          </a>
        ) : (
          <p className="text-base font-semibold text-resume-text">{school}</p>
        )}
        {degreeHref ? (
          <a
            href={degreeHref}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-resume-text-secondary hover:text-resume-primary hover:underline transition-colors"
          >
            {degree}
            <ExternalLinkIcon className="w-3 h-3 text-resume-primary inline-block ml-1" />
          </a>
        ) : (
          <p className="text-sm text-resume-text-secondary">{degree}</p>
        )}
        {specialty && (
          <p className="text-sm text-resume-primary">{specialty}</p>
        )}
        {period && (
          <p className="text-xs text-resume-text-secondary mt-0.5">{period}</p>
        )}
      </div>
    </>
  )
}
