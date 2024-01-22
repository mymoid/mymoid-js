export default function MainHeader({
  title,
  subtitle,
  children
}: {
  title: string
  subtitle: string
  children?: React.ReactNode
}) {
  return (
    <header className="flex justify-between items-center mb-5">
      <div>
        <h2 className="font-semibold text-3xl">{title}</h2>
        <h4 className="text-neutral-500">{subtitle}</h4>
      </div>
      <div className="flex gap-2">{children}</div>
    </header>
  )
}
