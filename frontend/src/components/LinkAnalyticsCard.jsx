import { motion } from 'framer-motion'
import { BarChart3, Loader2 } from 'lucide-react'
import { Button } from './ui/Button.jsx'
import { Input } from './ui/Input.jsx'
import { useLinkAnalytics } from '../hooks/useLinkAnalytics.js'

export function LinkAnalyticsCard() {
  const {
    shortUrlInput,
    setShortUrlInput,
    totalClicks,
    isLoading,
    inputError,
    handleCheckAnalytics,
  } = useLinkAnalytics()

  const handleSubmit = async (event) => {
    event.preventDefault()
    await handleCheckAnalytics()
  }

  return (
    <motion.section
      id="analytics"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto max-w-6xl px-4 pb-20 pt-6 sm:px-6 lg:px-8 lg:pb-28"
    >
      <div className="mx-auto max-w-2xl">
        <div className="rounded-xl border border-border bg-surface p-6 shadow-card sm:p-8">
          <div className="mb-6 flex items-start gap-3">
            <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-surface-elevated border border-border">
              <BarChart3 className="h-4 w-4 text-foreground" aria-hidden="true" />
            </span>
            <div>
              <h2 className="text-lg font-semibold tracking-tight text-foreground">
                Check Link Analytics
              </h2>
              <p className="mt-1 text-sm text-muted">
                Paste a shortened URL to see how many times it has been clicked.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <Input
              name="shortUrl"
              label="Shortened URL"
              type="text"
              inputMode="url"
              autoComplete="off"
              placeholder="Paste your shortened URL here..."
              value={shortUrlInput}
              onChange={(event) => setShortUrlInput(event.target.value)}
              error={inputError}
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
                  Checking…
                </>
              ) : (
                'Check Analytics'
              )}
            </Button>
          </form>

          {totalClicks !== null ? (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="mt-6 rounded-lg border border-border bg-surface-elevated p-4"
            >
              <div className="border-b border-border-subtle pb-4">
                <p className="text-sm font-medium text-muted">Total Clicks</p>
                <p className="mt-2 text-3xl font-semibold tracking-tight text-foreground">
                  {totalClicks}
                </p>
              </div>
            </motion.div>
          ) : null}
        </div>
      </div>
    </motion.section>
  )
}
