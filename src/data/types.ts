import type { TechName } from './tech-registry'

// ===== LOCALIZATION =====

export type LocalizedString = Record<string, string>

export type LocalizedStringArray = Record<string, string[]>

// ===== CONTACT =====

export type ContactType = 'email' | 'phone' | 'location' | 'github' | 'linkedin' | 'website'

export interface ContactItem {
  type: ContactType
  label: string
  href?: string
}

// ===== TECH BADGE =====

/** Allows a tech badge to carry an optional link and tooltip (e.g. when name is an icon identifier). */
export interface TechBadgeItem {
  name: string
  /** Plain-string tooltip. Used as display text and color-registry key when set. */
  tooltip?: string
  href?: string
}

/** A tech entry can be a plain string/tech-name, or a full object with optional href/tooltip. */
export type TechEntry = TechName | (string & {}) | TechBadgeItem

/** Returns true when a TechEntry is the object form. */
export function isTechBadgeItem(t: TechEntry): t is TechBadgeItem {
  return typeof t === 'object' && t !== null && 'name' in t
}

// ===== SKILLS =====

export interface SkillCategory {
  title: LocalizedString
  type: 'badges' | 'text' | 'languages'
  /**
   * Each item can be a plain tech-name string (e.g. `'Docker'`) or a full SkillItem object.
   * Plain strings are treated as `{ name: 'Docker' }`.
   */
  items: (string | SkillItem)[]
}

export interface SkillItem {
  name: string | LocalizedString
  href?: string
  tooltip?: string
  level?: LocalizedString
  details?: string
}

// ===== TRAINING =====

/** A training item can be a plain string or an object with optional href. */
export type TrainingItem = string | { text: string; href?: string }

/** Localized array of training items (replaces LocalizedStringArray for training). */
export type LocalizedTrainingArray = Record<string, TrainingItem[]>

// ===== EXPERIENCES =====

export interface Experience {
  id: string
  company: LocalizedString
  role: LocalizedString
  type?: LocalizedString
  /**
   * Category of the experience.
   * - `'work'` → professional employment (badge rendered in blue)
   * - `'experience'` → other experience, e.g. forum, association … (badge rendered in violet)
   * Defaults to `'work'` when omitted.
   */
  workType?: 'work' | 'experience'
  /** Optional URL – clicking the experience header opens this link in a new tab. */
  href?: string
  period: LocalizedString
  description: LocalizedString
  techs: TechEntry[]
  isHighlighted?: boolean
  subItem?: {
    title: LocalizedString
    description: LocalizedString
  }
  details?: {
    context: LocalizedString
    tasks?: LocalizedStringArray
    training?: LocalizedTrainingArray
    env?: LocalizedString
  }
}

// ===== PROJECTS =====

export interface Project {
  id: string
  title: LocalizedString
  description: LocalizedString
  techs: TechEntry[]
  url?: string
  github?: string
}

// ===== EDUCATION =====

export interface Education {
  school: LocalizedString
  degree: LocalizedString
  /** Optional URL for the degree itself (opens in new tab when clicked). */
  degreeHref?: string
  /** Optional URL – clicking the education item opens this link in a new tab. */
  href?: string
  specialty?: LocalizedString
  period?: string
  logo?: string
  techs?: TechEntry[]
}

// ===== HOBBIES =====

export interface Hobby {
  title: LocalizedString
  details?: LocalizedString[]
}

// ===== THEME =====

export interface ThemeColors {
  bg: string
  bgCard: string
  text: string
  textSecondary: string
  bgDark: string
  bgCardDark: string
  textDark: string
  textSecondaryDark: string
  primary: string
  primaryLight: string
  primaryDark: string
  primaryLightDark: string
  sidebarLight: string
  sidebarLightEnd: string
  sidebarDark: string
  sidebarDarkEnd: string
}

export type PresetName = 'minimal' | 'warm' | 'ocean' | 'forest' | 'slate' | 'lilac'

// ===== LIMITS =====

