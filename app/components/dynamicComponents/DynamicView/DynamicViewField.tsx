import { ReactNode } from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";

import {
  ModelDefinitionFieldType,
  ModelDefinitionType,
} from "~/lib/types/ModelDefinitionType";

import formatMoney from "~/lib/utils/formatMoney";

export function DynamicViewField({
  modelDefinition,
  fieldName,
  customFieldTypes = {},
  value,
}: {
  modelDefinition: ModelDefinitionType;
  fieldName: string;
  customFieldTypes: Record<string, unknown>;
  formHook: UseFormReturn<FieldValues, unknown, undefined>;
  value: Record<string, unknown>;
}): ReactNode {
  if (customFieldTypes[fieldName]) {
    return <>{customFieldTypes[fieldName]}</>;
  }
  const fieldObject: ModelDefinitionFieldType =
    modelDefinition.fields[fieldName];

  return (
    <>
      <label
        htmlFor={fieldName}
        className="block text-sm font-medium text-gray-700"
      >
        {fieldObject?.customAttribute?.label}
      </label>
      {getField(fieldObject, fieldName, value)}
    </>
  );
}

function getField(
  fieldObject: ModelDefinitionFieldType,
  fieldName: string,
  value: unknown,
) {
  if (fieldName?.length > 0) {
    const fieldType = fieldObject?.customAttribute?.fieldType;

    switch (fieldType) {
      case "money":
        return <div>{formatMoney(value)}</div>;
      // case "image":
      //   return <DynamicImageField {...parameters} />;
      default:
        return <div>{value}</div>;
    }
  }
}
