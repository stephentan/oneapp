import { useState } from "react";

export default function InputTextarea({
  label,
  fieldName,
  hookField,
  isRequired,
  placeholder,
}) {
  const { onChange, value, ...field } = hookField;
  const [currentValue, setCurrentValue] = useState<string | undefined>(value);
  return (
    <div className="input-container">
      <div className="pt-10 focus-within:border-primary-300 focus-within:ring-primary-200  mt-1 block w-full flex-1 rounded-md border border-gray-300 placeholder-gray-300 shadow-sm focus-within:border-blue-500 focus-within:ring focus-widthin:ring-opacity-50">
        <textarea
          // placeholder="Add Description for your payer."
          className="w-full border-0 overflow-y-auto"
          {...field}
          onChange={(e) => {
            setCurrentValue(e.target.value);
            onChange(e);
          }}
          rows="8"
          defaultValue={value}
          style={{
            marginTop: -15,
            padding: 0,
            paddingLeft: 14,
            paddinRight: 14,
            resize: "none",
          }}
        />
        <label className={currentValue ? "filled" : ""} style={{ top: 2 }}>
          {label} {isRequired ? <span className="text-red-500">*</span> : null}
        </label>
      </div>
    </div>
  );
}
