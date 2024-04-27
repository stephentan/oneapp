import { useState } from "react";

export default function InputField({
  type = "text",
  label,
  fieldName,
  hookField,
  isRequired,
  placeholder,
  note,
}) {
  const { onChange, value, ...field } = hookField;
  const [currentValue, setCurrentValue] = useState<string | undefined>(value);
  return (
    <div className="input-container ">
      <input
        type={type}
        className="border border-gray-300 rounded-md"
        {...field}
        onChange={(e) => {
          setCurrentValue(e.target.value);
          onChange(e);
        }}
        value={value}
        placeholder={placeholder}
        style={{ color: "#020817" }}
      />
      {note ? <p className="ml-2 pt-2 text-xs text-gray-400">{note}</p> : null}
      <label className={currentValue ? "filled" : ""}>
        {label} {isRequired ? <span className="text-red-500">*</span> : null}
      </label>
    </div>
  );
}
