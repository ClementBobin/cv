import { useState } from 'react'
import { m, AnimatePresence } from 'framer-motion'
import { ChevronDownIcon, ExternalLinkIcon } from '@/components/icons'
import { useBreakpoints } from '@/lib/hooks/useBreakpoints'
import { Modal } from '@/components/ui/Modal'
import { cn, techKey } from '@/lib/utils'
import { TechBadge } from './TechBadge'
import { ExperienceDetailsContent } from './ExperienceDetails'
import type { TechEntry } from '@/data/types'

interface ResolvedTrainingItem {
  text: string
  href?: string
}

interface ExperienceItemProps {
  year: string
  company: string
  type?: string
  workType?: 'work' | 'experience'
  /** Optional URL – clicking the header opens this in a new tab instead of expanding details. */
  href?: string
  role: string
  description: string
  techs: TechEntry[]
  expanded: boolean
  onToggle: () => void
  details?: {
    context: string
    tasks?: string[]
    training?: ResolvedTrainingItem[]
    env?: string
  }
  subItem?: { title: string; description: string }
  labels: {
    mainTasks: string
    moreTasks: string
    moreTraining?: string
    training?: string
    techEnv: string
    technologies: string
    showLess?: string
  }
  isHighlighted?: boolean
  maxTasks?: number
  maxTraining?: number
  /** Max number of tech badges to show initially (show-more/less). */
  maxTechs?: number
}

/** Returns Tailwind color classes for the experience type badge based on workType. */
function typeBadgeClasses(workType?: 'work' | 'experience'): string {
  if (workType === 'experience') {
    return 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300'
  }
  // default: 'work'
  return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
}

export function ExperienceItem({
  year,
  company,
  type,
  workType,
  href,
  role,
  description,
  techs,
  expanded,
  onToggle,
  details,
  subItem,
  labels,
  isHighlighted = false,
  maxTasks,
  maxTraining,
  maxTechs,
}: ExperienceItemProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [techsExpanded, setTechsExpanded] = useState(false)
  const { isDesktop } = useBreakpoints()

  const visibleTechs =
    maxTechs && !techsExpanded && techs.length > maxTechs
      ? techs.slice(0, maxTechs)
      : techs
  const hiddenTechsCount =
    maxTechs && techs.length > maxTechs ? techs.length - maxTechs : 0

  const handleToggleTechs = (e: React.MouseEvent) => {
    e.stopPropagation()
    setTechsExpanded(!techsExpanded)
  }

  const handleClick = () => {
    if (!details) return
    if (isDesktop) {
      onToggle()
    } else {
      setIsModalOpen(true)
    }
  }

  return (
    <m.div
      className="relative"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={isHighlighted ? { scale: 1.02 } : {}}
      transition={{ duration: 0.2 }}
    >
      <button
        onClick={handleClick}
        aria-expanded="true"
        className="w-full text-left group relative z-10 cursor-pointer"
      >
        <div
          className={cn(
            'flex items-start gap-4 py-3 rounded-lg px-3 -mx-3 transition-all duration-300',
            isHighlighted
              ? 'border-2 border-resume-primary/30 bg-resume-primary/5 hover:border-resume-primary/50 hover:shadow-md'
              : 'hover:bg-resume-primary/5'
          )}
        >
          <div className="w-20 shrink-0">
            <span className="text-sm font-bold text-resume-primary">{year}</span>
          </div>

          <div className="flex-1 min-w-0 relative">
            {details && (
              <m.div
                animate={{ rotate: expanded ? 180 : 0 }}
                className="absolute top-0 right-0"
              >
                <ChevronDownIcon className="w-4 h-4 text-resume-primary" />
              </m.div>
            )}
            <div className="flex items-center gap-2 flex-wrap pr-6 md:pr-0">
              {href ? (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-sm font-semibold text-resume-text hover:underline"
                >
                  {company}
                  <ExternalLinkIcon className="w-3 h-3 text-resume-primary" />
                </a>
              ) : (
                <h3 className="text-sm font-semibold text-resume-text">{company}</h3>
              )}
              {type && (
                <span className={cn('text-xs px-2 py-0.5 rounded', typeBadgeClasses(workType))}>
                  {type}
                </span>
              )}
            </div>
            <p className="text-xs text-resume-text-secondary mt-0.5">{role}</p>
            <p className="text-xs text-resume-text-secondary/80 mt-1 line-clamp-2">{description}</p>

            {techs && techs.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {visibleTechs.map((tech) => (
                  <TechBadge key={techKey(tech)} tech={tech} />
                ))}
                {hiddenTechsCount > 0 && (
                  <button
                    onClick={handleToggleTechs}
                    className="text-xs text-resume-primary hover:underline self-center"
                  >
                    {techsExpanded
                      ? (labels.showLess ?? '-')
                      : `+${hiddenTechsCount}`}
                  </button>
                )}
              </div>
            )}

            {subItem && (
              <div className="mt-3 pl-3 border-l-2 border-resume-primary/20">
                <p className="text-xs font-medium text-resume-text">{subItem.title}</p>
                <p className="text-xs text-resume-text-secondary">{subItem.description}</p>
              </div>
            )}
          </div>
        </div>
      </button>

      {isDesktop && details && (
        <AnimatePresence>
          {expanded && (
            <m.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="ml-24 mt-2 mb-4 p-4 bg-resume-bg rounded-lg border border-resume-primary/20">
                <ExperienceDetailsContent
                  context={details.context}
                  tasks={details.tasks}
                  training={details.training}
                  env={details.env}
                  labels={labels}
                  variant="inline"
                  maxTasks={maxTasks}
                  maxTraining={maxTraining}
                />
              </div>
            </m.div>
          )}
        </AnimatePresence>
      )}

      {details && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          header={
            <div>
              <h2 className="font-semibold text-lg text-resume-text">{company}</h2>
              <p className="text-sm text-resume-primary">{role}</p>
              <p className="text-xs text-resume-text-secondary mt-1">{year}</p>
            </div>
          }
        >
          <ExperienceDetailsContent
            context={details.context}
            tasks={details.tasks}
            training={details.training}
            techs={techs}
            description={description}
            env={details.env}
            labels={labels}
            variant="modal"
            maxTasks={maxTasks}
            maxTraining={maxTraining}
          />
          {subItem && (
            <div className="pt-3 mt-3 border-t border-resume-primary/20">
              <p className="text-sm font-medium text-resume-text mb-1">{subItem.title}</p>
              <p className="text-sm text-resume-text-secondary">{subItem.description}</p>
            </div>
          )}
        </Modal>
      )}
    </m.div>
  )
}
