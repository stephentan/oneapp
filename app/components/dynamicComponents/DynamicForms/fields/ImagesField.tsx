import { PlusIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import { ModelDefinitionFieldType } from "~/lib/types/ModelDefinitionType";

export default function ImagesField({
  type = "text",
  label,
  fieldName,
  hookField,
  isRequired,
  placeholder,
  note,
}: {
  type: string;
  label: string;
  fieldName: string;
  fieldObject: ModelDefinitionFieldType;
  defaultValue: string | undefined;
  hookField: any;
  isRequired: boolean;
}) {
  const { onChange, value, ...field } = hookField;
  const [uploadedFileIndexes, setUploadedFileIndexes] = useState([0]);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [currentUploadIndex, setCurrentUploadIndex] = useState(0);
  const [deletedImages, setDeletedImages] = useState([]);

  return (
    <div>
      <input
        type="hidden"
        name="deletedImages"
        value={deletedImages.join(",")}
      />
      <span className="block text-sm font-medium text-gray-500">{label}</span>
      <div className="mt-2 flex">
        {value?.length > 0 ? (
          <>
            {value?.map((entry, index) => {
              if (deletedImages.indexOf(entry.id) >= 0) {
                return <></>;
              }
              return (
                <div key={index} className="relative">
                  <span
                    onClick={() => {
                      setDeletedImages([...deletedImages, entry.id]);
                    }}
                  >
                    <XMarkIcon
                      className="absolute right-2 top-1 h-5 w-5 cursor-pointer rounded-full border border-gray-400 bg-white text-gray-400 shadow-sm"
                      aria-hidden="true"
                    />
                  </span>
                  <img
                    alt=""
                    key={index}
                    id={"output" + entry}
                    className={"mr-2 inline h-20 w-20"}
                    src={`/getimage/${entry.image.id}/600`}
                  />
                </div>
              );
            })}
          </>
        ) : null}

        {uploadedImages.map((entry, index) => {
          // if (index < uploadedFiles.length - 1) {
          return (
            <div key={index} className="relative">
              <span
                onClick={() => {
                  const indexForUploadedFileIndexes =
                    uploadedFileIndexes.indexOf(entry.index);
                  uploadedFileIndexes.splice(indexForUploadedFileIndexes, 1);
                  setUploadedFileIndexes([...uploadedFileIndexes]);
                  uploadedImages.splice(index, 1);

                  setUploadedImages([...uploadedImages]);
                }}
              >
                <XMarkIcon
                  className="absolute right-1 top-1 h-5 w-5 cursor-pointer rounded-full border border-gray-400 bg-white text-gray-400 shadow-sm"
                  aria-hidden="true"
                />
              </span>
              <img
                alt=""
                key={index}
                id={"output" + entry?.index}
                className={"inline h-20 w-20"}
                src={entry.url}
              />
            </div>
          );
        })}

        <div
          onClick={() => {
            // setBankAccountId(entry.id);
            document
              .getElementById(
                fieldName + uploadedFileIndexes[uploadedFileIndexes.length - 1],
              )
              ?.click();
          }}
          className="cursor-pointer items-center rounded-md   border  font-medium leading-4 text-gray-200 shadow-sm focus:outline-none "
        >
          <PlusIcon className="-ml-0.5  h-20 w-20" aria-hidden="true" />
        </div>

        {uploadedFileIndexes.map((entry) => {
          return (
            <input
              key={entry}
              type="file"
              name={fieldName}
              id={fieldName + entry}
              className="hidden"
              accept=".jpg,.jpeg,.png,.png"
              onChange={(evt) => {
                // const output = document.getElementById(
                //   "output" + entry
                // );
                const url = URL.createObjectURL(evt.target.files[0]);
                setUploadedImages([
                  ...uploadedImages,
                  {
                    index: currentUploadIndex,
                    url,
                  },
                ]);
                setUploadedFileIndexes([
                  ...uploadedFileIndexes,
                  currentUploadIndex + 1,
                ]);
                setCurrentUploadIndex(currentUploadIndex + 1);
                onChange(value || []);
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
