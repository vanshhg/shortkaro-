import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { Button } from './ui/Button.jsx'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-0 z-50 border-b border-border-subtle bg-background"
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="inline-flex cursor-pointer items-center text-foreground transition-opacity duration-200 hover:opacity-80"
        >
          <span className="font-logo text-2xl font-bold tracking-[-0.04em] text-foreground sm:text-[28px] md:text-[32px]">
          Shortkaro*
          </span>
        </Link>

        <div className="hidden md:block">
          <Button
            variant="primary"
            size="sm"
            onClick={() => {
              document.getElementById('shortener')?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            Shorten URL
          </Button>
        </div>

        <button
          type="button"
          className="inline-flex cursor-pointer items-center justify-center rounded-lg p-2 text-muted transition-colors duration-200 hover:bg-surface-elevated hover:text-foreground md:hidden"
          aria-expanded={isOpen}
          aria-controls="mobile-nav"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setIsOpen((open) => !open)}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen ? (
          <motion.nav
            id="mobile-nav"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-border-subtle md:hidden"
            aria-label="Mobile"
          >
            <div className="flex flex-col gap-1 px-4 py-4">
              <Button
                variant="primary"
                size="md"
                className="w-full"
                onClick={() => {
                  setIsOpen(false)
                  document.getElementById('shortener')?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                Shorten URL
              </Button>
            </div>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </motion.header>
  )
}
