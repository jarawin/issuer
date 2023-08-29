"use client";
import { useState, useEffect } from "react";

// Icons
import { IoMdClose } from "react-icons/io";

// Components
import TextInput from "@/components/TextInput";
import SearchAcq from "@/app/acquirer/components/SearchAcq";
import SelectInput from "@/components/SelectInput";

// Utils
import {
  dateArrayToString,
  formatDateWithYear,
} from "@/utils/formatter/string";

function FormCardModal(props: any) {
  const [isFormModalOpen, setIsFormModalOpen] = props.isFormModalOpen;
  const {
    typeForm,
    data,
    cardTypeList,
    statusList,
    handleAdded,
    handleEdited,
    acquiringList,
    getAcqNameById,
    getAcqIdByName,
  } = props;

  const [btnTitle, setBtnTitle] = useState("Save all");

  // Form
  const [acqId, setAcqId] = useState(data.acquirerId ?? "");
  const [holderName, setHolderName] = useState(data.cardHolderName ?? "");
  const [cardType, setCardType] = useState(data.cardType ?? "Visa");
  const [status, setStatus] = useState(data.CardStatus ?? "pending");
  const [balance, setBalance] = useState(data.balance ?? 0);
  const [limit, setLimit] = useState(data.creditLimit ?? 20000);
  const [overdue, setOverdue] = useState(data.overdue ?? 0);

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [textAcq, setTextAcq] = useState(getAcqNameById(data.acquirerId) ?? "");
  const [acqDisplay, setAcqDisplay] = useState(acquiringList ?? []);

  const handleBlurSearch = () => {
    setTimeout(() => {
      setTextAcq((prev: any) => {
        const acqId = getAcqIdByName(prev);

        if (acqId === "") {
          setAcqId(data.acquirerId);
          setTextAcq(getAcqNameById(data.acquirerId));
        } else {
          setAcqId(acqId);
          setTextAcq(getAcqNameById(acqId));
        }
        return prev;
      });
    }, 200);
  };

  const getDateDisplay = (date: any) => {
    if (typeForm === "add") {
      return formatDateWithYear(0);
    } else {
      return dateArrayToString(date);
    }
  };

  useEffect(() => {
    if (textAcq === "") {
      setAcqDisplay(acquiringList);
    } else {
      setAcqDisplay(
        acquiringList.filter((item: any) =>
          item.name.toLowerCase().includes(textAcq.toLowerCase())
        )
      );
    }
  }, [textAcq]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    switch (typeForm) {
      case "add":
        handleAdded({
          acquirerId: acqId ?? "",
          cardHolderName: holderName ?? "",
          cardType: cardType ?? "Visa",
          cardStatus: status ?? "pending",
          balance: balance ?? 0,
          creditLimit: limit ?? 20000,
        });
        break;
      case "edit":
        handleEdited(
          {
            acquirerId: acqId ?? "",
            cardHolderName: holderName ?? "",
            cardType: cardType ?? "Visa",
            cardStatus: status ?? "pending",
            balance: balance ?? 0,
            creditLimit: limit ?? 20000,
            overdue: overdue ?? 0,
          },
          data.cardNumber
        );
        break;
    }
  };

  useEffect(() => {
    setAcqDisplay(acquiringList);

    setTextAcq(getAcqNameById(data.acquirerId));
    setAcqId(data.acquirerId);

    setHolderName(data.cardHolderName);
    setCardType(data.cardType);
    setStatus(data.status);
    setBalance(data.balance);
    setLimit(data.creditLimit);
    setOverdue(data.overdue);
  }, [data, isFormModalOpen, acquiringList]);

  useEffect(() => {
    switch (typeForm) {
      case "add":
        setBtnTitle("Create");
        break;
      case "edit":
        setBtnTitle("Save all");
        break;
    }
  }, [typeForm, btnTitle]);

  return (
    <div
      className={
        (!isFormModalOpen ? "hidden" : "") +
        " grid place-items-center justify-center z-50  items-center justify-items-center relative"
      }
      style={{ opacity: isFormModalOpen ? 1 : 0 }}
    >
      <div className="fixed inset-0 z-50 bg-black bg-opacity-50 "></div>

      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div
          className={
            (isSearchOpen ? "" : "hidden") +
            " absolute z-60  h-screen w-screen top-0 left-0 "
          }
          onClick={() => {
            setIsSearchOpen(false);
          }}
        ></div>

        <div className="relative w-full max-w-2xl max-h-full ">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-black dark:text-white capitalize">
                {`${typeForm} card `}
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={() => setIsFormModalOpen(false)}
              >
                <IoMdClose className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-6 gap-6">
                {/* Card number */}
                <TextInput
                  value={[data.cardNumber ?? "", () => {}]}
                  hidden={typeForm === "add"}
                  placeholder={""}
                  label={"Card number"}
                  type={"text"}
                  disabled
                />

                {/* Cvv */}
                <TextInput
                  value={[data.cvv ?? "", () => {}]}
                  hidden={typeForm === "add"}
                  placeholder={""}
                  label={"Cvv"}
                  type={"text"}
                  disabled
                />

                {/* Create date */}
                <TextInput
                  value={[getDateDisplay(data.createDate) ?? "", () => {}]}
                  placeholder={""}
                  label={"Create date"}
                  type={"text"}
                  disabled
                />

                {/* Exp date */}
                <TextInput
                  value={[getDateDisplay(data.expirationDate) ?? "", () => {}]}
                  placeholder={""}
                  label={"Exp date"}
                  type={"text"}
                  disabled
                />

                {/* Acquirer id */}
                <SearchAcq
                  textAcq={[textAcq, setTextAcq]}
                  isSearchOpen={[isSearchOpen, setIsSearchOpen]}
                  handleBlurSearch={handleBlurSearch}
                  getAcqNameById={getAcqNameById}
                  setAcqId={setAcqId}
                  cardTypeList={cardTypeList ?? []}
                  acqDisplay={acqDisplay}
                  label={"Acquirer name"}
                  required
                />

                {/* Holder name */}
                <TextInput
                  value={[holderName, setHolderName]}
                  placeholder={data.cardHolderName ?? ""}
                  label={"Holder name"}
                  type={"text"}
                  required
                />

                {/* Balance */}
                <TextInput
                  value={[balance, setBalance]}
                  placeholder={data.balance ?? ""}
                  label={"Balance"}
                  type={"text"}
                  required
                />

                {/* Limit */}
                <TextInput
                  value={[limit, setLimit]}
                  placeholder={data.creditLimit ?? 20000}
                  label={"Limit"}
                  type={"text"}
                  required
                />

                {/* Card type */}
                <SelectInput
                  label={"Card type"}
                  value={[cardType, setCardType]}
                  list={cardTypeList.slice(1) ?? []}
                  required
                />

                {/* overdue */}
                <TextInput
                  label={"Overdue"}
                  value={[overdue, setOverdue]}
                  disabled={typeForm === "add"}
                  required={typeForm === "edit"}
                  placeholder={data.overdue ?? 0}
                  type={"number"}
                />

                {/* status */}
                <SelectInput
                  label={"Status"}
                  value={[status, setStatus]}
                  disabled={typeForm === "add"}
                  required={typeForm === "edit"}
                  list={statusList}
                />
              </div>
            </div>

            <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600 justify-end">
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 capitalize"
                onClick={handleSubmit}
              >
                {btnTitle}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormCardModal;
