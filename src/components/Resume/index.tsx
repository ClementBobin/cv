import { motion } from 'framer-motion'
import { useTranslation } from '@/lib/i18n'
import { resumeConfig } from '@/data/resume-config'
import type { ResumeConfig } from '@/data/types'
import { Sidebar } from './Sidebar'
import { MainContent } from './MainContent'
import { ThemeToggle } from './ThemeToggle'
import { LanguageToggle } from './LanguageToggle'
import { PdfDownload } from './PdfDownload'
import { fetchTechRegistry } from '@/data/tech-registry'

interface ResumeProps {
  config?: ResumeConfig
}

// Load registry once (e.g., on app startup)
await fetchTechRegistry()

export function Resume({ config = resumeConfig }: ResumeProps) {
  const { resolve } = useTranslation()

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      {/* Top bar: theme toggle + language + pdf */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <PdfDownload config={config} />
        </div>
        <div className="flex items-center gap-2">
          <LanguageToggle />
          <ThemeToggle label={resolve(config.labels.actions.switchTheme)} />
        </div>
      </div>

      {/* Resume card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-resume-bg-card rounded-lg shadow-2xl overflow-hidden dark:border dark:border-resume-primary/10"
      >
        <div className="flex flex-col-reverse md:flex-row">
          <Sidebar config={config} />
          <MainContent config={config} />
        </div>
      </motion.div>

      {/* Hint */}
      <p className="text-center text-sm text-resume-text-secondary mt-6">
        {resolve(config.labels.actions.clickHint)}
      </p>
    </div>
  )
}
