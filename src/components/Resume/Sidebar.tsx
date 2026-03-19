import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from '@/lib/i18n'
import type { ResumeConfig, SkillItem, Hobby } from '@/data/types'
import { assetUrl } from '@/lib/utils'
import { SidebarSection } from './SidebarSection'
import { ContactItem } from './ContactItem'
import { SkillCategory } from './SkillCategory'
import { TechBadge } from './TechBadge'
import * as LucideIcons from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

const PHOTO_ANIMATION_DURATION = 0.8

function SidebarPhoto({ photo, name, emoji }: { photo: string; name: string; emoji?: string }) {
  const [isSpinning, setIsSpinning] = useState(false)
  const [hasError, setHasError] = useState(false)

  const handleFlip = () => {
    if (isSpinning) return
    setIsSpinning(true)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleFlip()
    }
  }

  if (hasError) {
    return (
      <div className="flex justify-center mb-6">
        <div className="w-32 h-32 rounded-full bg-linear-to-br from-resume-primary to-resume-primary-light flex items-center justify-center border-4 border-resume-bg/30 shadow-lg">
          <span className="text-4xl">{emoji || '👨‍💻'}</span>
        </div>
      </div>
    )
  }

  return (
    <div className="flex justify-center mb-6" style={{ perspective: '300px' }}>
      <motion.div
        onClick={handleFlip}
        onKeyDown={handleKeyDown}
        onAnimationComplete={() => setIsSpinning(false)}
        animate={{ rotateY: isSpinning ? 360 : 0 }}
        transition={{ duration: PHOTO_ANIMATION_DURATION, ease: 'easeInOut' }}
        className="relative w-32 h-32 cursor-pointer"
        style={{ transformStyle: 'preserve-3d' }}
        role="button"
        tabIndex={0}
        aria-label={`Photo de ${name} — cliquer pour retourner`}
      >
        <div
          className="absolute inset-0 rounded-full overflow-hidden border-4 border-resume-bg/30 shadow-lg"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <img
            src={photo}
            alt={`Photo de profil de ${name}`}
            className="object-cover w-full h-full"
            loading="lazy"
            onError={() => setHasError(true)}
          />
        </div>
        <div
          className="absolute inset-0 rounded-full border-4 border-resume-bg/30 shadow-lg bg-linear-to-br from-resume-primary to-resume-primary-light flex items-center justify-center"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <span className="text-4xl">{emoji || '👨‍💻'}</span>
        </div>
      </motion.div>
    </div>
  )
}

interface SidebarProps {
  config: ResumeConfig
}

export function Sidebar({ config }: SidebarProps) {
  const { resolve } = useTranslation()
  const { personal, contact, skills, softSkills, hobbies, labels, limits } = config

  const [showAllContact, setShowAllContact] = useState(false)
  const [showAllSkills, setShowAllSkills] = useState(false)
  const [showAllHobbies, setShowAllHobbies] = useState(false)
  const [showAllSoftSkills, setShowAllSoftSkills] = useState(false)

  const showMoreLabel = labels.actions.showMore ? resolve(labels.actions.showMore) : 'Voir plus'
  const showLessLabel = labels.actions.showLess ? resolve(labels.actions.showLess) : 'Voir moins'

  const visibleContact =
    limits?.contact && !showAllContact ? contact.slice(0, limits.contact) : contact
  const visibleSkills =
    limits?.skills && !showAllSkills ? skills.slice(0, limits.skills) : skills

  return (
    <div className="md:w-[38%] bg-linear-to-b from-resume-sidebar-from to-resume-sidebar-to p-8">
      {/* Photo */}
      {personal.photo && (
        <SidebarPhoto
          photo={assetUrl(personal.photo)}
          name={personal.name}
          emoji={personal.photoBackEmoji}
        />
      )}
      {personal.summary && (
        <p className="text-sm mb-6 text-resume-text-secondary">{resolve(personal.summary)}</p>
      )}

      {/* Contact */}
      <SidebarSection title={resolve(labels.sections.contact)}>
        <div className="space-y-3">
          {visibleContact.map((item) => (
            <ContactItem
              key={`${item.type}-${item.label}`}
              type={item.type}
              label={item.label}
              href={item.href}
            />
          ))}
          {limits?.contact && contact.length > limits.contact && (
            <button
              onClick={() => setShowAllContact(!showAllContact)}
              className="text-xs text-resume-primary hover:underline"
            >
              {showAllContact
                ? showLessLabel
                : `+${contact.length - limits.contact} ${showMoreLabel}`}
            </button>
          )}
        </div>
      </SidebarSection>

      {/* Skills */}
      <SidebarSection title={resolve(labels.sections.skills)}>
        <div className="space-y-4">
          {visibleSkills.map((category, i) => {
            const maxItems = limits?.skillItems
            return (
              <SkillCategoryWithLimit
                key={`${resolve(category.title)}-${i}`}
                category={category}
                resolve={resolve}
                maxItems={maxItems}
                showMoreLabel={showMoreLabel}
                showLessLabel={showLessLabel}
              />
            )
          })}
          {limits?.skills && skills.length > limits.skills && (
            <button
              onClick={() => setShowAllSkills(!showAllSkills)}
              className="text-xs text-resume-primary hover:underline"
            >
              {showAllSkills
                ? showLessLabel
                : `+${skills.length - limits.skills} ${showMoreLabel}`}
            </button>
          )}
        </div>
      </SidebarSection>

      {/* Hobbies */}
      {hobbies && hobbies.length > 0 && labels.sections.hobbies && (
        <SidebarSection title={resolve(labels.sections.hobbies)}>
          <div className="flex flex-col gap-2">
            {(hobbies ?? [])
              .slice(0, limits?.hobbies && !showAllHobbies ? limits.hobbies : undefined)
              .map((hobby, i) => (
                <HobbyWithLimit
                  key={i}
                  hobby={hobby}
                  resolve={resolve}
                />
              ))}
          </div>

          {limits?.hobbies && hobbies.length > limits.hobbies && (
            <button
              onClick={() => setShowAllHobbies(!showAllHobbies)}
              className="mt-2 text-xs text-resume-primary hover:underline"
            >
              {showAllHobbies
                ? showLessLabel
                : `+${hobbies.length - limits.hobbies} ${showMoreLabel}`}
            </button>
          )}
        </SidebarSection>
      )}

      {/* Soft Skills */}
      {softSkills && softSkills.length > 0 && labels.sections.softSkills && (
        <SidebarSection title={resolve(labels.sections.softSkills)}>
          <div className="flex flex-col gap-2">
            {(softSkills ?? [])
              .slice(0, limits?.softSkills && !showAllSoftSkills ? limits.softSkills : undefined)
              .map((softSkill, i) => (
                <HobbyWithLimit
                  key={i}
                  hobby={softSkill}
                  resolve={resolve}
                />
              ))}
          </div>

          {limits?.softSkills && softSkills.length > limits.softSkills && (
            <button
              onClick={() => setShowAllSoftSkills(!showAllSoftSkills)}
              className="mt-2 text-xs text-resume-primary hover:underline"
            >
              {showAllSoftSkills
                ? showLessLabel
                : `+${softSkills.length - limits.softSkills} ${showMoreLabel}`}
            </button>
          )}
        </SidebarSection>
      )}
    </div>
  )
}

