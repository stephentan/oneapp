import React, { useState } from "react";

import ListBox from "~/components/form/select";

function SelectFieldWithDescription({
  label,
  fieldName,
  hookField,
  isRequired,
  options,
}) {
  const { onChange, value, ...field } = hookField;
  const selectionOptions = options.map((entry) => {
    return {
      current: value === entry.value,
      ...entry,
    };
  });
  return (
    <div className="input-container ">
      <input type="hidden" name={field.name} value={value} />
      <ListBox
        name={field.name}
        onBlur={field.onBlur}
        typeOptions={selectionOptions}
        defaultValue={value}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default SelectFieldWithDescription;
