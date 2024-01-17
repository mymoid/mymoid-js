interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  variant?: 'primary'
}

export function Button({ children, variant, className, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className={[
        'flex px-2 py-1 items-center gap-1 rounded-md text-sm shadow text-neutral-300 transition shadow-neutral-500/15 active:shadow',
        variant === 'primary'
          ? 'bg-white text-neutral-800 hover:text-black active:bg-neutral-400 hover:bg-neutral-200'
          : 'border border-neutral-500 active:bg-neutral-900 font-light hover:text-inherit',
        className
      ].join(' ')}
    >
      {children}
    </button>
  )
}
