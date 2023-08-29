import React from "react";
import { ImSearch } from "react-icons/im";

function TextInputSearch(props: any) {
  const [textSearch, setTextSearch] = props.textSearch;

  return (
    <div className=" flex space-x-3 md:mt-0 mt-3 justify-end w-full md:ml-3 ">
      <div className="relative w-full flex">
        <div className="absolute left-0 inset-y-0  flex items-center pl-3   pointer-events-none ">
          <ImSearch className="w-4 h-4 text-gray-400 dark:text-gray-400" />
        </div>

        <input
          type="text"
          className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-full max-w-md bg-white dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-40 dsark:text-white focus:outline-none  "
          placeholder="Search by name"
          value={textSearch}
          onChange={(e) => setTextSearch(e.target.value)}
        />
      </div>
    </div>
  );
}

export default TextInputSearch;
