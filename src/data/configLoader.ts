import { resumeConfig as defaultConfig } from './resume-config'
import { decodeUrl } from '@/lib/urlEncoder'
import { decodeAndDecompress } from '@/lib/compression'
import { loadTechRegistry } from './techRegistryLoader'
import type { ResumeConfig } from './types'

/* ---------------------------------------------
 * Custom error for config validation
 * --------------------------------------------- */
class ResumeConfigError extends Error {
  constructor(
    message: string,
    public readonly source: 'configData' | 'configUrl' | 'unknown'
  ) {
    super(message)
    this.name = 'ResumeConfigError'
  }
}

/* ---------------------------------------------
 * Runtime validation
 * --------------------------------------------- */
function validateResumeConfig(
  config: unknown,
  source: ResumeConfigError['source']
): ResumeConfig {
  if (!config || typeof config !== 'object') {
    throw new ResumeConfigError('Config is not a valid object', source)
  }

  const c = config as Partial<ResumeConfig>

  if (!c.personal) {
    throw new ResumeConfigError('Missing "personal" section', source)
  }

  if (!c.languages) {
    throw new ResumeConfigError('Missing "languages" section', source)
  }

  if (!c.labels) {
    throw new ResumeConfigError('Missing "labels" section', source)
  }

  if (!c.personal.name) {
    throw new ResumeConfigError('Missing "personal.name"', source)
  }

  if (!c.personal.title) {
    throw new ResumeConfigError('Missing "personal.title"', source)
  }

  if (!c.languages.default) {
    throw new ResumeConfigError('Missing "languages.default"', source)
  }

  if (!Array.isArray(c.languages.available)) {
    throw new ResumeConfigError(
      '"languages.available" must be an array',
      source
    )
  }

  return c as ResumeConfig
}

/* ---------------------------------------------
 * Main loader
 * --------------------------------------------- */
export async function loadResumeConfig(): Promise<ResumeConfig> {
  await loadTechRegistry()

  const params = new URLSearchParams(window.location.search)
  const encodedUrl = params.get('config')
  const encodedData = params.get('configData')

  /* ---------- CONFIG DATA MODE ---------- */
  if (encodedData) {
    try {
      let configJson: string

      try {
        configJson = decodeAndDecompress(encodedData)
      } catch {
        console.warn('[resume-config] Falling back to uncompressed decoding')
        configJson = decodeURIComponent(atob(encodedData))
      }

      const parsed = JSON.parse(configJson)
      return validateResumeConfig(parsed, 'configData')
    } catch (error) {
      logConfigError(error, 'configData')
      return defaultConfig
    }
  }

  /* ---------- CONFIG URL MODE ---------- */
  if (encodedUrl) {
    try {
      const configUrl = decodeUrl(encodedUrl)

      if (!configUrl) {
        throw new ResumeConfigError('Decoded config URL is empty', 'configUrl')
      }

      const response = await fetch(configUrl)

      if (!response.ok) {
        throw new ResumeConfigError(
          `HTTP ${response.status} – ${response.statusText}`,
          'configUrl'
        )
      }

      const parsed = await response.json()
      return validateResumeConfig(parsed, 'configUrl')
    } catch (error) {
      logConfigError(error, 'configUrl')
      return defaultConfig
    }
  }

  /* ---------- DEFAULT ---------- */
  return defaultConfig
}

/* ---------------------------------------------
 * Centralized logging
 * --------------------------------------------- */
function logConfigError(
  error: unknown,
  source: ResumeConfigError['source']
) {
  if (error instanceof ResumeConfigError) {
    console.error(
      `[resume-config:${source}] ${error.message}`
    )
  } else if (error instanceof Error) {
    console.error(
      `[resume-config:${source}] Unexpected error:`,
      error.message,
      error
    )
  } else {
    console.error(
      `[resume-config:${source}] Unknown error`,
      error
    )
  }
}
