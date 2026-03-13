import { lazy, Suspense, useEffect, useState } from 'react'
import { LanguageProvider } from '@/lib/i18n'
import { ThemeProvider } from '@/lib/theme'
import { Resume } from '@/components/Resume'
import { loadResumeConfig } from '@/data/configLoader'
import type { ResumeConfig } from '@/data/types'
import { ThemeVarsInjector, PresetSelector } from '@/components/PresetSelector'

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

export default function App() {
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
        </div>
      </div>
    )
  }

  return (
    <ThemeProvider resumeConfig={config}>
      <LanguageProvider resumeConfig={config}>
        <SeoHead config={config} />
        <ThemeVarsInjector>
          <PresetSelector />
          <Resume config={config} />
        </ThemeVarsInjector>
      </LanguageProvider>
      {import.meta.env.DEV && (
        <>
          <Suspense>
            <Agentation />
          </Suspense>
        </>
      )}
    </ThemeProvider>
  )
}
