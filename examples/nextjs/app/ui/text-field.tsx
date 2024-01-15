interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

export default function TextFiled({
  className,
  label,
  id,
  disabled,
  name,
  ...rest
}: TextFieldProps) {
  return (
    <div>
      {label && (
        <label htmlFor={id || name} className="text-sm">
          {label}
        </label>
      )}
      <input
        {...rest}
        type="text"
        id={id || name}
        name={name}
        className={[
          'block w-full rounded-md border border-neutral-500 px-2 py-1 text-sm bg-transparent focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition duration-500',
          disabled ? 'text-neutral-500 pointer-events-none' : '',
          className
        ].join(' ')}
      />
    </div>
  )
}
