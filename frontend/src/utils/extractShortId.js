/**
 * Pull the shortId slug out of a pasted value.
 *
 * Accepts:
 * - Full URL:  http://localhost:8001/abc123  →  "abc123"
 * - Bare slug: abc123                        →  "abc123"
 */
export function extractShortId(value) {
  const trimmed = value.trim()
  if (!trimmed) return ''

  try {
    const url = new URL(trimmed)
    const segments = url.pathname.split('/').filter(Boolean)
    return segments[segments.length - 1] || ''
  } catch {
    return trimmed.replace(/^\/+|\/+$/g, '')
  }
}

export function getShortUrlValidationMessage(value) {
  if (!value.trim()) {
    return 'Please paste a shortened URL.'
  }

  const shortId = extractShortId(value)
  if (!shortId) {
    return 'Could not extract a valid short ID from this URL.'
  }

  return ''
}
