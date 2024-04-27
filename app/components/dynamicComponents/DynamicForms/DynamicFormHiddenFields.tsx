import lodash from "lodash";
import { useFormContext } from "react-hook-form";

const { get } = lodash;
export function DynamicFormHiddenFields({
  hiddenFields,
}: {
  hiddenFields: string[];
}) {
  const { register } = useFormContext();
  return (
    <>
      {hiddenFields.map((entry) => {
        return <input key={entry} {...register(entry)} type="hidden" />;
      })}
    </>
  );
}
