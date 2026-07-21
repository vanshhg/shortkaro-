import { useCallback, useState } from 'react'
import { toast } from 'sonner'

export function useCopyToClipboard() {
  const [copiedId, setCopiedId] = useState(null)

  const copy = useCallback(async (text, id = 'default') => {
    if (!text) return false

    try {
      await navigator.clipboard.writeText(text)
      setCopiedId(id)
      toast.success('Copied to clipboard.')

      setTimeout(() => {
        setCopiedId((current) => (current === id ? null : current))
      }, 2000)

      return true
    } catch {
      toast.error('Unable to copy. Please try manually.')
      return false
    }
  }, [])

  return { copy, copiedId }
}
