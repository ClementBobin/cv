import { useState } from 'react'
import { useTranslation } from '@/lib/i18n'
import type { ResumeConfig, LocalizedTrainingArray, TrainingItem } from '@/data/types'
import { ExperienceItem } from './ExperienceItem'
import { ProjectItem } from './ProjectItem'
import { EducationItem } from './EducationItem'
import { ExternalLinkIcon } from '@/components/icons'

interface MainContentProps {
  config: ResumeConfig
}

/** Resolve a LocalizedTrainingArray to an array of { text, href } objects for a given language. */
function resolveTrainingItems(
  lta: LocalizedTrainingArray,
  language: string,
  defaultLang: string
): Array<{ text: string; href?: string }> {
  const items: TrainingItem[] =
    lta[language] ?? lta[defaultLang] ?? Object.values(lta)[0] ?? []
  return items.map((item) =>
    typeof item === 'string' ? { text: item } : item
  )
}

export function MainContent({ config }: MainContentProps) {
  const { resolve, resolveArray, language } = useTranslation()
  const { personal, experiences, projects, education, labels, limits } = config
  const [expandedExp, setExpandedExp] = useState<string | null>(null)
  const [showAllExp, setShowAllExp] = useState(false)
  const [showAllProjects, setShowAllProjects] = useState(false)
  const [showAllEducations, setShowAllEducations] = useState(false)

  const toggleExp = (id: string) => {
    setExpandedExp(expandedExp === id ? null : id)
  }

  const defaultLang = config.languages.default

  const showMoreLabel = labels.actions.showMore ? resolve(labels.actions.showMore) : 'Show more'
  const showLessLabel = labels.actions.showLess ? resolve(labels.actions.showLess) : 'Show less'

  const experienceLabels = {
    mainTasks: resolve(labels.experience.mainTasks),
    moreTasks: resolve(labels.experience.moreTasks),
    moreTraining: labels.experience.moreTraining ? resolve(labels.experience.moreTraining) : undefined,
    training: labels.experience.training ? resolve(labels.experience.training) : undefined,
    techEnv: resolve(labels.experience.techEnv),
    technologies: resolve(labels.experience.technologies),
    showLess: showLessLabel,
  }

  const visibleExperiences =
    limits?.experiences && !showAllExp
      ? experiences.slice(0, limits.experiences)
      : experiences

  const visibleProjects =
    limits?.projects && !showAllProjects && projects
      ? projects.slice(0, limits.projects)
      : projects

  const visibleEducations =
    limits?.education && !showAllEducations && education
      ? education.slice(0, limits.education)
      : education

  return (
    <div className="md:w-[62%] p-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-[0.15em] text-resume-text">
          {personal.name.toUpperCase()}
        </h1>
        {personal.title.href ? (
          <a href={personal.title.href} className="text-base text-resume-text-secondary tracking-widest mt-2">
            {resolve(personal.title.libelle).toUpperCase()}
            <ExternalLinkIcon className="w-3 h-3 text-resume-primary" />
          </a>
        ) : (
          <p className="text-base text-resume-text-secondary tracking-widest mt-2">
            {resolve(personal.title.libelle).toUpperCase()}
          </p>
        )}
        {personal.subtitle && (
          <p className="text-sm text-resume-primary mt-1">{resolve(personal.subtitle)}</p>
        )}
      </div>

      {/* Education */}
      {education && education.length > 0 && labels.sections.education && (
        <div className="mt-8">
          <h2 className="text-sm font-bold tracking-widest text-resume-text mb-4 pb-2 border-b border-resume-primary/20">
            {resolve(labels.sections.education)}
          </h2>
          <div className="space-y-4">
            {(visibleEducations ?? []).map((education) => (
              <EducationItem
                key={`${resolve(education.school)}-${resolve(education.degree)}-${education.period}`}
                school={resolve(education.school)}
                degree={resolve(education.degree)}
                degreeHref={education.degreeHref}
                href={education.href}
                specialty={education.specialty ? resolve(education.specialty) : undefined}
                period={education.period}
                logo={education.logo}
                techs={education.techs}
                maxTechs={limits?.educationTechs}
                showMoreLabel={showMoreLabel}
                showLessLabel={showLessLabel}
              />
            ))}
          </div>
          {limits?.education && education.length > limits.education && (
            <button
              onClick={() => setShowAllEducations(!showAllEducations)}
              className="mt-3 text-xs text-resume-primary hover:underline"
            >
              {showAllEducations
                ? showLessLabel
                : `+${education.length - limits.education} ${showMoreLabel}`}
            </button>
          )}
        </div>
      )}

      {/* Experiences */}
      <div className="relative mt-8">
        <h2 className="text-sm font-bold tracking-widest text-resume-text mb-6 pb-2 border-b border-resume-primary/20">
          {resolve(labels.sections.experience)}
        </h2>
        <div className="space-y-2">
          {visibleExperiences.map((exp) => (
            <ExperienceItem
              key={exp.id}
              year={resolve(exp.period)}
              company={resolve(exp.company)}
              type={exp.type ? resolve(exp.type) : undefined}
              workType={exp.workType}
              href={exp.href}
              role={resolve(exp.role)}
              description={resolve(exp.description)}
              techs={exp.techs}
              expanded={expandedExp === exp.id}
              onToggle={() => toggleExp(exp.id)}
              details={
                exp.details
                  ? {
                      context: resolve(exp.details.context),
                      tasks: exp.details.tasks ? resolveArray(exp.details.tasks) : undefined,
                      training: exp.details.training
                        ? resolveTrainingItems(exp.details.training, language, defaultLang)
                        : undefined,
                      env: exp.details.env ? resolve(exp.details.env) : undefined,
                    }
                  : undefined
              }
              subItem={
                exp.subItem
                  ? {
                      title: resolve(exp.subItem.title),
                      description: resolve(exp.subItem.description),
                    }
                  : undefined
              }
              labels={experienceLabels}
              isHighlighted={exp.isHighlighted}
              maxTasks={limits?.experienceTasks}
              maxTraining={limits?.experienceTraining}
              maxTechs={limits?.experienceTechs}
            />
          ))}
        </div>
        {limits?.experiences && experiences.length > limits.experiences && (
          <button
            onClick={() => setShowAllExp(!showAllExp)}
            className="mt-3 text-xs text-resume-primary hover:underline"
          >
            {showAllExp
              ? showLessLabel
              : `+${experiences.length - limits.experiences} ${showMoreLabel}`}
          </button>
        )}
      </div>

      {/* Projects */}
      {projects && projects.length > 0 && labels.sections.projects && (
        <div className="mt-8">
          <h2 className="text-sm font-bold tracking-widest text-resume-text mb-4 pb-2 border-b border-resume-primary/20">
            {resolve(labels.sections.projects)}
          </h2>
          <div className="space-y-1">
            {(visibleProjects ?? []).map((project) => (
              <ProjectItem
                key={project.id}
                title={resolve(project.title)}
                description={resolve(project.description)}
                techs={project.techs}
                maxTechs={limits?.projectsTech}
                url={project.url}
                github={project.github}
                showMoreLabel={showMoreLabel}
                showLessLabel={showLessLabel}
              />
            ))}
          </div>
          {limits?.projects && projects.length > limits.projects && (
            <button
              onClick={() => setShowAllProjects(!showAllProjects)}
              className="mt-3 text-xs text-resume-primary hover:underline"
            >
              {showAllProjects
                ? showLessLabel
                : `+${projects.length - limits.projects} ${showMoreLabel}`}
            </button>
          )}
        </div>
      )}
    </div>
  )
}
