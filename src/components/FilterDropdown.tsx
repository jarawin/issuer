import { MdOutlineKeyboardArrowDown } from "react-icons/md";

function FilterDropdown(props: any) {
  const [isDropdownOpen, setIsDropdownOpen] = props.isDropdownOpen;
  const [filter, setFilter] = props.filter;

  const { name, dropdownList, DropdownIcon } = props;

  return (
    <div>
      <div
        className={
          (isDropdownOpen ? "" : "hidden") +
          " absolute z-40  h-screen w-full top-0 left-0"
        }
        onClick={() => {
          setIsDropdownOpen(false);
        }}
      ></div>

      <div className=" relative">
        <button
          className={
            (filter !== dropdownList[0].title
              ? "text-blue-500 "
              : "text-gray-400") +
            " inline-flex items-center  bg-white border border-gray-300 focus:outline-none hover:bg-gray-100   font-medium rounded-lg text-sm px-3 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 w-full min-w-max"
          }
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <DropdownIcon className="w-4 h-4 mr-2.5" />

          {filter}
          <MdOutlineKeyboardArrowDown
            className={(isDropdownOpen ? " rotate-180 " : "") + " w-5 h-5 ml-2"}
          />
        </button>

        <div
          hidden={!isDropdownOpen}
          className="w-48 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600 absolute inset-auto-auto-0 m-0 transform translate-y-10 z-50 top-2 left-0 max-h-52 overflow-y-auto drop-shadow-lg"
        >
          <ul
            className="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownRadioButton"
          >
            {dropdownList.map((item: any, idx: number) => (
              <li key={idx}>
                <div
                  className=" flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600"
                  onClick={() => {
                    setFilter(item.title);
                    setIsDropdownOpen(false);
                  }}
                >
                  <input
                    checked={filter === item.title}
                    type="radio"
                    name={name}
                    value={item.title}
                    className=" w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    readOnly
                  />
                  <label
                    className={
                      (idx === 0 ? "text-gray-400" : " text-gray-900 ") +
                      " w-full ml-2 text-sm font-medium rounded dark:text-gray-300"
                    }
                  >
                    {item.title}
                  </label>
                </div>
                {idx === 0 && (
                  <hr className="mx-2 border-gray-200 dark:border-gray-600" />
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default FilterDropdown;
