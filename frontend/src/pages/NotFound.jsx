import { motion } from 'framer-motion'
import { ArrowLeft, Link2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '../components/ui/Button.jsx'

export default function NotFound() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md text-center"
      >
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-surface border border-border shadow-soft">
          <Link2 className="h-5 w-5 text-foreground" aria-hidden="true" />
        </span>

        <p className="mt-8 text-sm font-medium text-muted-foreground">404</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground">
          Page not found
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-muted">
          The page you are looking for does not exist or may have been moved.
        </p>

        <Link to="/" className="mt-8 inline-block">
          <Button variant="primary" size="md">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to home
          </Button>
        </Link>
      </motion.div>
    </div>
  )
}
