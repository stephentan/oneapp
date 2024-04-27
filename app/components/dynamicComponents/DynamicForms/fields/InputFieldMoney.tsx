import { useState } from "react";

export default function InputFieldMoney({
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
      <div
        className="prelabel pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4"
        style={
          currentValue ? { display: "block", marginTop: 18 } : { marginTop: 18 }
        }
      >
        <span className="text-gray-500 sm:text-sm mt-3">₱</span>
      </div>

      <input
        type="number"
        className="text-sm focus:border-primary-500 focus:ring-primary-500 block w-full rounded-md border-gray-300 pl-14 pr-12 sm:text-sm"
        {...field}
        onChange={(e) => {
          setCurrentValue(e.target.value);
          onChange(e);
        }}
        value={value}
        style={{ color: "#020817", paddingLeft: 28 }}
      />
      {note ? <p className="ml-2 pt-2 text-xs text-gray-400">{note}</p> : null}
      <div
        className={
          "postlabel pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 "
        }
        style={
          currentValue ? { display: "block", marginTop: 18 } : { marginTop: 18 }
        }
      >
        <span className="text-gray-500 sm:text-sm mt-3">PHP</span>
      </div>

      <label className={currentValue ? "filled" : ""}>
        {label} {isRequired ? <span className="text-red-500">*</span> : null}
      </label>
    </div>
  );
}