/** Optional per-section display limits. When absent the section shows all items. */
export interface ResumeLimits {
  /** Max number of experiences to show initially. */
  experiences?: number
  /** Max number of tasks to show per experience (in expanded details). */
  experienceTasks?: number
  /** Max number of training items to show per experience (in expanded details). */
  experienceTraining?: number
  /** Max number of tech badges to show per experience (in the experience card body). */
  experienceTechs?: number
  /** Max number of projects to show initially. */
  projects?: number
  /** Max number of tech badges to show per projects entry. */
  projectsTech?: number
  /** Max number of experience to show initially */
  education?: number
  /** Max number of tech badges to show per education entry. */
  educationTechs?: number
  /** Max number of hobbies to show initially. */
  hobbies?: number
  /** Max number of skill categories to show initially. */
  skills?: number
  /** Max number of items per skill category to show initially. */
  skillItems?: number
  /** Max number of contact items to show initially. */
  contact?: number
}

// ===== LABELS (CV only) =====

export interface ResumeLabels {
  sections: {
    contact: LocalizedString
    skills: LocalizedString
    experience: LocalizedString
    education: LocalizedString
    projects?: LocalizedString
    hobbies?: LocalizedString
  }
  experience: {
    mainTasks: LocalizedString
    moreTasks: LocalizedString
    moreTraining?: LocalizedString
    training?: LocalizedString
    techEnv: LocalizedString
    technologies: LocalizedString
  }
  actions: {
    clickHint: LocalizedString
    switchTheme: LocalizedString
    downloadPdf?: LocalizedString
    showMore?: LocalizedString
    showLess?: LocalizedString
  }
}

// ===== APP LABELS (non-CV pages) =====

export interface AppLabels {
  hero?: {
    badge: LocalizedString
    title: LocalizedString
    subtitle: LocalizedString
    description: LocalizedString
    getStarted: LocalizedString
    viewDemo: LocalizedString
    features: {
      themes: LocalizedString
      multilang: LocalizedString
      privacy: LocalizedString
      fast: LocalizedString
      customTech: LocalizedString
      mobile: LocalizedString
    }
    whyChoose: LocalizedString
    whyDescription: LocalizedString
    featureCards: {
      customizable: {
        title: LocalizedString
        description: LocalizedString
      }
      privacy: {
        title: LocalizedString
        description: LocalizedString
      }
      devFriendly: {
        title: LocalizedString
        description: LocalizedString
      }
    }
    ctaTitle: LocalizedString
    ctaDescription: LocalizedString
    ctaButton: LocalizedString
  }
  generateLink?: {
    title: LocalizedString
    description: LocalizedString
    configUrlLabel: LocalizedString
    configUrlRequired: LocalizedString
    techRegistryLabel: LocalizedString
    techRegistryOptional: LocalizedString
    techRegistryNote: LocalizedString
    generateButton: LocalizedString
    generatedLinkLabel: LocalizedString
    copyButton: LocalizedString
    copiedButton: LocalizedString
    backToResume: LocalizedString
    jsonExamples: LocalizedString
    resumeConfigExample: LocalizedString
    resumeConfigDescription: LocalizedString
    techRegistryExample: LocalizedString
    techRegistryDescription: LocalizedString
    copyJson: LocalizedString
    alertConfigRequired: LocalizedString
    alertInvalidUrl: LocalizedString
    alertCopyFailed: LocalizedString
    alertJsonCopied: LocalizedString
  }
  notFound?: {
    title: LocalizedString
    subtitle: LocalizedString
    description: LocalizedString
    goHome: LocalizedString
    viewResume: LocalizedString
    lookingFor: LocalizedString
    generateLink: LocalizedString
    github: LocalizedString
    documentation: LocalizedString
    proTip: LocalizedString
    proTipText: LocalizedString
  }
}

// ===== MAIN CONFIG =====

export interface ResumeConfig {
  personal: {
    name: string
    photo?: string
    photoBackEmoji?: string
    title: LocalizedString
    subtitle?: LocalizedString
    location?: string
  }
  seo: {
    title: string
    description: string
  }
  languages: {
    default: string
    available: string[]
    labels: Record<string, string>
  }
  contact: ContactItem[]
  skills: SkillCategory[]
  experiences: Experience[]
  education: Education[]
  projects?: Project[]
  hobbies?: Hobby[]
  pdf?: {
    label?: LocalizedString
    /** Single path for all languages, or one path per language (hides button if no PDF for current language) */
    path: string | LocalizedString
  }
  theme?: {
    preset?: PresetName
    colors?: Partial<ThemeColors>
    defaultMode?: 'light' | 'dark' | 'system'
  }
  /** Optional per-section display limits with show-more/show-less buttons. */
  limits?: ResumeLimits
  labels: ResumeLabels
}
