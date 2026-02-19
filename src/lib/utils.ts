import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Resolves a public asset path with the Vite base URL.
 * Ensures paths like "/images/photo.jpg" work correctly
 * when the app is deployed under a subpath (e.g. GitHub Pages).
 */
export function assetUrl(path: string): string {
  // If the path is already an absolute URL, return as-is
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path
  }

  const base = import.meta.env.BASE_URL
  if (path.startsWith('/')) {
    return `${base}${path.slice(1)}`
  }
  return `${base}${path}`
}
