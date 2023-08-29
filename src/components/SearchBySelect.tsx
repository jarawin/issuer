import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { CgClose } from "react-icons/cg";

function SearchBySelect(props: any) {
  const { searchByList, searchList, inputClassName } = props;
  const [searchText, setSearchText] = props.searchText;
  const [searchBy, setSearchBy] = props.searchBy;
  const [isSelectOpen, setIsSelectOpen] = props.isSelectOpen;
  const [isSearchOpen, setIsSearchOpen] = props.isSearchOpen;

  const handleClickSelect = (item: any) => {
    setSearchText("");
    setSearchBy(item);
    setIsSelectOpen(false);
  };

  const handleClickSearch = (item: any) => {
    setSearchText(item);
    setIsSearchOpen(false);
  };

  return (
    <div className=" flex md:mt-0 mt-3 justify-end w-full">
      <div
        className={
          (isSelectOpen || isSearchOpen ? "" : "hidden") +
          " absolute z-40  h-screen w-full top-0 left-0 "
        }
        onClick={() => {
          setIsSelectOpen(false);
          setIsSearchOpen(false);
        }}
      ></div>

      <div className="flex">
        <div className="flex relative">
          <button
            className="flex-shrink-0 z-10 inline-flex items-center px-4 text-sm font-medium text-center text-gray-600 bg-gray-50 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-0 w-fit min-w-max hover:text-gray-800"
            onClick={() => setIsSelectOpen(!isSelectOpen)}
          >
            {`${searchBy.name} `}
            <MdOutlineKeyboardArrowDown
              className={(isSelectOpen ? " rotate-180 " : "") + " w-5 h-5 ml-2"}
            />
          </button>

          <div
            className="bg-white rounded-lg shadow absolute top-2 left-0 transform translate-y-10 z-50 max-h-52 overflow-y-auto w-fit min-w-max "
            hidden={!isSelectOpen || searchByList.length === 0}
          >
            <ul className=" text-sm text-gray-600 divide-y divide-gray-100 rounded-lg ">
              {searchByList.map((item: any, idx: number) => (
                <li key={idx}>
                  <button
                    type="button"
                    className="inline-flex w-full px-4 py-2 hover:bg-gray-100"
                    onClick={() => handleClickSelect(item)}
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex relative">
          <div className="flex relative">
            <input
              type="text"
              className={
                "block p-2 z-20 text-sm text-gray-900 bg-white rounded-r-lg   border-gray-300 py-2.5 focus:outline-none focus:ring-0 focus:border-gray-300 " +
                inputClassName
              }
              placeholder={props.placeholder}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onFocus={() => setIsSearchOpen(true)}
            />

            {searchText != "" && (
              <div
                className="flex -translate-x-8 z-40 items-center justify-center text-gray-500 cursor-pointer hover:text-gray-700"
                onClick={() => setSearchText("")}
              >
                <CgClose className="w-5 h-5" />
              </div>
            )}
          </div>

          <div
            className={
              "bg-white rounded-lg shadow absolute top-2 left-0 transform translate-y-10 z-50 max-h-52 overflow-y-auto " +
              inputClassName
            }
            hidden={!isSearchOpen || searchList.length === 0}
          >
            <ul
              className=" text-sm text-gray-600 divide-y divide-gray-100 rounded-lg "
              aria-labelledby="dropdown-button"
            >
              {searchList.map((item: any, idx: number) => (
                <li key={idx}>
                  <button
                    type="button"
                    className="inline-flex w-full px-4 py-2 hover:bg-gray-100"
                    onClick={() => handleClickSearch(item)}
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchBySelect;
