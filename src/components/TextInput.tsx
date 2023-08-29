import React from "react";

function TextInput(props: any) {
  const [value, setValue] = props.value;
  const { label, placeholder, type, required, disabled, hidden } = props;

  if (!hidden) {
    return (
      <div className="col-span-6 sm:col-span-3">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          {`${label} ${required ? "*" : ""}`}
        </label>
        <input
          type={type}
          className=" bg-gray-50 disabled:bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
        />
      </div>
    );
  }
}

export default TextInput;
