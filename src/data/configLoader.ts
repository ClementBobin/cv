import { resumeConfig as defaultConfig } from './resume-config'
import { decodeUrl } from '@/lib/urlEncoder'
import type { ResumeConfig } from './types'

/**
 * Loads resume configuration from URL parameter or uses default config
 */
export async function loadResumeConfig(): Promise<ResumeConfig> {
  // Check if there's a config parameter in the URL
  const params = new URLSearchParams(window.location.search)
  const encodedUrl = params.get('config')

  if (!encodedUrl) {
    // No parameter, use default config
    return defaultConfig
  }

  try {
    // Decode the URL
    const configUrl = decodeUrl(encodedUrl)
    
    if (!configUrl) {
      console.error('Failed to decode config URL')
      return defaultConfig
    }

    // Fetch the external config
    const response = await fetch(configUrl)
    
    if (!response.ok) {
      throw new Error(`Failed to fetch config: ${response.status} ${response.statusText}`)
    }

    const externalConfig = await response.json() as ResumeConfig
    
    // Validate that it has the required structure
    if (!externalConfig.personal || !externalConfig.languages || !externalConfig.labels) {
      throw new Error('Invalid config structure: missing required fields')
    }

    // Validate nested required fields
    if (!externalConfig.personal.name || !externalConfig.personal.title) {
      throw new Error('Invalid config structure: missing personal.name or personal.title')
    }

    if (!externalConfig.languages.default || !externalConfig.languages.available) {
      throw new Error('Invalid config structure: missing language configuration')
    }

    return externalConfig
  } catch (error) {
    console.error('Error loading external config:', error)
    // Fall back to default config on error
    return defaultConfig
  }
}
