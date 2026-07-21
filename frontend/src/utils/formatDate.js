const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })

const UNITS = [
  { unit: 'year', seconds: 60 * 60 * 24 * 365 },
  { unit: 'month', seconds: 60 * 60 * 24 * 30 },
  { unit: 'week', seconds: 60 * 60 * 24 * 7 },
  { unit: 'day', seconds: 60 * 60 * 24 },
  { unit: 'hour', seconds: 60 * 60 },
  { unit: 'minute', seconds: 60 },
  { unit: 'second', seconds: 1 },
]

export function formatRelativeTime(date) {
  const target = date instanceof Date ? date : new Date(date)
  const elapsed = (target.getTime() - Date.now()) / 1000

  for (const { unit, seconds } of UNITS) {
    if (Math.abs(elapsed) >= seconds || unit === 'second') {
      const value = Math.round(elapsed / seconds)
      return rtf.format(value, unit)
    }
  }

  return 'just now'
}
