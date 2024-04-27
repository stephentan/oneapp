import { ModelDefinitionType } from "~/lib/types/ModelDefinitionType";

import { DynamicField } from "./DynamicField";

export default function DynamicFormContent({
  modelDefinition,
  formFields,
  customFieldTypes,
}: {
  modelDefinition: ModelDefinitionType;
  formFields: string[][];
  customFieldTypes?: Record<string, unknown>;
}) {
  return (
    <>
      {formFields.map((row, index) => {
        return (
          <div key={index} className={"grid gap-3 grid-cols-" + row.length}>
            {row.map((element, elementIndex) => {
              return (
                <div key={elementIndex}>
                  {
                    <>
                      <DynamicField
                        fieldName={element}
                        model={modelDefinition}
                        customFieldTypes={customFieldTypes || {}}
                      />
                    </>
                  }
                </div>
              );
            })}
          </div>
        );
      })}
    </>
  );
}
