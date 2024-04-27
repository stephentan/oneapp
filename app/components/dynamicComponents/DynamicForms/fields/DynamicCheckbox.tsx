import { useState } from "react";
import { Checkbox } from "~/components/ui/checkbox";

export default function DynamicCheckbox({
  label,
  fieldName,
  hookField,
  isRequired,
  placeholder,
}) {
  const { onChange, value, ...field } = hookField;
  return (
    <div className="mt-3 flex items-center space-x-2">
      <Checkbox
        {...field}
        onCheckedChange={(data) => {
          onChange(data);
        }}
        checked={value}
      />
      <label
        htmlFor="hasInventory"
        className="block text-sm font-medium text-gray-500"
      >
        Track Inventory
      </label>
    </div>
  );
}
