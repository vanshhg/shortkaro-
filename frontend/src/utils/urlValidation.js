const URL_PATTERN =
  /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?(\?[^\s#]*)?(#[^\s]*)?$/i

const ALIAS_PATTERN = /^[a-zA-Z0-9-_]{3,32}$/

export function normalizeUrl(value) {
  const trimmed = value.trim()
  if (!trimmed) return ''

  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed
  }

  return `https://${trimmed}`
}

export function isValidUrl(value) {
  const trimmed = value.trim()
  if (!trimmed) return false

  try {
    const url = new URL(normalizeUrl(trimmed))
    return ['http:', 'https:'].includes(url.protocol)
  } catch {
    return URL_PATTERN.test(trimmed)
  }
}

export function isValidAlias(value) {
  if (!value.trim()) return true
  return ALIAS_PATTERN.test(value.trim())
}

export function getUrlValidationMessage(value) {
  if (!value.trim()) {
    return 'Please enter a URL to shorten.'
  }

  if (!isValidUrl(value)) {
    return 'Enter a valid URL (e.g. https://example.com).'
  }

  return ''
}

export function getAliasValidationMessage(value) {
  if (!value.trim()) return ''

  if (!isValidAlias(value)) {
    return 'Alias must be 3–32 characters (letters, numbers, hyphens, underscores).'
  }

  return ''
}
