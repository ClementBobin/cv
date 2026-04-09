
import { fetchTechRegistry } from './tech-registry'
import type { ResumeConfig } from './types'

/* ---------------------------------------------
 * Custom error for config validation
 * --------------------------------------------- */
class ResumeConfigError extends Error {
  public readonly source: 'data' | 'url' | 'unknown'

  constructor(message: string, source: 'data' | 'url' | 'unknown') {
    super(message)
    this.name = 'ResumeConfigError'
    this.source = source
  }
}

/* ---------------------------------------------
 * Main loader
 * --------------------------------------------- */
export async function loadResumeConfig(): Promise<ResumeConfig> {
  await fetchTechRegistry()

  try {
    const configUrl = import.meta.env.VITE_RESSOURCES_URL
    if (!configUrl) throw new ResumeConfigError('Decoded config URL is empty', 'url')

    const response = await fetch(`${configUrl}/cv`)
    if (!response.ok) {
      throw new ResumeConfigError(`HTTP ${response.status} – ${response.statusText}`, 'url')
    }

    const parsed = await response.json() as ResumeConfig

    const params = new URLSearchParams(window.location.search)
    const email = params.get('email')
    const phone = params.get('phone')

    const injected = [
      ...(email ? [{ type: 'email' as const, label: email }] : []),
      ...(phone ? [{ type: 'phone' as const, label: phone }] : []),
    ]

    parsed.contact = [...injected, ...parsed.contact]

    return parsed
  } catch (error) {
    throw new ResumeConfigError(`Failed to load resume configuration: ${error}`, 'url')
  }
}