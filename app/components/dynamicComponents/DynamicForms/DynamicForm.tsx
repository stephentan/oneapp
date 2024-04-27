import { Form } from "@remix-run/react";
import { useRef } from "react";
import {
  FieldValues,
  UseFormHandleSubmit,
  useFormContext,
} from "react-hook-form";

import { ModelDefinitionType } from "~/lib/types/ModelDefinitionType";

import DynamicFormContent from "./DynamicFormContent";
import { DynamicFormHiddenFields } from "./DynamicFormHiddenFields";

export function DynamicForm({
  modelDefinition,
  formFields,
  customFieldTypes,
  hiddenFields = [],
  onSubmit,
  submitButton,
}: {
  modelDefinition: ModelDefinitionType;
  formFields: string[][];
  customFieldTypes?: Record<string, unknown>;
  hiddenFields?: string[];
  onSubmit?: (data: Record<string, string | number>, formRef: any) => void;
  submitButton: (
    handleSubmit: UseFormHandleSubmit<FieldValues, undefined>,
    submitRef: React.RefObject<HTMLButtonElement>,
  ) => any;
}) {
  const { handleSubmit } = useFormContext();
  const submitRef = useRef<HTMLButtonElement>(null);
  return (
    <>
      <Form method="post" encType="multipart/form-data">
        <DynamicFormHiddenFields hiddenFields={hiddenFields} />
        <div className="flex flex-col gap-4 pb-5">
          <DynamicFormContent
            formFields={formFields}
            modelDefinition={modelDefinition}
            customFieldTypes={customFieldTypes}
          />
        </div>
        {submitButton ? (
          submitButton(handleSubmit, submitRef)
        ) : (
          <button
            onClick={handleSubmit((data) => {
              onSubmit
                ? onSubmit(data, submitRef)
                : submitRef?.current?.click();
            })}
            className="mx-auto h-12 font-bold w-full rounded-md bg-black px-4  py-2  text-white hover:bg-gray-400 focus:bg-gray-400"
          >
            Submit
          </button>
        )}
        <button type="submit" ref={submitRef}></button>
        {/* )} */}
      </Form>
    </>
  );
}
