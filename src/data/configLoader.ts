import { resumeConfig as defaultConfig } from './resume-config'
import { decodeUrl } from '@/lib/urlEncoder'
import { loadTechRegistry } from './techRegistryLoader'
import type { ResumeConfig } from './types'

/**
 * Loads resume configuration from URL parameter or uses default config
 * Also loads custom tech registry if provided
 * Supports two modes:
 * 1. config parameter: URL to fetch JSON config
 * 2. configData parameter: base64-encoded JSON config data directly
 */
export async function loadResumeConfig(): Promise<ResumeConfig> {
  // Load tech registry first (if provided)
  await loadTechRegistry()

  // Check URL parameters
  const params = new URLSearchParams(window.location.search)
  const encodedUrl = params.get('config')
  const encodedData = params.get('configData')

  // If configData parameter exists, use it directly (form mode)
  if (encodedData) {
    try {
      const configJson = decodeURIComponent(atob(encodedData))
      const externalConfig = JSON.parse(configJson) as ResumeConfig
      
      // Validate structure
      if (!externalConfig.personal || !externalConfig.languages || !externalConfig.labels) {
        throw new Error('Invalid config structure: missing required fields')
      }

      if (!externalConfig.personal.name || !externalConfig.personal.title) {
        throw new Error('Invalid config structure: missing personal.name or personal.title')
      }

      if (!externalConfig.languages.default || !externalConfig.languages.available) {
        throw new Error('Invalid config structure: missing language configuration')
      }

      return externalConfig
    } catch (error) {
      console.error('Error loading config from data:', error)
      return defaultConfig
    }
  }

  // If config parameter exists, fetch from URL (URL mode)
  if (encodedUrl) {
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

  // No parameters, use default config
  return defaultConfig
}
