import { motion } from 'framer-motion'
import { Check, Copy, Loader2, Link2 } from 'lucide-react'
import { Button } from './ui/Button.jsx'
import { Input } from './ui/Input.jsx'
import { useCopyToClipboard } from '../hooks/useCopyToClipboard.js'
import { useUrlShortener } from '../hooks/useUrlShortener.js'

export function URLShortenerForm() {
  const {
    originalUrl,
    setOriginalUrl,
    shortUrl,
    isLoading,
    urlError,
    handleShorten,
    resetResult,
  } = useUrlShortener()

  const { copy, copiedId } = useCopyToClipboard()

  const handleSubmit = async (event) => {
    event.preventDefault()
    await handleShorten()
  }

  const handleUrlChange = (event) => {
    setOriginalUrl(event.target.value)
    if (shortUrl) resetResult()
  }

  return (
    <motion.section
      id="shortener"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-2xl">
        <div className="rounded-xl border border-border bg-surface p-6 shadow-card sm:p-8">
          <div className="mb-6 flex items-start gap-3">
            <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-surface-elevated border border-border">
              <Link2 className="h-4 w-4 text-foreground" aria-hidden="true" />
            </span>
            <div>
              <h2 className="text-lg font-semibold tracking-tight text-foreground">
                Shorten your link
              </h2>
              <p className="mt-1 text-sm text-muted">
                Paste a long URL.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <Input
              name="originalUrl"
              label="Original URL"
              type="url"
              inputMode="url"
              autoComplete="url"
              placeholder="https://example.com/your-long-url"
              value={originalUrl}
              onChange={handleUrlChange}
              error={urlError}
              disabled={isLoading}
            />

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              isLoading={isLoading}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                  Shortening…
                </>
              ) : (
                'Shorten URL'
              )}
            </Button>
          </form>

          {shortUrl ? (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="mt-6 rounded-lg border border-border bg-surface-elevated p-4"
            >
              <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Your short link
              </p>
              <div className="flex items-center gap-2">
                <code className="min-w-0 flex-1 truncate rounded-md bg-background px-3 py-2 text-sm text-foreground">
                  {shortUrl}
                </code>
                <Button
                  variant="icon"
                  size="icon"
                  aria-label={copiedId === 'result' ? 'Copied' : 'Copy short URL'}
                  onClick={() => copy(shortUrl, 'result')}
                >
                  {copiedId === 'result' ? (
                    <Check className="h-4 w-4 text-success" aria-hidden="true" />
                  ) : (
                    <Copy className="h-4 w-4" aria-hidden="true" />
                  )}
                </Button>
              </div>
            </motion.div>
          ) : null}
        </div>
      </div>
    </motion.section>
  )
}
