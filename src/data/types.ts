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

// ===== SKILLS =====

export interface SkillCategory {
  title: LocalizedString
  type: 'badges' | 'text' | 'languages'
  items: SkillItem[]
}

export interface SkillItem {
  name: string | LocalizedString
  color?: string
  level?: LocalizedString
  details?: string
}

// ===== EXPERIENCES =====

import type { TechName } from './tech-registry'

export interface Experience {
  id: string
  company: LocalizedString
  role: LocalizedString
  type?: LocalizedString
  period: LocalizedString
  description: LocalizedString
  techs: (TechName | (string & {}))[]
  isHighlighted?: boolean
  subItem?: {
    title: LocalizedString
    description: LocalizedString
  }
  details?: {
    context: LocalizedString
    tasks?: LocalizedStringArray
    training?: LocalizedStringArray
    env: LocalizedString
  }
}

// ===== PROJECTS =====

export interface Project {
  id: string
  title: LocalizedString
  description: LocalizedString
  techs: (TechName | (string & {}))[]
  url?: string
  github?: string
}

// ===== EDUCATION =====

export interface Education {
  school: LocalizedString
  degree: LocalizedString
  specialty?: LocalizedString
  period?: string
  logo?: string
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

// ===== LABELS =====

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
    training?: LocalizedString
    techEnv: LocalizedString
    technologies: LocalizedString
  }
  actions: {
    clickHint: LocalizedString
    switchTheme: LocalizedString
    downloadPdf?: LocalizedString
  }
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
  labels: ResumeLabels
}