/** Display a hobby with optional detail limit */
function HobbyWithLimit({
  hobby,
  resolve
}: {
  hobby: Hobby
  resolve: (ls: Record<string, string>) => string
}) {
  const title = hobby.title

  const IconComponent = hobby.icon && (LucideIcons as unknown as Record<string, LucideIcon>)[hobby.icon]

  if (IconComponent) {
    return (
      <div className="flex flex-col gap-1">
        <div className="flex items-start gap-2">
          <IconComponent className="w-4 h-4 text-resume-primary shrink-0 mt-[2px]" />

          <span className="text-resume-primary text-xs">
            {typeof title === "string" ? title : resolve(title)}
          </span>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-1">
      <span className="text-resume-primary text-xs">
        {typeof title === "string" ? title : resolve(title)}
      </span>
    </div>
  )
}

/** Display skill category with optional limit */
function SkillCategoryWithLimit({
  category,
  resolve,
  maxItems,
  showMoreLabel,
  showLessLabel,
}: {
  category: ResumeConfig['skills'][number]
  resolve: (ls: Record<string, string>) => string
  maxItems?: number
  showMoreLabel: string
  showLessLabel: string
}) {
  const [expanded, setExpanded] = useState(false)
  const items = category.items.map(item => {
    const skill: SkillItem = typeof item === 'string' ? { name: item } : item
    return {
      ...skill,
      name: typeof skill.name === 'string' ? skill.name : skill.name.en,
    }
  })
  const visibleItems = maxItems && !expanded ? items.slice(0, maxItems) : items

  return (
    <SkillCategory title={resolve(category.title)}>
      {category.type === 'badges' && (
        <div className="flex flex-wrap gap-1.5">
          {visibleItems.map((item, idx) => (
            <TechBadge key={idx} tech={item} />
          ))}
          {maxItems && items.length > maxItems && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-xs text-resume-primary hover:underline self-center"
            >
              {expanded
                ? showLessLabel
                : `+${items.length - maxItems} ${showMoreLabel}`}
            </button>
          )}
        </div>
      )}
      {category.type === 'text' && (
        <p className="text-xs text-resume-text-secondary">
          {visibleItems
            .map(item => (typeof item.name === 'string' ? item.name : resolve(item.name)))
            .join(', ')}
          {maxItems && items.length > maxItems && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-xs text-resume-primary hover:underline ml-1"
            >
              {expanded ? showLessLabel : `+${items.length - maxItems} ${showMoreLabel}`}
            </button>
          )}
        </p>
      )}
      {category.type === 'languages' && (
        <div className="flex items-center gap-3 text-sm flex-wrap">
          {visibleItems.map((item, j) => {
            const name = typeof item.name === 'string' ? item.name : resolve(item.name)
            const content = (
              <span className="text-resume-text-secondary">
                {name} {item.level ? resolve(item.level) : ''}
                {item.details && <span className="text-xs opacity-70 ml-1">{item.details}</span>}
              </span>
            )
            return item.href ? (
              <a
                key={j}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-resume-primary transition-colors"
              >
                {content}
              </a>
            ) : (
              <span key={j} className="flex items-center gap-1">
                {content}
              </span>
            )
          })}
          {maxItems && items.length > maxItems && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-xs text-resume-primary hover:underline"
            >
              {expanded ? showLessLabel : `+${items.length - maxItems} ${showMoreLabel}`}
            </button>
          )}
        </div>
      )}
    </SkillCategory>
  )
}
