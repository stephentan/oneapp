import { ModelDefinitionType } from "~/lib/types/ModelDefinitionType";
import { DynamicViewField } from "./DynamicViewField";
import lodash from "lodash";
export default function DynamicView({
  modelName,
  modelDefinition,
  fields,
  customFieldTypes,
  values,
}: {
  modelName: string;
  modelDefinition: ModelDefinitionType;
  fields: string[][];
  customFieldTypes?: Record<string, unknown>;
  values: Record<string, unknown>;
}) {
  return (
    <div className="flex flex-col gap-4 pb-5">
      {fields.map((row, index) => {
        return (
          <div key={index} className={"grid gap-3 grid-cols-" + row.length}>
            {row.map((element, elementIndex) => {
              return (
                <div key={elementIndex}>
                  {
                    <>
                      <DynamicViewField
                        fieldName={element}
                        model={modelDefinition}
                        modelDefinition={modelDefinition}
                        customFieldTypes={customFieldTypes}
                        value={lodash.get(values, element)}
                      />
                    </>
                  }
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
