export default function FormField({ label, name, type, value, onChange, error, required = true, icon: Icon, }) {
  return (
    <div>
      <label className="flex items-center gap-2 mb-1 text-sm font-medium text-heading">{Icon && <Icon className="w-4 h-4 text-heading" />}{label}</label>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        className="bg-lightBg dark:bg-darkBg  w-full shadow-2xl rounded-sm p-2  outline-none transition-all"
        required={required}
      />
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}