import Image from "next/image";

// Icons
import { SiSpinrilla } from "react-icons/si";
import Flags from "country-flag-icons/react/3x2";

function TableAcq(props: any) {
  const [acquirerRadio, setAcquirerRadio] = props.acquirerRadio;
  const {
    isLoadingModalOpen,
    acquirerDisplay,
    countryList,
    statusList,
    headerList,
  } = props;

  const getStatusColor = (status: string) => {
    const statusObj = statusList.filter((statusObj: any) => {
      return statusObj?.title?.toLowerCase() === status?.toLowerCase();
    });
    return statusObj[0]?.color;
  };

  const getIcon = (country: string) => {
    const CountryObj = countryList.filter((countryObj: any) => {
      return countryObj?.title?.toLowerCase() === country?.toLowerCase();
    });
    const iconName = CountryObj[0]?.iconName;
    const Flag = Flags[iconName?.toUpperCase() as keyof typeof Flags];

    if (iconName) {
      return <Flag title={country} className="w-4 h-4" />;
    } else {
      return <></>;
    }
  };

  return (
    <>
      <div className="flex-grow overflow-auto">
        <table className=" text-sm text-left text-gray-500 dark:text-gray-400 w-full overflow-auto overflow-x-auto table-auto">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400 sm:rounded-lg">
            <tr>
              {headerList.map((header: any, idx: number) => (
                <th key={idx} scope="col" className="px-6 py-3">
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {isLoadingModalOpen ? (
              <tr className="border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="px-6 py-4">
                  <SiSpinrilla className="w-4 h-4 text-gray-600 mx-1 animate-spin" />
                </td>
              </tr>
            ) : (
              acquirerDisplay?.map((acquirer: any, idx: number) => (
                <tr
                  key={idx}
                  className={
                    (acquirerRadio === acquirer.id
                      ? "bg-gray-50 dark:bg-gray-600"
                      : "") +
                    "  border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  }
                  onClick={() =>
                    acquirerRadio === acquirer.id
                      ? setAcquirerRadio("")
                      : setAcquirerRadio(acquirer.id)
                  }
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center ">
                      <input
                        id="checkbox-all"
                        type="radio"
                        name="aquiring"
                        value={acquirerRadio}
                        checked={acquirerRadio === acquirer.id}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded  dark:bg-gray-700 dark:border-gray-600"
                        readOnly={true}
                      />
                    </div>
                  </td>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white uppercase"
                  >
                    {acquirer.id}
                  </th>
                  <td className="px-6 py-4 capitalize">{acquirer.name}</td>
                  <td className="px-6 py-4 flex space-x-2 capitalize whitespace-nowrap">
                    {getIcon(acquirer.country)}
                    <span className="whitespace-nowrap">
                      {acquirer.country}
                    </span>
                  </td>
                  <td className="px-6 py-4 capitalize">{acquirer.category}</td>
                  <td className="px-6 py-4 capitalize">
                    <div className="flex items-center">
                      <div
                        className="h-2.5 w-2.5 rounded-full mr-2"
                        style={{
                          backgroundColor: getStatusColor(acquirer.status),
                        }}
                      ></div>{" "}
                      {acquirer.status}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {acquirerDisplay?.length === 0 && (
        <div className="flex justify-center items-center">
          <Image src="/nodata.svg" alt="No data" width={500} height={500} />
        </div>
      )}
    </>
  );
}

export default TableAcq;
