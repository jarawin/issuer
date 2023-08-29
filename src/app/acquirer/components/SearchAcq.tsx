"use client";
import { useRef } from "react";
import { IoClose } from "react-icons/io5";

function SearchAcq(props: any) {
  const acqRef = useRef<HTMLInputElement>(null);
  const [textAcq, setTextAcq] = props.textAcq;
  const [isSearchOpen, setIsSearchOpen] = props.isSearchOpen;
  const {
    handleBlurSearch,
    getAcqNameById,
    setAcqId,
    cardTypeList,
    acqDisplay,
    label,
    required,
    disabled,
  } = props;

  const handleClickSearch = (item: any) => {
    setTextAcq(getAcqNameById(item));
    setAcqId(item);
    setIsSearchOpen(false);
  };

  return (
    <div className="col-span-6 sm:col-span-3 ">
      <div className="relative">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          {`${label} ${required ? "*" : ""}`}
        </label>
        <div className="relative w-full flex">
          <button
            className={
              (textAcq === "" ? "hidden" : "") +
              " absolute right-2 inset-y-0  flex items-center pl-3"
            }
            onClick={() => {
              acqRef!.current!.focus();
              setAcqId("");
              setTextAcq("");
            }}
          >
            <IoClose className="w-5 h-5 text-gray-500 hover:text-gray-600 dark:text-gray-400" />
          </button>

          <input
            type="text"
            className="shadow-sm bg-gray-50 disabled:bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder={textAcq}
            value={textAcq}
            onChange={(e) => setTextAcq(e.target.value)}
            onFocus={() => setIsSearchOpen(true)}
            onBlur={handleBlurSearch}
            ref={acqRef}
            required={required}
            disabled={cardTypeList.length === 0 || disabled}
          />
        </div>

        <div
          className=" bg-white divide-y divide-gray-100 rounded-lg shadow w-full dark:bg-gray-700 absolute top-8 left-0 translate-y-10 z-70 max-h-52 overflow-y-auto text-start text-sm overflow-x-hidden"
          hidden={!isSearchOpen || cardTypeList.length === 0}
        >
          <ul
            className="py-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdown-button"
          >
            {acqDisplay.map((item: any, idx: number) => (
              <li key={idx}>
                <button
                  type="button"
                  className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={() => handleClickSearch(item.id)}
                >
                  {item.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SearchAcq;
