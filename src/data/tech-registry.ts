export type TechEntry = { color: string, icon?: string, iconHref?: string }
export type TechRegistry = Record<string, TechEntry>
export type TechName = keyof TechRegistry

let cachedRegistry: TechRegistry | null = null

/**
 * Fetches the tech registry from the URL (only once) and caches it
 */
export async function fetchTechRegistry(): Promise<TechRegistry> {
  if (cachedRegistry) return cachedRegistry

  const url = import.meta.env.VITE_RESSOURCES_URL
  if (!url) throw new Error('VITE_RESSOURCES_URL is not defined')

  const res = await fetch(`${url}/config/colors/tech`)
  if (!res.ok) throw new Error(`Failed to fetch tech registry: ${res.statusText}`)

  cachedRegistry = (await res.json()) as TechRegistry
  return cachedRegistry
}

/**
 * Resolves the full tech entry for a given name.
 * Returns a default placeholder if the registry is not loaded yet or the tech is unknown.
 */
export function getTech(name: string): TechEntry {
  if (!cachedRegistry) {
    console.warn(
      "Tech registry not loaded yet. Call `await fetchTechRegistry()` first."
    )
    return { color: '#6b7280' }
  }

  return cachedRegistry[name] ?? { color: '#6b7280' }
}
