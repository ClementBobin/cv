import { useState } from 'react'
import { TechBadge } from './TechBadge'
import type { TechEntry } from '@/data/types'
import { ExternalLinkIcon } from '../icons'

interface ResolvedTrainingItem {
  text: string
  href?: string
}

interface ExperienceDetailsContentProps {
  context: string
  tasks?: string[]
  training?: ResolvedTrainingItem[]
  env?: string
  techs?: TechEntry[]
  description?: string
  labels: {
    mainTasks: string
    moreTasks: string
    moreTraining?: string
    training?: string
    techEnv: string
    technologies: string
    showLess?: string
  }
  variant: 'inline' | 'modal'
  maxTasks?: number
  maxTraining?: number
}

export function ExperienceDetailsContent({
  context,
  tasks,
  training,
   env,
  techs,
  description,
  labels,
  variant,
  maxTasks,
  maxTraining,
}: ExperienceDetailsContentProps) {
  const [tasksExpanded, setTasksExpanded] = useState(false)
  const [trainingExpanded, setTrainingExpanded] = useState(false)

  const visibleTasks =
    maxTasks && !tasksExpanded && tasks && tasks.length > maxTasks
      ? tasks.slice(0, maxTasks)
      : tasks

  const visibleTraining =
    maxTraining && !trainingExpanded && training && training.length > maxTraining
      ? training.slice(0, maxTraining)
      : training

  const hiddenTasksCount = maxTasks && tasks && tasks.length > maxTasks ? tasks.length - maxTasks : 0
  const hiddenTrainingCount = maxTraining && training && training.length > maxTraining ? training.length - maxTraining : 0

  return (
    <div className="space-y-3">
      {variant === 'modal' && description && (
        <p className="text-sm text-resume-text-secondary leading-relaxed">{description}</p>
      )}

      <p className="text-sm text-resume-text-secondary italic border-l-2 border-resume-primary/30 pl-3">
        {context}
      </p>

      {variant === 'modal' && techs && techs.length > 0 && (
        <div>
          <p className="text-xs font-semibold text-resume-text mb-2">{labels.technologies}</p>
          <div className="flex flex-wrap gap-2">
            {techs.map((tech, i) => (
              <TechBadge key={i} tech={tech} />
            ))}
          </div>
        </div>
      )}

      {visibleTasks && visibleTasks.length > 0 && (
        <div>
          <p className="text-xs font-semibold text-resume-text mb-2">{labels.mainTasks}</p>
          <ul className="text-xs text-resume-text-secondary space-y-1">
            {visibleTasks.map((task, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-resume-primary">&#8226;</span>
                <span>{task}</span>
              </li>
            ))}
          </ul>
          {hiddenTasksCount > 0 && (
            <button
              onClick={() => setTasksExpanded(!tasksExpanded)}
              className="text-xs text-resume-primary italic mt-1 hover:underline"
            >
              {tasksExpanded
                ? (labels.showLess ?? labels.moreTasks)
                : `+${hiddenTasksCount} ${labels.moreTasks}`}
            </button>
          )}
        </div>
      )}

      {visibleTraining && visibleTraining.length > 0 && labels.training && (
        <div>
          <p className="text-xs font-semibold text-resume-text mb-2">{labels.training}</p>
          <ul className="text-xs text-resume-text-secondary space-y-1">
            {visibleTraining.map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-resume-primary">&#8226;</span>
                {item.href ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-resume-primary hover:underline transition-colors"
                  >
                    {item.text}
                    <ExternalLinkIcon className="w-3 h-3 text-resume-primary inline-block ml-1" />
                  </a>
                ) : (
                  <span>{item.text}</span>
                )}
              </li>
            ))}
          </ul>
          {hiddenTrainingCount > 0 && (
            <button
              onClick={() => setTrainingExpanded(!trainingExpanded)}
              className="text-xs text-resume-primary italic mt-1 hover:underline"
            >
              {trainingExpanded
                ? (labels.showLess ?? labels.moreTraining ?? labels.moreTasks)
                : `+${hiddenTrainingCount} ${labels.moreTraining ?? labels.moreTasks}`}
            </button>
          )}
        </div>
      )}

      {env && (
        <div className={variant === 'modal' ? 'pt-3 border-t border-resume-primary/20' : ''}>
          <p className="text-xs text-resume-primary">
            <span className="font-semibold">{labels.techEnv}</span> {env}
          </p>
        </div>
      )}
    </div>
  )
}
