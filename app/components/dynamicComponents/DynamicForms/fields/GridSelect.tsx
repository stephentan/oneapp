import { RadioGroup } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { Controller, useFormContext } from "react-hook-form";

import classNames from "~/lib/utils/classNames";

export default function GridSelect({
  fieldName,
  options,
  onChange,
  hookField,
  fieldObject,
}) {
  const { control, setValue } = useFormContext();
  const {
    onChange: formHookOnChange,
    onBlur,
    value,
    ...otherFields
  } = hookField;

  return (
    <>
      <input type="hidden" name={fieldName} value={value} />
      <RadioGroup
        name={fieldName}
        value={value}
        onChange={(data) => {
          formHookOnChange(data);
          onChange && onChange(data, setValue);
        }}
        {...otherFields}
      >
        <div className="mt-2 grid grid-cols-1 gap-y-2 sm:grid-cols-2 sm:gap-x-2">
          {options.map((option) => (
            <RadioGroup.Option
              key={option.id}
              value={option.id}
              className={({ checked, active }) =>
                classNames(
                  checked ? "border-transparent" : "border-gray-300",
                  active ? "ring-2 ring-indigo-500" : "",
                  "relative flex cursor-pointer rounded-xs border bg-white p-4 shadow-sm focus:outline-none",
                )
              }
            >
              {({ checked, active }) => (
                <>
                  <span className="flex flex-1">
                    <span className="flex flex-col">
                      <RadioGroup.Label
                        as="span"
                        className="block text-sm font-medium text-gray-900"
                      >
                        {option.name}
                      </RadioGroup.Label>
                      {option.description ? (
                        <RadioGroup.Description
                          as="span"
                          className="mt-1 flex items-center text-sm text-gray-500"
                        >
                          {option.description}
                        </RadioGroup.Description>
                      ) : null}
                      {option.price ? (
                        <RadioGroup.Description
                          as="span"
                          className="mt-6 text-sm font-medium text-gray-900"
                        >
                          {option.price}
                        </RadioGroup.Description>
                      ) : null}
                    </span>
                  </span>
                  {String(value) === String(option.id) ? (
                    <CheckCircleIcon
                      className="h-5 w-5 text-indigo-600"
                      aria-hidden="true"
                    />
                  ) : (
                    <CheckCircleIcon
                      className="h-5 w-5 text-indigo-600 invisible"
                      aria-hidden="true"
                    />
                  )}
                  <span
                    className={classNames(
                      active ? "border" : "border-2",
                      checked ? "border-indigo-500" : "border-transparent",
                      "pointer-events-none absolute -inset-px rounded-xs",
                    )}
                    aria-hidden="true"
                  />
                </>
              )}
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>
    </>
  );
}
