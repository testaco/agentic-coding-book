/**
 * Get the base path for the application
 * This is needed for GitHub Pages deployment where the site is at /agentic-coding-book/
 */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''

/**
 * Prepend the base path to a URL
 */
export function withBasePath(path: string): string {
  if (!path.startsWith('/')) {
    return path
  }
  return `${basePath}${path}`
}
