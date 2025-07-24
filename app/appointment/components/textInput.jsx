export default function TextInput({ label, name, value, onChange, type = "text", placeholder = "", required = false }) {
  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="mb-2 text-sm font-semibold text-gray-800">
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="
      p-3
      border
      border-gray-300
      rounded-lg
      text-gray-900
      placeholder-gray-400
      focus:outline-none
      focus:ring-2
      focus:ring-purple-400
      focus:border-transparent
      transition
      duration-300
      ease-in-out
      hover:border-purple-500
    "
      />
    </div>

  );
}
