import { useState } from 'react'
import { TechBadge } from './TechBadge'
import { GitHubIcon, ExternalLinkIcon } from '@/components/icons'
import type { TechEntry } from '@/data/types'
import { techKey } from '@/lib/utils'

interface ProjectItemProps {
  title: string
  description: string
  techs: TechEntry[]
  maxTechs?: number
  url?: string
  github?: string
  showMoreLabel?: string
  showLessLabel?: string
}

export function ProjectItem({ 
  title, 
  description, 
  techs, 
  maxTechs, 
  url, 
  github,
  showMoreLabel = 'Show more',
  showLessLabel = 'Show less',
}: ProjectItemProps) {
  const [techsExpanded, setTechsExpanded] = useState(false)

  const visibleTechs =
    maxTechs && techs && techs.length > maxTechs && !techsExpanded
      ? techs.slice(0, maxTechs)
      : techs

  return (
    <div className="py-3 px-3 -mx-3 rounded-lg hover:bg-resume-primary/5 transition-colors">
      <div className="flex items-center gap-2 mb-1">
        <h3 className="text-sm font-semibold text-resume-text">{title}</h3>
        {url && (
          <a href={url} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${title}`}>
            <ExternalLinkIcon className="w-3.5 h-3.5 text-resume-primary" />
          </a>
        )}
        {github && (
          <a href={github} target="_blank" rel="noopener noreferrer" aria-label={`${title} on GitHub`}>
            <GitHubIcon className="w-3.5 h-3.5 text-resume-primary" />
          </a>
        )}
      </div>
      <p className="text-xs text-resume-text-secondary mb-2">{description}</p>
      {visibleTechs && visibleTechs.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {visibleTechs.map((tech) => (
            <TechBadge key={techKey(tech)} tech={tech} />
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
