type FilterOption<T extends string> = {
  value: T
  label: string
}

type FilterDropdownProps<T extends string> = {
  value: T
  onChange: (value: T) => void
  options: FilterOption<T>[]
  label?: string
  className?: string
}

export function FilterDropdown<T extends string>({
  value,
  onChange,
  options,
  label,
  className = '',
}: FilterDropdownProps<T>) {
  return (
    <div className={className}>
      {label && (
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">
          {label}
        </label>
      )}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
        className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm text-slate-700 outline-none focus:border-blue-500"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}
