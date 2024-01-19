export function Field({ title, value }: { title: string; value: string }) {
  return (
    <div className="flex flex-col">
      <span className="font-bold">{title}</span>
      <p>{value}</p>
    </div>
  )
}
