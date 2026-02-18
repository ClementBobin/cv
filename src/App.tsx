import { lazy, Suspense, useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { LanguageProvider } from '@/lib/i18n'
import { ThemeProvider, useTheme } from '@/lib/theme'
import { Resume } from '@/components/Resume'
import { GenerateForm } from '@/components/GenerateForm'
import { Hero } from '@/components/Hero'
import { NotFound } from '@/components/NotFound'
import { loadResumeConfig } from '@/data/configLoader'
import { presets } from '@/data/presets'
import type { PresetName } from '@/data/types'
import type { ResumeConfig } from '@/data/types'

const Agentation = lazy(() =>
  import('agentation').then((m) => ({ default: m.Agentation }))
)

/**
 * Sets document title and meta description at runtime.
 * JSON-LD structured data and noscript fallback are injected at build time
 * by the vite-plugin-resume-seo plugin.
 */
function SeoHead({ config }: { config: ResumeConfig }) {
  useEffect(() => {
    const { title, description } = config.seo
    document.title = title
    document.querySelector('meta[name="description"]')?.setAttribute('content', description)
  }, [config])
  return null
}

function ThemeVarsInjector({ children }: { children: React.ReactNode }) {
  const { colors } = useTheme()

  return (
    <>
      <style>{`
        :root {
          --resume-bg: ${colors.bg};
          --resume-bg-card: ${colors.bgCard};
          --resume-text: ${colors.text};
          --resume-text-secondary: ${colors.textSecondary};
          --resume-primary: ${colors.primary};
          --resume-primary-light: ${colors.primaryLight};
          --resume-sidebar-from: ${colors.sidebarLight};
          --resume-sidebar-to: ${colors.sidebarLightEnd};
        }
        .dark {
          --resume-bg: ${colors.bgDark};
          --resume-bg-card: ${colors.bgCardDark};
          --resume-text: ${colors.textDark};
          --resume-text-secondary: ${colors.textSecondaryDark};
          --resume-primary: ${colors.primaryDark};
          --resume-primary-light: ${colors.primaryLightDark};
          --resume-sidebar-from: ${colors.sidebarDark};
          --resume-sidebar-to: ${colors.sidebarDarkEnd};
        }
      `}</style>
      {children}
    </>
  )
}

function DevPresetSelector() {
  const { preset, setPreset } = useTheme()
  const presetNames = Object.keys(presets) as PresetName[]

  return (
    <div className="fixed top-4 left-4 z-50 hidden md:block">
      <select
        value={preset}
        onChange={(e) => setPreset(e.target.value as PresetName)}
        className="px-2 py-1 text-xs rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm cursor-pointer"
      >
        {presetNames.map((name) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>
    </div>
  )
}

function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-resume-bg">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-resume-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-resume-text-secondary">Loading resume...</p>
      </div>
    </div>
  )
}

function ResumeRoute() {
  const [config, setConfig] = useState<ResumeConfig | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadResumeConfig()
      .then((loadedConfig) => {
        setConfig(loadedConfig)
        setLoading(false)
      })
      .catch((err) => {
        console.error('Failed to load config:', err)
        setError('Failed to load resume configuration')
        setLoading(false)
      })
  }, [])

  if (loading) {
    return <LoadingSpinner />
  }

  if (error || !config) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-resume-bg p-4">
        <div className="max-w-md text-center">
          <h1 className="text-2xl font-bold text-resume-text mb-4">Error Loading Resume</h1>
          <p className="text-resume-text-secondary mb-4">{error || 'Configuration not found'}</p>
          <Link
            to="/generate"
            className="inline-block px-4 py-2 bg-resume-primary text-white rounded hover:bg-resume-primary/80 transition-colors"
          >
            Generate New Link
          </Link>
        </div>
      </div>
    )
  }

  return (
    <>
      <SeoHead config={config} />
      <ThemeVarsInjector>
        <Resume config={config} />
      </ThemeVarsInjector>
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter basename="/cv">
      <ThemeProvider>
        <LanguageProvider>
          <Routes>
            <Route path="/view" element={<ResumeRoute />} />
            <Route path="/generate" element={<GenerateForm />} />
            <Route path="/" element={<Hero />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </LanguageProvider>
        {import.meta.env.DEV && (
          <>
            <DevPresetSelector />
            <Suspense>
              <Agentation />
            </Suspense>
          </>
        )}
      </ThemeProvider>
    </BrowserRouter>
  )
}
