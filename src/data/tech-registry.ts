export type TechEntry = { color: string }
export type TechRegistry = Record<string, TechEntry>()

/**
 * Dynamically fetches the tech registry from the URL in .env
 */
export async function fetchTechRegistry(): Promise<TechRegistry> {
  const url = import.meta.env.VITE_RESSOURCES_URL
  if (!url) throw new Error('VITE_RESSOURCES_URL is not defined in .env')

  const res = await fetch(url + "tech_registry.jsonc")
  if (!res.ok) throw new Error(`Failed to fetch tech registry: ${res.statusText}`)

  return (await res.json()) as TechRegistry
}

/**
 * Resolves the color for a given tech name.
 */
export async function getTechColor(name: string): Promise<string> {
  const registry = await fetchTechRegistry()
  return registry[name]?.color ?? '#6b7280'
}
