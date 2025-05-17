export default function TextInput({ label, name, value, onChange, type = "text", placeholder = "", required = false }) {
    return (
      <div className="flex flex-col">
        <label htmlFor={name} className="mb-1 font-semibold">{label}</label>
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="p-2 border rounded"
          required={required}
        />
      </div>
    );
  }
  