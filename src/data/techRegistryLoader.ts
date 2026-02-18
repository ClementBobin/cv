import { getTechColor as getDefaultTechColor } from './tech-registry'
import { decodeUrl } from '@/lib/urlEncoder'

// Cache for loaded tech registry
let cachedTechRegistry: Record<string, { color: string }> | null = null

/**
 * Loads tech registry from URL parameter or uses default registry
 */
export async function loadTechRegistry(): Promise<void> {
  // Check if there's a tech-registry parameter in the URL
  const params = new URLSearchParams(window.location.search)
  const encodedUrl = params.get('tech-registry')

  if (!encodedUrl) {
    // No parameter, use default registry
    cachedTechRegistry = null
    return
  }

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
