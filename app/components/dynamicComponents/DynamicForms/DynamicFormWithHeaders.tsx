import { Form } from "@remix-run/react";
import React, { useRef } from "react";
import { useFormContext } from "react-hook-form";

import { ModelDefinitionType } from "~/lib/types/ModelDefinitionType";

import { DynamicFieldWithHeadersType } from "./DynamicFieldType";
import DynamicFormContent from "./DynamicFormContent";
import { DynamicFormHiddenFields } from "./DynamicFormHiddenFields";

function DynamicFormWithHeaders({
  modelDefinition,
  formFields,
  customFieldTypes,
  hiddenFields = [],
  onSubmit,
  submitButtonStyle,
  submitLabel = "Submit",
}: {
  modelDefinition: ModelDefinitionType;
  formFields: DynamicFieldWithHeadersType;
  customFieldTypes?: Record<string, unknown>;
  hiddenFields?: string[];
  onSubmit?: (data: Record<string, string | number>, formRef: any) => void;
  submitButtonStyle: React.CSSProperties;
  submitLabel: string;
}) {
  const { handleSubmit } = useFormContext();

  const submitRef = useRef<HTMLButtonElement>(null);
  return (
    <div>
      <Form method="post" encType="multipart/form-data">
        {formFields.map((formFieldEntry, index) => {
          return (
            <span key={index}>
              <DynamicFormHiddenFields hiddenFields={hiddenFields} />
              <div key={index} className="flex flex-col gap-4 pb-5">
                <div className=" text-black  dark:text-white text-lg">
                  {formFieldEntry.headerName}
                </div>

                <DynamicFormContent
                  formFields={formFieldEntry.fields}
                  modelDefinition={modelDefinition}
                  customFieldTypes={customFieldTypes}
                />
              </div>
            </span>
          );
        })}

        <button
          onClick={handleSubmit((data) => {
            onSubmit ? onSubmit(data, submitRef) : submitRef?.current?.click();
          })}
          className="mx-auto h-12 w-full rounded-md bg-black px-4  py-2  text-white hover:bg-gray-400 focus:bg-gray-400"
          style={submitButtonStyle}
        >
          {submitLabel}
        </button>
        <button type="submit" ref={submitRef}></button>
      </Form>
    </div>
  );
}

export default DynamicFormWithHeaders;
