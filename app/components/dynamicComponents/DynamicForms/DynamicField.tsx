import { ReactNode } from "react";
import {
  Control,
  Controller,
  FieldValues,
  UseFormRegister,
  useFormContext,
} from "react-hook-form";

import {
  ModelDefinitionFieldType,
  ModelDefinitionType,
} from "~/lib/types/ModelDefinitionType";

import DynamicCheckbox from "./fields/DynamicCheckbox";
import ImageField from "./fields/ImageField";
import ImagesField from "./fields/ImagesField";
import InputField from "./fields/InputField";
import InputFieldMoney from "./fields/InputFieldMoney";
import InputTextarea from "./fields/InputTextarea";
import SelectField from "./fields/SelectField";
import SelectFieldWithDescription from "./fields/SelectFieldWithDescription";
function capitalizeFirstLetter(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
export function DynamicField({
  model,
  fieldName,
  customFieldTypes = {},
}: {
  model: ModelDefinitionType;
  fieldName: string;
  customFieldTypes: Record<string, unknown>;
}): ReactNode {
  const {
    register,
    formState: { errors },
    control,
  } = useFormContext();

  const fieldObject: ModelDefinitionFieldType = model.fields[fieldName];
  return (
    <>
      {getField(fieldObject, fieldName, register, control, customFieldTypes)}
      {errors[fieldName] ? (
        <div className="text-red-500 text-xs font-semibold ml-2 mt-1">
          {errors[fieldName]?.message as ReactNode}
        </div>
      ) : null}
    </>
  );
}

function getField(
  fieldObject: ModelDefinitionFieldType,
  fieldName: string,
  register: UseFormRegister<FieldValues>,
  control: Control<FieldValues> | undefined,
  customFieldTypes: any,
) {
  if (fieldName?.length > 0) {
    const fieldType = fieldObject?.customAttribute?.fieldType;

    const label = fieldObject?.customAttribute?.label || fieldName;
    return (
      <Controller
        control={control}
        name={fieldName}
        rules={{
          required:
            fieldObject?.isRequired &&
            capitalizeFirstLetter(label || fieldName) + " is required.",
        }}
        render={({ field }) => {
          if (customFieldTypes[fieldName]) {
            return (
              <>
                {customFieldTypes[fieldName]({ hookField: field, fieldObject })}
              </>
            );
          }
          switch (fieldType) {
            case "checkbox":
              return (
                <>
                  <DynamicCheckbox
                    label={label}
                    fieldName={fieldName}
                    hookField={field}
                    isRequired={fieldObject?.isRequired}
                  />
                </>
              );
            case "image":
              return (
                <>
                  <ImageField
                    label={label}
                    fieldName={fieldName}
                    hookField={field}
                    isRequired={fieldObject?.isRequired}
                  />
                </>
              );
            case "images":
              return (
                <ImagesField
                  label={label}
                  fieldName={fieldName}
                  hookField={field}
                  isRequired={fieldObject?.isRequired}
                />
              );
            case "textarea":
              return (
                <>
                  <InputTextarea
                    label={label}
                    fieldName={fieldName}
                    hookField={field}
                    isRequired={fieldObject?.isRequired}
                    placeholder={fieldObject?.customAttribute?.placeholder}
                  />
                </>
              );
            case "money":
            case "price":
              return (
                <InputFieldMoney
                  label={label}
                  fieldName={fieldName}
                  hookField={field}
                  isRequired={fieldObject?.isRequired}
                  placeholder={fieldObject?.customAttribute?.placeholder}
                  note={fieldObject?.customAttribute?.note}
                />
              );
            case "select":
              return (
                <SelectField
                  label={label}
                  fieldName={fieldName}
                  hookField={field}
                  options={fieldObject?.customAttribute?.options || []}
                  isRequired={fieldObject?.isRequired}
                />
              );
            case "selectWithDescription":
              return (
                <SelectFieldWithDescription
                  label={label}
                  fieldName={fieldName}
                  hookField={field}
                  options={fieldObject?.customAttribute?.options || []}
                  isRequired={fieldObject?.isRequired}
                />
              );
          }
          return (
            <InputField
              type={fieldType}
              label={label}
              fieldName={fieldName}
              hookField={field}
              isRequired={fieldObject?.isRequired}
              placeholder={fieldObject?.customAttribute?.placeholder}
              note={fieldObject?.customerAttribute?.note}
            />
          );
        }}
      />
    );
  }
}
