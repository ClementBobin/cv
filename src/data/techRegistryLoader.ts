import { getTechColor as getDefaultTechColor } from './tech-registry'
import { decodeUrl } from '@/lib/urlEncoder'
import { decodeAndDecompress } from '@/lib/compression'

// Cache for loaded tech registry
let cachedTechRegistry: Record<string, { color: string }> | null = null

/**
 * Loads tech registry from URL parameter or uses default registry
 * Supports two modes:
 * 1. tech-registry parameter: URL to fetch JSON registry
 * 2. techData parameter: base64-encoded JSON registry data directly
 */
export async function loadTechRegistry(): Promise<void> {
  // Check URL parameters
  const params = new URLSearchParams(window.location.search)
  const encodedUrl = params.get('tech-registry')
  const encodedData = params.get('techData')

  // If techData parameter exists, use it directly (form mode with compression)
  if (encodedData) {
    try {
      // Try to decompress (new format with compression)
      let registryJson: string
      try {
        registryJson = decodeAndDecompress(encodedData)
      } catch {
        // Fallback to old uncompressed format for backwards compatibility
        console.log('Attempting to decode tech data as uncompressed...')
        registryJson = decodeURIComponent(atob(encodedData))
      }
      
      const externalRegistry = JSON.parse(registryJson) as Record<string, { color: string }>
      
      // Validate structure
      if (typeof externalRegistry !== 'object' || externalRegistry === null) {
        throw new Error('Invalid tech-registry structure: must be an object')
      }

      // Validate that values have color property
      for (const [key, value] of Object.entries(externalRegistry)) {
        if (!value.color || typeof value.color !== 'string') {
          console.warn(`Invalid tech-registry entry for "${key}": missing or invalid color`)
        }
      }

      cachedTechRegistry = externalRegistry
      return
    } catch (error) {
      console.error('Error loading tech-registry from data:', error)
      cachedTechRegistry = null
      return
    }
  }

  // If tech-registry parameter exists, fetch from URL (URL mode)
  if (encodedUrl) {
    try {
      // Decode the URL
      const registryUrl = decodeUrl(encodedUrl)
      
      if (!registryUrl) {
        console.error('Failed to decode tech-registry URL')
        cachedTechRegistry = null
        return
      }

      // Fetch the external registry
      const response = await fetch(registryUrl)
      
      if (!response.ok) {
        throw new Error(`Failed to fetch tech-registry: ${response.status} ${response.statusText}`)
      }

      const externalRegistry = await response.json() as Record<string, { color: string }>
      
      // Validate that it's an object with the right structure
      if (typeof externalRegistry !== 'object' || externalRegistry === null) {
        throw new Error('Invalid tech-registry structure: must be an object')
      }

      // Validate that values have color property
      for (const [key, value] of Object.entries(externalRegistry)) {
        if (!value.color || typeof value.color !== 'string') {
          console.warn(`Invalid tech-registry entry for "${key}": missing or invalid color`)
        }
      }

      cachedTechRegistry = externalRegistry
    } catch (error) {
      console.error('Error loading external tech-registry:', error)
      // Fall back to default registry on error
      cachedTechRegistry = null
    }
    return
  }

  // No parameters, use default registry
  cachedTechRegistry = null
}

/**
 * Resolves the color for a given tech name.
 * Priority: custom registry → default registry → fallback gray.
 */
export function getTechColor(name: string): string {
  // Try custom registry first
  if (cachedTechRegistry) {
    const customColor = cachedTechRegistry[name]
    if (customColor && customColor.color) {
      return customColor.color
    }
  }

  // Fall back to default registry
  return getDefaultTechColor(name)
}
