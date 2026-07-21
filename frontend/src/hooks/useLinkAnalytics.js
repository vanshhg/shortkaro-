import { useCallback, useState } from 'react'
import { toast } from 'sonner'
import { getLinkAnalytics } from '../services/urlService.js'
import {
  extractShortId,
  getShortUrlValidationMessage,
} from '../utils/extractShortId.js'

export function useLinkAnalytics() {
  const [shortUrlInput, setShortUrlInput] = useState('')
  const [totalClicks, setTotalClicks] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [inputError, setInputError] = useState('')

  const handleCheckAnalytics = useCallback(async () => {
    const validationError = getShortUrlValidationMessage(shortUrlInput)
    if (validationError) {
      setInputError(validationError)
      return null
    }

    setInputError('')
    setIsLoading(true)
    setTotalClicks(null)

    try {
      const shortId = extractShortId(shortUrlInput)
      const result = await getLinkAnalytics(shortId)

      setTotalClicks(result.totalClicks ?? 0)
      return result
    } catch (error) {
      const message =
        error.response?.data?.error ||
        error.response?.data?.message ||
        'Something went wrong. Please try again.'

      toast.error(message)
      setTotalClicks(null)
      return null
    } finally {
      setIsLoading(false)
    }
  }, [shortUrlInput])

  const handleInputChange = useCallback(
    (value) => {
      setShortUrlInput(value)
      if (inputError) setInputError('')
      if (totalClicks !== null) setTotalClicks(null)
    },
    [inputError, totalClicks],
  )

  return {
    shortUrlInput,
    setShortUrlInput: handleInputChange,
    totalClicks,
    isLoading,
    inputError,
    handleCheckAnalytics,
  }
}
