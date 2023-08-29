"use client";
import * as XLSX from "xlsx";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

// icons
import { TbTableImport, TbTableExport } from "react-icons/tb";
import { GrStatusCriticalSmall } from "react-icons/gr";

// Constants
import {
  HEADER_LIST,
  DEFAULT_TRANSACTION,
  STATUS_LIST,
  SEARCH_BY_LIST,
  COMPARE_LIST,
} from "@/utils/constant/transaction";
import { DEFAULT_ACQUIRING } from "@/utils/constant/acquirer";

// Components
import Toast from "@/components/Toast";
import RefreshBtn from "@/components/RefreshBtn";
import LoadingModal from "@/components/LoadingModal";
import TableTrans from "@/app/transaction/components/TableTrans";
import SearchBySelect from "@/components/SearchBySelect";
import ButtonIcon from "@/components/ButtonIcon";
import DateRangePicker from "@/components/DateRangePicker";

// Apis
import { getAllTransactions } from "@/apis/transaction";
import { getAllAcquirers } from "@/apis/acquirer";

// Utils
import {
  strDate2Date,
  dateArrayToString,
  timeArrayToString,
} from "@/utils/formatter/string";
import FilterDropdown from "@/components/FilterDropdown";

function Page() {
  const searchParams = useSearchParams();
  const router = useRouter();

  //# ---------- Aquirer data ----------
  const [acquiringList, setAcquiringList] = useState([DEFAULT_ACQUIRING]);
  const [transactionList, setTransactionList] = useState([DEFAULT_TRANSACTION]);
  const [transactionDisplay, setTransactionDisplay] = useState([
    DEFAULT_TRANSACTION,
  ]);
  const [transactionFiltered, setTransactionFiltered] = useState([
    DEFAULT_TRANSACTION,
  ]);

  //# ---------- Filter ----------
  const [isUseQueryParam, setIsUseQueryParam] = useState(false);

  const [isUseFiltered, setIsUseFiltered] = useState(false);
  const [transactionRadio, setTransactionRadio] = useState("");

  const [searchText, setSearchText] = useState("");
  const [searchList, setSearchList] = useState([""]);
  const [searchBy, setSearchBy] = useState(SEARCH_BY_LIST[0]);
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const [numberText, setNumberText] = useState("");
  const [numbersList, setNumbersList] = useState([""]);
  const [compareBy, setCompareBy] = useState(COMPARE_LIST[0]);
  const [isSelectOpen2, setIsSelectOpen2] = useState(false);
  const [isSearchOpen2, setIsSearchOpen2] = useState(false);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  //# ---------- Modal ----------
  const [isLoadingModalOpen, setIsLoadingModalOpen] = useState(true);

  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState(STATUS_LIST[0].title);

  //# ---------- Toast ----------
  const [isToastOpen, setIsToastOpen] = useState(false);
  const [toastTitle, setToastTitle] = useState("");
  const [toastType, setToastType] = useState("success");

  const getAcqNameById = (acqId: string) => {
    const acqObj = acquiringList?.filter((acqObj: any) => {
      return acqObj.id === acqId;
    });
    return acqObj[0]?.name ?? "";
  };

  //? ---------- Handle Filter ----------
  const hanleFilterTextSearch = (transList: any[]) => {
    return transList.filter((tran: any) => {
      if (searchBy.name === "Acqurer name") {
        return getAcqNameById(tran.acquirerId)
          .toLowerCase()
          .includes(searchText.toLowerCase());
      } else if (searchBy.name === "Card number") {
        return tran.cardNumber.toString().includes(searchText.toString());
      } else if (searchBy.name === "Request ID") {
        return tran.requestId
          .toString()
          .toLowerCase()
          .includes(searchText.toString().toLowerCase());
      } else if (searchBy.name === "Transaction ID") {
        return tran.transactionId
          .toString()
          .toLowerCase()
          .includes(searchText.toString().toLowerCase());
      } else if (searchBy.name === "Acqurer ID") {
        return tran.acquirerId
          .toString()
          .toLowerCase()
          .includes(searchText.toString().toLowerCase());
      }
    });
  };

  const hanleFilterNumberSearch = (transList: any[]) => {
    return transList.filter((tran: any) => {
      if (compareBy.name === ">") {
        return tran.amount > parseInt(numberText);
      } else if (compareBy.name === "<") {
        return tran.amount < parseInt(numberText);
      } else if (compareBy.name === "=") {
        return tran.amount === parseInt(numberText);
      } else if (compareBy.name === ">=") {
        return tran.amount >= parseInt(numberText);
      } else if (compareBy.name === "<=") {
        return tran.amount <= parseInt(numberText);
      } else if (compareBy.name === "!=") {
        return tran.amount !== parseInt(numberText);
      }
    });
  };

  const updateFiltered = () => {
    let filteredList = transactionList;

    if (searchText !== "") {
      filteredList = hanleFilterTextSearch(filteredList);
    }

    if (numberText !== "") {
      filteredList = hanleFilterNumberSearch(filteredList);
    }

    if (startDate !== "" && endDate !== "") {
      filteredList = filteredList.filter((tran: any) => {
        const date = strDate2Date(
          dateArrayToString(tran.createDate),
          timeArrayToString(tran.createTime)
        );
        return (
          date >= strDate2Date(startDate) &&
          date <= strDate2Date(endDate, "23:59:59")
        );
      });
    }

    if (filterStatus !== STATUS_LIST[0].title) {
      filteredList = filteredList.filter((tran: any) => {
        return tran.status === filterStatus;
      });
    }

    if (
      searchText !== "" ||
      numberText !== "" ||
      (startDate !== "" && endDate !== "") ||
      filterStatus !== STATUS_LIST[0].title
    ) {
      setIsUseFiltered(true);
    } else {
      setIsUseFiltered(false);
    }

    setTransactionFiltered(filteredList);
  };

  const selectDataDisplay = () => {
    if (isUseFiltered) {
      setTransactionDisplay(transactionFiltered);
      const data = getListBySelect(transactionFiltered);
      setSearchList(data.listData);
      setNumbersList(data.listNumber);
    } else {
      setTransactionDisplay(transactionList);
      const data = getListBySelect(transactionList);
      setSearchList(data.listData);
      setNumbersList(data.listNumber);
    }
  };

  const getListBySelect = (transList: any[]) => {
    const listData: string[] = [];
    const listNumber: string[] = [];

    for (const tran of transList) {
      let amount = tran.amount;
      if (!listNumber.includes(amount.toString())) {
        listNumber.push(amount.toString());
      }

      if (searchBy.name === "Acqurer name") {
        let data = getAcqNameById(tran.acquirerId);
        if (!listData.includes(data)) {
          listData.push(data);
        }
      } else if (searchBy.name === "Card number") {
        let data = tran.cardNumber;
        if (!listData.includes(data)) {
          listData.push(data);
        }
      } else if (searchBy.name === "Request ID") {
        let data = tran.requestId;
        if (!listData.includes(data)) {
          listData.push(data);
        }
      } else if (searchBy.name === "Transaction ID") {
        let data = tran.transactionId;
        if (!listData.includes(data)) {
          listData.push(data);
        }
      } else if (searchBy.name === "Acqurer ID") {
        let data = tran.acquirerId;
        if (!listData.includes(data)) {
          listData.push(data);
        }
      }
    }

    return { listData, listNumber };
  };

  //? ---------- Export and Import data ----------
  const handleExport = () => {
    // select data to export
    let data;
    if (isUseFiltered) {
      data = transactionFiltered;
    } else {
      data = transactionList;
    }

    // reformat date time
    data = data.map((tran: any) => {
      const date = dateArrayToString(tran.createDate);
      const time = timeArrayToString(tran.createTime);
      return {
        ...tran,
        createDate: date,
        createTime: time,
      };
    });

    // create filename
    let filename = "Transaction";
    if (searchText !== "") {
      filename += `_${searchBy.name.toUpperCase()}=${searchText}`;
    }
    if (startDate !== "" && endDate !== "") {
      filename += `_Date=${startDate}-${endDate}`;
    }

    // try to export
    try {
      const ws = XLSX.utils.json_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Transaction");
      XLSX.writeFile(wb, `${filename}.xlsx`);
    } catch (error) {
      alert(error);
    }
  };

  //? ---------- Clear and Refresh data ----------
  const refreshAndClear = async () => {
    if (isUseQueryParam) {
      router.push("/transaction");
      setTimeout(() => {
        window.location.reload();
      }, 100);
    } else {
      handleQueryParam();
    }

    // handle clear
    setFilterStatus(STATUS_LIST[0].title);
    setSearchText("");
    setTransactionRadio("");
    setStartDate("");
    setEndDate("");

    // handle refresh
    setIsLoadingModalOpen(true);
    await initData();
  };

  //? ---------- Init Data Function ----------
  const initData = async () => {
    const [resTrans, resAcqu]: [any, any] = await Promise.all([
      getAllTransactions(),
      getAllAcquirers(),
    ]);

    if (
      resTrans.status < 200 ||
      resTrans.status >= 300 ||
      resAcqu.status < 200 ||
      resAcqu.status >= 300
    ) {
      setToastType("danger");
      setToastTitle("Something went wrong!");
      setIsToastOpen(true);
      setIsLoadingModalOpen(false);
    } else {
      setTransactionList(resTrans.data);
      setAcquiringList(resAcqu.data);

      setToastType("success");
      setToastTitle("Loaded successfully!");
      setIsToastOpen(true);
      setIsLoadingModalOpen(false);
    }
  };

  const handleQueryParam = () => {
    const acquirerId = searchParams.get("acquirerId");
    const cardNumber = searchParams.get("cardNumber");
    const requestId = searchParams.get("requestId");
    const transactionId = searchParams.get("transactionId");

    if (acquirerId) {
      setSearchText(acquirerId as string);
      setSearchBy(SEARCH_BY_LIST[4]);
      setIsUseQueryParam(true);
    } else if (cardNumber) {
      setSearchText(cardNumber as string);
      setSearchBy(SEARCH_BY_LIST[1]);
      setIsUseQueryParam(true);
    } else if (requestId) {
      setSearchText(requestId as string);
      setSearchBy(SEARCH_BY_LIST[2]);
      setIsUseQueryParam(true);
    } else if (transactionId) {
      setSearchText(transactionId as string);
      setSearchBy(SEARCH_BY_LIST[3]);
      setIsUseQueryParam(true);
    } else {
      setSearchText("");
      setSearchBy(SEARCH_BY_LIST[0]);
      setIsUseQueryParam(false);
    }
  };

  //? ---------- UseEffect ----------

  //! Fetch init data
  useEffect(() => {
    initData();
  }, []);

  //! Handle query param
  useEffect(() => {
    handleQueryParam();
  }, [acquiringList, transactionList]);

  //! Filter in table
  useEffect(() => {
    updateFiltered();
  }, [
    searchText,
    numberText,
    transactionList,
    startDate,
    endDate,
    filterStatus,
  ]);

  //! Select data to display
  useEffect(() => {
    selectDataDisplay();
  }, [
    isUseFiltered,
    transactionFiltered,
    transactionList,
    searchBy,
    compareBy,
  ]);

  return (
    <div className="h-screen w-screen relative" suppressHydrationWarning>
      <LoadingModal
        isLoadingModalOpen={[isLoadingModalOpen, setIsLoadingModalOpen]}
      />
      <Toast
        isToastOpen={[isToastOpen, setIsToastOpen]}
        type={toastType}
        title={toastTitle}
      />

      <div className="relative sm:ms-64 translate-y-16 ">
        <div className="w-full  sticky -top-2 pt-3  shadow-md bg-white  space-y-3 pb-3">
          <div className=" justify-between mx-5 flex-row md:flex  ">
            <div className=" flex space-x-3 justify-start">
              <FilterDropdown
                filter={[filterStatus, setFilterStatus]}
                isDropdownOpen={[isStatusDropdownOpen, setIsStatusDropdownOpen]}
                dropdownList={STATUS_LIST}
                DropdownIcon={GrStatusCriticalSmall}
                name="status"
              />

              <SearchBySelect
                searchByList={SEARCH_BY_LIST}
                searchList={searchList}
                searchText={[searchText, setSearchText]}
                searchBy={[searchBy, setSearchBy]}
                isSelectOpen={[isSelectOpen, setIsSelectOpen]}
                isSearchOpen={[isSearchOpen, setIsSearchOpen]}
                inputClassName="w-[500px]"
                placeholder="Search"
              />
            </div>

            <div className=" space-x-2">
              <ButtonIcon icon={TbTableImport} title={"Import"} />
              <ButtonIcon
                icon={TbTableExport}
                title={"Export"}
                onClick={() => handleExport()}
              />
            </div>
          </div>

          <div className="mx-5 flex justify-between">
            <div className="flex space-x-3">
              <DateRangePicker
                startDate={[startDate, setStartDate]}
                endDate={[endDate, setEndDate]}
              />
              <SearchBySelect
                searchByList={COMPARE_LIST}
                searchList={numbersList}
                searchText={[numberText, setNumberText]}
                searchBy={[compareBy, setCompareBy]}
                isSelectOpen={[isSelectOpen2, setIsSelectOpen2]}
                isSearchOpen={[isSearchOpen2, setIsSearchOpen2]}
                inputClassName="w-[105px]"
                placeholder="Amount"
              />
            </div>

            <div className="w-fit flex space-x-2 ">
              <RefreshBtn
                isLoading={isLoadingModalOpen}
                onClick={() => refreshAndClear()}
              />
            </div>
          </div>
        </div>

        <TableTrans
          transactionRadio={[transactionRadio, setTransactionRadio]}
          isLoadingModalOpen={isLoadingModalOpen}
          transactionDisplay={transactionDisplay}
          headerList={HEADER_LIST}
          statusList={STATUS_LIST.slice(1)}
          getAcqNameById={getAcqNameById}
        />
      </div>
    </div>
  );
}

export default Page;
