import lodash from "lodash";
import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { getModelDefinition } from "~/server/utils/ModelUtils.server";

import DynamicFormContent from "../DynamicFormContent";

const { get } = lodash;
export default function RadioAccordion({
  fieldName,
  modelDefinition,
  options,
  hookField,
  fieldObject,
}) {
  const { control } = useFormContext();
  const [ewallet, setEwallet] = useState("");
  const [fieldValue, setFieldValue] = useState(1);
  const { onChange, ...otherHookField } = hookField;
  return (
    <div>
      <input type="hidden" name={fieldName} value={fieldValue} />
      <Controller
        control={control}
        name={fieldName}
        render={({ field }) => {
          return (
            <Accordion
              type="single"
              collapsible
              className="  rounded-sm"
              {...otherHookField}
              defaultValue={get(options, "[0].value")}
            >
              {options?.map((option, index) => {
                return (
                  <AccordionItem key={index} value={option.value}>
                    <AccordionTrigger
                      className={
                        "px-4 hover:no-underline " +
                        (fieldValue === option.value
                          ? "  bg-blue-100 "
                          : " bg-white") +
                        (index === 0
                          ? " rounded-t-sm border-t border-l border-r "
                          : " border-l border-r ") +
                        (index > 0 ? " border-t " : "") +
                        (index === options?.length - 1
                          ? fieldValue !== option.value
                            ? " border-b rounded-b-sm "
                            : ""
                          : "")
                      }
                      showChevron={false}
                      onClick={() => {
                        setFieldValue(option.value);
                        onChange(option.value);
                      }}
                    >
                      <div className="flex items-center">
                        <input
                          type="radio"
                          className="outline-none focus:outline-none focus:ring-0 focus:border-blue-500"
                          style={{}}
                          checked={option.value === fieldValue}
                          onChange={() => {}}
                        />{" "}
                        <div className="ml-2 text-sm text-black">
                          {option.label}
                        </div>
                      </div>
                      {option?.rightLabel ? (
                        <div>{option?.rightLabel}</div>
                      ) : null}
                    </AccordionTrigger>
                    <AccordionContent
                      className={
                        "border-l border-r text-black bg-gray-100 pb-0 " +
                        (index === options.length - 1
                          ? " rounded-b-sm border-b-gray-100"
                          : "")
                      }
                    >
                      {option.content}
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          );
        }}
      />
    </div>
  );
}
