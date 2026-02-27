import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from '@/lib/i18n'
import { useTheme } from '@/lib/theme'
import { resumeConfig } from '@/data/resume-config'
import type { ResumeConfig } from '@/data/types'
import { Sidebar } from './Sidebar'
import { MainContent } from './MainContent'
import { ThemeToggle } from './ThemeToggle'
import { LanguageToggle } from './LanguageToggle'
import { PdfDownload } from './PdfDownload'
import { PdfPrintDialog } from './PdfPrintDialog'
import { fetchTechRegistry } from '@/data/tech-registry'

interface ResumeProps {
  config?: ResumeConfig
}

export function Resume({ config = resumeConfig }: ResumeProps) {
  const { resolve } = useTranslation()
  const { isDark } = useTheme()
  const [loaded, setLoaded] = useState(false)
  const [isPrintDialogOpen, setIsPrintDialogOpen] = useState(false)
  const [printAll, setPrintAll] = useState(false)

    useEffect(() => {
    async function loadRegistry() {
      try {
        await fetchTechRegistry()
      } catch (err) {
        console.error('Failed to load tech registry:', err)
      }
      finally {
        setLoaded(true)
      }
    }
    loadRegistry()
  }, [])

  const handleGeneratePdf = (options: { darkMode: boolean; showAll: boolean }) => {
    setIsPrintDialogOpen(false)

    const root = document.documentElement
    const wasDark = root.classList.contains('dark')

    // Apply chosen theme
    root.classList.toggle('dark', options.darkMode)

    // Expand all content if requested
    setPrintAll(options.showAll)

    // Wait for React to re-render before opening the print dialog
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const afterPrint = () => {
          // Restore original theme and content state
          root.classList.toggle('dark', wasDark)
          setPrintAll(false)
          window.removeEventListener('afterprint', afterPrint)
        }
        window.addEventListener('afterprint', afterPrint)
        window.print()
      })
    })
  }

  if (!loaded) return <div>Loading resume…</div>
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      {/* Top bar: theme toggle + language + pdf */}
      <div className="flex items-center justify-between mb-4 no-print">
        <div className="flex items-center gap-2">
          <PdfDownload config={config} onGeneratePdf={() => setIsPrintDialogOpen(true)} />
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
          <Sidebar config={config} printAll={printAll} />
          <MainContent config={config} printAll={printAll} />
        </div>
      </motion.div>

      {/* Hint */}
      <p className="text-center text-sm text-resume-text-secondary mt-6 no-print">
        {resolve(config.labels.actions.clickHint)}
      </p>

      {isPrintDialogOpen && (
        <PdfPrintDialog
          isOpen={isPrintDialogOpen}
          onClose={() => setIsPrintDialogOpen(false)}
          isDark={isDark}
          onGenerate={handleGeneratePdf}
        />
      )}
    </div>
  )
}
