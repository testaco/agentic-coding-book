import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Prepend the base path to a URL for GitHub Pages deployment
 * @param path - The path to prepend the base path to
 * @returns The path with the base path prepended (if configured)
 */
export function withBasePath(path: string): string {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''

  // Don't prepend base path to external URLs or anchors
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('#')) {
    return path
  }

  // Ensure path starts with /
  const normalizedPath = path.startsWith('/') ? path : `/${path}`

  return `${basePath}${normalizedPath}`
}
