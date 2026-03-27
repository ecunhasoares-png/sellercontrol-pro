'use client'

export default function KPIcard({
  title,
  value,
  color = 'bg-blue-500'
}: {
  title: string
  value: string | number
  color?: string
}) {
  return (
    <div className={`p-4 rounded shadow text-white ${color}`}>
      <h3 className="text-sm">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  )
}