import { Link2 } from 'lucide-react'
import { Link } from 'react-router-dom'

const footerLinks = [
  { label: 'Shorten', href: '#shortener' },
  { label: 'Analytics', href: '#analytics' },
]

export function Footer() {
  return (
    <footer className="border-t border-border-subtle bg-background">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-12 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div className="space-y-3">
          <Link
            to="/"
            className="inline-flex cursor-pointer items-center gap-2.5 text-foreground transition-opacity duration-200 hover:opacity-80"
          >
            
            <span className="font-logo text-2xl font-bold tracking-[-0.04em] text-foreground sm:text-[28px] md:text-[32px]">
            Shortkaro*
          </span>
          </Link>
          <p className="max-w-sm text-sm leading-relaxed text-muted">
            A modern URL shortener is easy and fast, 
            enter the long link to get your shortened link.
          </p>
        </div>

        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="cursor-pointer text-sm text-muted transition-colors duration-200 hover:text-foreground"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t border-border-subtle">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} Shortly. All rights reserved.</p>
          <p>Built with React, Tailwind CSS.</p>
        </div>
      </div>
    </footer>
  )
}
