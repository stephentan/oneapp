interface ISelectFieldProps {
  label: string;
  fieldName: string;
  optionNameKey?: string;
  hookField: any; // TODO: Fix any
  isRequired?: boolean;
  options: any[]; // TODO: Fix any
}
function SelectField(props: ISelectFieldProps) {
  const {
    label,
    fieldName,
    optionNameKey = "name",
    hookField,
    isRequired,
    options,
  } = props;
  const { onChange, value, ...field } = hookField;

  return (
    <div className="input-container ">
      <select
        id="city"
        name="cityId"
        className="rounded-xs border border-gray-300 text-left text-base font-medium text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
        {...field}
        onChange={onChange}
        value={value}
      >
        {options.map((entry, index) => {
          return (
            <option key={index} value={entry.id}>
              {entry[optionNameKey]}
            </option>
          );
        })}
      </select>
      <label className={"filled"}>{label}</label>
    </div>
  );
}

export default SelectField;
