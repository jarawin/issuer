"use client";
import Image from "next/image";
import { useState } from "react";

// Icons
import { SiSpinrilla } from "react-icons/si";
import { AiOutlineFieldNumber } from "react-icons/ai";

import { dateArrayToString, timeArrayToString } from "@/utils/formatter/string";

function TableTrans(props: any) {
  const [transactionRadio, setTransactionRadio] = props.transactionRadio;
  const [isShowId, setIsShowId] = useState(false);
  const {
    isLoadingModalOpen,
    transactionDisplay,
    headerList,
    statusList,
    getAcqNameById,
  } = props;

  const getStatusColor = (status: string) => {
    const statusObj = statusList.filter((statusObj: any) => {
      return statusObj.title === status;
    });
    return statusObj[0]?.color;
  };

  return (
    <>
      <div className="flex-grow overflow-auto">
        <table className=" text-sm text-left text-gray-500 dark:text-gray-400 w-full overflow-auto overflow-x-auto table-auto">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400 sm:rounded-lg">
            <tr>
              {headerList.map((header: any, idx: number) => (
                <th key={idx} scope="col" className="px-6 py-3">
                  <div className=" flex">
                    <span className="mr-2 whitespace-nowrap">
                      {header.swappable && isShowId
                        ? header.titleSwapped
                        : header.title}
                    </span>
                    {header.swappable && (
                      <AiOutlineFieldNumber
                        className={
                          (isShowId
                            ? "bg-gray-100 text-gray-900 border border-gray-500 hover:bg-gray-200"
                            : "bg-gray-800 text-gray-100 hover:bg-gray-700 ") +
                          " w-5 h-5  rounded-lg p-0.5 cursor-pointer"
                        }
                        onClick={() => setIsShowId(!isShowId)}
                      />
                    )}
                  </div>
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
              transactionDisplay?.map((transaction: any, idx: number) => (
                <tr
                  key={idx}
                  className={
                    (transactionRadio === transaction.transactionId
                      ? "bg-gray-50 dark:bg-gray-600"
                      : "") +
                    "  border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 "
                  }
                  onClick={() =>
                    transactionRadio === transaction.transactionId
                      ? setTransactionRadio("")
                      : setTransactionRadio(transaction.transactionId)
                  }
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center ">
                      <input
                        id="checkbox-all"
                        type="radio"
                        name="aquiring"
                        value={transactionRadio}
                        checked={transactionRadio === transaction.transactionId}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded  dark:bg-gray-700 dark:border-gray-600"
                        readOnly={true}
                      />
                    </div>
                  </td>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white uppercase"
                  >
                    {transaction.transactionId}
                  </th>
                  <td className="px-6 py-4 capitalize">
                    {transaction.requestId}
                  </td>
                  <td className="px-6 py-4 capitalize whitespace-nowrap">
                    {isShowId
                      ? transaction.acquirerId
                      : getAcqNameById(transaction.acquirerId)}
                  </td>
                  <td className="px-6 py-4 capitalize">
                    {transaction.cardNumber}
                  </td>
                  <td className="px-6 py-4 capitalize text-right">
                    {`${dateArrayToString(transaction.createDate)}`}
                  </td>
                  <td className="px-6 py-4 capitalize text-right">
                    {`${timeArrayToString(transaction.createTime)}`}
                  </td>
                  <td className="px-6 py-4 capitalize text-right">
                    {transaction.amount}
                  </td>
                  <td className="px-6 py-4 capitalize">
                    <div className="flex items-center">
                      <div
                        className="h-2.5 w-2.5 rounded-full mr-2"
                        style={{
                          backgroundColor: getStatusColor(transaction.status),
                        }}
                      ></div>{" "}
                      {transaction.status}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {transactionDisplay?.length === 0 && (
        <div className="flex justify-center items-center">
          <Image src="/nodata.svg" alt="No data" width={500} height={500} />
        </div>
      )}
    </>
  );
}

export default TableTrans;
