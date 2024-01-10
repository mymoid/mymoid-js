interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

export function Button({ children, className, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className={[
        'px-2 py-1 border rounded-md font-light text-sm shadow text-neutral-300 border-neutral-500 hover:text-inherit active:bg-neutral-900 transition shadow-neutral-500/15 active:shadow',
        className
      ].join(' ')}
    >
      {children}
    </button>
  )
}
