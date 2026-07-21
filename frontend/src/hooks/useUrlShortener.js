import { useCallback, useState } from 'react'
import { toast } from 'sonner'
import { shortenUrl } from '../services/urlService.js'
import {
  getAliasValidationMessage,
  getUrlValidationMessage,
  normalizeUrl,
} from '../utils/urlValidation.js'

/**
 * Business logic for the URL shortener form.
 *
 * Separation of concerns:
 * - URLShortenerForm.jsx  → UI only (inputs, button, result display)
 * - useUrlShortener       → state + validation + API orchestration (this file)
 * - urlService.js         → raw HTTP calls via Axios
 *
 * When the user submits the form:
 * 1. validate() runs client-side checks
 * 2. normalizeUrl() ensures https:// is present
 * 3. shortenUrl() sends POST /url to the Express backend
 * 4. On success, shortUrl state updates and the form shows the result
 * 5. On failure, Sonner shows an error toast
 */
export function useUrlShortener() {
  const [originalUrl, setOriginalUrl] = useState('')
  const [alias, setAlias] = useState('')
  const [shortUrl, setShortUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [urlError, setUrlError] = useState('')
  const [aliasError, setAliasError] = useState('')

  const validate = useCallback(() => {
    const nextUrlError = getUrlValidationMessage(originalUrl)
    const nextAliasError = getAliasValidationMessage(alias)

    setUrlError(nextUrlError)
    setAliasError(nextAliasError)

    return !nextUrlError && !nextAliasError
  }, [alias, originalUrl])

  const handleShorten = useCallback(async () => {
    if (!validate()) {
      toast.error('Please fix the errors before continuing.')
      return null
    }

    // Disable the button and show the spinner while waiting for the backend
    setIsLoading(true)

    try {
      const normalizedUrl = normalizeUrl(originalUrl)

      // Only { url } is sent — alias is UI-only until the backend supports it
      const result = await shortenUrl(normalizedUrl)

      setShortUrl(result.shortUrl)
      toast.success('URL shortened successfully.')

      return result
    } catch (error) {
      // Axios attaches server responses to error.response when status is 4xx/5xx
      // e.g. backend returns 400 { error: "URL is required" }
      const message =
        error.response?.data?.error ||
        error.response?.data?.message ||
        'Something went wrong. Please try again.'

      toast.error(message)
      return null
    } finally {
      // Always re-enable the button, success or failure
      setIsLoading(false)
    }
  }, [originalUrl, validate])

  const resetResult = useCallback(() => {
    setShortUrl('')
  }, [])

  return {
    originalUrl,
    setOriginalUrl,
    alias,
    setAlias,
    shortUrl,
    isLoading,
    urlError,
    aliasError,
    handleShorten,
    resetResult,
    validate,
  }
}
