import { cn } from '../../utils/cn.js'

const variants = {
  primary:
    'bg-accent text-accent-foreground hover:bg-zinc-200 active:bg-zinc-300',
  secondary:
    'bg-surface-elevated text-foreground border border-border hover:bg-zinc-800 active:bg-zinc-700',
  ghost:
    'bg-transparent text-muted hover:text-foreground hover:bg-surface-elevated',
  icon:
    'bg-surface-elevated text-muted border border-border hover:text-foreground hover:bg-zinc-800 active:bg-zinc-700',
}

const sizes = {
  sm: 'h-9 px-3 text-sm gap-1.5',
  md: 'h-11 px-4 text-sm gap-2',
  lg: 'h-12 px-6 text-sm gap-2',
  icon: 'h-9 w-9 p-0',
}

export function Button({
  className,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled,
  children,
  ...props
}) {
  const isIconOnly = size === 'icon'

  return (
    <button
      type="button"
      className={cn(
        'inline-flex cursor-pointer items-center justify-center rounded-lg font-medium transition-colors duration-200',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        variants[variant],
        isIconOnly ? sizes.icon : sizes[size],
        className,
      )}
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      {...props}
    >
      {children}
    </button>
  )
}
