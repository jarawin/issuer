"use client";
import Image from "next/image";
import { useState } from "react";

// Icons
import { SiSpinrilla } from "react-icons/si";
import { AiOutlineFieldNumber } from "react-icons/ai";

// Components
import TextWrapper from "@/components/TextWrapper";

// Utils
import {
  dateArrayToString,
  formatCreditCardNumber,
  hiddenCreditCardNumber,
} from "@/utils/formatter/string";

function TableCard(props: any) {
  const [cardRadio, setCardRadio] = props.cardRadio;
  const [isShowId, setIsShowId] = useState(false);
  const {
    isLoadingModalOpen,
    cardDisplay,
    headerList,
    statusList,
    cardTypeList,
    getAcqNameById,
  } = props;

  const getStatusColor = (status: string) => {
    const statusObj = statusList.filter((statusObj: any) => {
      return statusObj.title === status;
    });
    return statusObj[0]?.color;
  };

  const getIcon = (cardType: string) => {
    const cardTypeObj = cardTypeList.filter((cardTypeObj: any) => {
      return cardTypeObj.title.toLowerCase() === cardType.toLowerCase();
    });
    const Icon = cardTypeObj[0]?.icon;
    if (Icon) {
      return <Icon className="w-4 h-4" />;
    } else {
      return <div></div>;
    }
  };

  return (
    <>
      <div className="flex-grow  overflow-scroll">
        <table className=" text-sm text-left text-gray-500 dark:text-gray-400  overflow-auto overflow-x-auto table-auto w-screen ">
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
              cardDisplay?.map((card: any, idx: number) => (
                <tr
                  key={idx}
                  className={
                    (cardRadio === card.cardNumber
                      ? "bg-gray-50 dark:bg-gray-600"
                      : "") +
                    "  border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 flex-auto"
                  }
                  onClick={() =>
                    cardRadio === card.cardNumber
                      ? setCardRadio("")
                      : setCardRadio(card.cardNumber)
                  }
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center ">
                      <input
                        id="checkbox-all"
                        type="radio"
                        name="aquiring"
                        value={cardRadio}
                        checked={cardRadio === card.cardNumber}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded  dark:bg-gray-700 dark:border-gray-600"
                        readOnly={true}
                      />
                    </div>
                  </td>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white uppercase"
                  >
                    <TextWrapper
                      textHidden={hiddenCreditCardNumber(card.cardNumber)}
                      textVisible={formatCreditCardNumber(card.cardNumber)}
                    />
                  </th>
                  <td className="px-6 py-4 capitalize">
                    <TextWrapper textHidden={"###"} textVisible={card.cvv} />
                  </td>
                  <td className="px-6 py-4 capitalize whitespace-nowrap">
                    {isShowId
                      ? card.acquirerId
                      : getAcqNameById(card.acquirerId)}
                  </td>

                  <td className="px-6 py-4 flex space-x-2 capitalize items-center">
                    {getIcon(card.cardType)}
                    <span>{card.cardType}</span>
                  </td>

                  <td className="px-6 py-4 capitalize w-64 whitespace-nowrap">
                    {card.cardHolderName}
                  </td>
                  <td className="px-6 py-4 capitalize text-right">
                    {card.balance}
                  </td>
                  <td className="px-6 py-4 capitalize text-right">
                    {card.creditLimit}
                  </td>
                  <td className="px-6 py-4 capitalize text-right">
                    {card.overdue}
                  </td>
                  <td className="px-6 py-4 capitalize">
                    {dateArrayToString(card.createDate)}
                  </td>
                  <td className="px-6 py-4 capitalize">
                    {dateArrayToString(card.expirationDate)}
                  </td>
                  <td className="px-6 py-4 capitalize">
                    <div className="flex items-center">
                      <div
                        className="h-2.5 w-2.5 rounded-full mr-2"
                        style={{
                          backgroundColor: getStatusColor(card.cardStatus),
                        }}
                      ></div>{" "}
                      {card.cardStatus}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {cardDisplay?.length === 0 && (
        <div className="flex justify-center items-center">
          <Image src="/nodata.svg" alt="No data" width={500} height={500} />
        </div>
      )}
    </>
  );
}

export default TableCard;
