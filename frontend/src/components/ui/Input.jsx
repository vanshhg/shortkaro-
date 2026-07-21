import { cn } from '../../utils/cn.js'

export function Input({
  className,
  label,
  hint,
  error,
  id,
  ...props
}) {
  const inputId = id || props.name

  return (
    <div className="flex w-full flex-col gap-2">
      {label ? (
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-foreground"
        >
          {label}
        </label>
      ) : null}

      <input
        id={inputId}
        className={cn(
          'h-11 w-full rounded-lg border bg-surface px-4 text-sm text-foreground',
          'placeholder:text-muted-foreground',
          'transition-colors duration-200',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
          error
            ? 'border-destructive focus-visible:ring-destructive'
            : 'border-border hover:border-zinc-600',
          className,
        )}
        aria-invalid={Boolean(error)}
        aria-describedby={
          error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined
        }
        {...props}
      />

      {hint && !error ? (
        <p id={`${inputId}-hint`} className="text-xs text-muted-foreground">
          {hint}
        </p>
      ) : null}

      {error ? (
        <p id={`${inputId}-error`} className="text-xs text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  )
}
