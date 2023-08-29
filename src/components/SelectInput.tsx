import React from "react";

function SelectInput(props: any) {
  const [value, setValue] = props.value;
  const { label, disabled, required, list } = props;
  return (
    <div className="col-span-6 sm:col-span-3">
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white capitalize">
        {`${label} ${required ? "*" : ""}`}
      </label>
      <select
        className=" disabled:bg-gray-200 bg-gray-50  border border-gray-300  text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={disabled}
        required={required}
      >
        {list.map((item: any, idx: number) => (
          <option key={idx} value={item.title} className="capitalize">
            {item.title}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectInput;
