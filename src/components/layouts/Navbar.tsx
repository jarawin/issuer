import Image from "next/image";

// Icons
import { HiMenuAlt2 } from "react-icons/hi";
import { BsFillPersonFill } from "react-icons/bs";

function Navbar(props: any) {
  const [isUserOptionOpen, setIsUserOptionOpen] = props.userOption;
  const [isSidebarOpen, setIsSidebarOpen] = props.sideBar;
  const { header, user, profileDropdownList } = props;

  return (
    <div className="fixed top-0 z-40 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start">
            <button
              type="button"
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <HiMenuAlt2 className="w-6 h-6" />
            </button>

            <a className="flex ml-2 md:mr-24">
              <header.icon className=" w-8 h-8 mr-3 text-blue-800" />
              <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                {header.title}
              </span>
            </a>
          </div>

          <div
            className=" absolute z-10 top-0 left-0 w-full h-screen "
            onClick={() => setIsUserOptionOpen(!isUserOptionOpen)}
            hidden={!isUserOptionOpen}
          ></div>

          <div className="flex items-center">
            <div className="flex items-center ml-3">
              <div>
                <button
                  type="button"
                  className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                  onClick={() => setIsUserOptionOpen(!isUserOptionOpen)}
                >
                  <Image
                    className="w-8 h-8 rounded-full"
                    src={user.image}
                    alt={user.name}
                    width={32}
                    height={32}
                  />
                </button>
              </div>

              <div
                hidden={!isUserOptionOpen}
                className={
                  "z-50  m-4 mt-6 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600 absolute top-0 right-0"
                }
              >
                <div className="px-4 py-3" role="none">
                  <div className="flex items-center">
                    <BsFillPersonFill className="w-4 h-4 mr-2 text-gray-400" />
                    <p className="text-sm text-gray-900 dark:text-white">
                      {user.name}
                    </p>
                  </div>
                  <p className="text-xs font-medium text-gray-900 truncate dark:text-gray-300">
                    {user.email}
                  </p>
                </div>

                <ul className="py-1" role="none">
                  {profileDropdownList.map((item: any, idx: number) => (
                    <li key={idx}>
                      <a
                        href={item.href}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 capitalize dark:hover:text-white"
                        role="menuitem"
                      >
                        {item.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
