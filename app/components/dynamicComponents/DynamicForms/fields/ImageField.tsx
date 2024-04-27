import { UserCircleIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import {
  Controller,
  FieldValues,
  UseFormRegister,
  useFormContext,
} from "react-hook-form";

import { ModelDefinitionFieldType } from "~/lib/types/ModelDefinitionType";
import getImageUrl from "~/server/utils/getImageUrl";

export default function ImageField({
  label,
  fieldObject,
  fieldName,
  defaultValue,
  hookField,
  isRequired = false,
}: {
  type: string;
  label: string;
  fieldName: string;
  fieldObject: ModelDefinitionFieldType;
  defaultValue: string | undefined;
  hookField: any;
  isRequired: boolean;
}) {
  const [logo, setLogo] = useState(
    hookField?.value && getImageUrl(hookField?.value, 600),
  );
  const { control, setValue } = useFormContext();

  return (
    <>
      <div className="flex items-center">
        <img
          alt=""
          id={"output"}
          className={
            "h-20 w-20 mr-2 object-cover " + (logo ? "inline" : "hidden")
          }
          onClick={() => {
            // setBankAccountId(entry.id);

            document.getElementById("image")?.click();
          }}
          src={logo}
        />

        <UserCircleIcon
          className={"h-12 w-12 text-gray-300 " + (logo ? "hidden" : "inline")}
          aria-hidden="true"
        />
        <button
          type="button"
          onClick={() => {
            document.getElementById("image")?.click();
          }}
          className="ml-2 mr-2 items-center rounded-md   border px-3 py-2 font-medium leading-4 text-gray-400 shadow-sm focus:outline-none "
        >
          {label} {isRequired ? <span className="text-red-500">*</span> : null}
        </button>
      </div>

      <>
        <input
          type="file"
          id={"image"}
          className="hidden"
          {...hookField}
          name={fieldName}
          onChange={(evt) => {
            const output = document.getElementById(
              "output",
            ) as HTMLImageElement;
            if (output && evt?.target?.files) {
              output.src = URL.createObjectURL(evt.target.files[0]);
              setLogo(URL.createObjectURL(evt.target.files[0]));
              setValue(
                fieldName + "Blob",
                URL.createObjectURL(evt?.target?.files[0]),
              );
            }

            hookField.onChange(evt);
          }}
        />
      </>
    </>
  );
}
