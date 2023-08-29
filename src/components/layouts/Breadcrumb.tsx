// Icons
import { AiFillHome } from "react-icons/ai";
import { HiChevronRight } from "react-icons/hi";
import { ImSpinner9 } from "react-icons/im";

function Breadcrumb(props: any) {
  const { pathList, isLoading } = props;

  return (
    <div className=" ps-5 sm:translate-x-64 w-fit right-0 translate-y-16 py-3 z-30 bg-white">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        <li className="inline-flex items-center">
          <a
            href="/"
            className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 "
          >
            <AiFillHome className="w-3 h-3 mr-2.5" />
            Home
          </a>
        </li>

        {isLoading && (
          <li>
            <div className="flex items-center">
              <HiChevronRight className="w-6 h-6 text-gray-400 mx-1" />
              <ImSpinner9 className="w-4 h-4 text-gray-600 mx-1 animate-spin" />
            </div>
          </li>
        )}

        {pathList.map((path: any, idx: number) => (
          <li key={idx}>
            <div className="flex items-center">
              <HiChevronRight className="w-6 h-6 text-gray-400 mx-1" />
              <a
                href={path.href}
                className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white capitalize"
              >
                {path.title}
              </a>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default Breadcrumb;
