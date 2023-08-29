"use client";
import { useState, useEffect } from "react";

// constant
import {
  DEFAULT_CARD,
  HEADER_LIST,
  SEARCH_BY_LIST,
  CARD_TYPE_LIST,
} from "@/utils/constant/card";
import { DEFAULT_ACQUIRING, STATUS_LIST } from "@/utils/constant/acquirer";

// Icons
import { BsCreditCardFill } from "react-icons/bs";

// Components
import FormCardModal from "@/app/card/components/FormCardModal";
import TableCard from "@/app/card/components/TableCard";
import FilterDropdown from "@/components/FilterDropdown";
import SearchBySelect from "@/components/SearchBySelect";
import LoadingModal from "@/components/LoadingModal";
import YesNoModal from "@/components/YesNoModal";
import SpeedDial from "@/components/SpeedDial";
import Toast from "@/components/Toast";

// Apis
import { createCard, deleteCard, getAllCards, updateCard } from "@/apis/card";
import { getAllAcquirers } from "@/apis/acquirer";
import RefreshBtn from "@/components/RefreshBtn";

function Page() {
  const [isCardTypeDropdownOpen, setIsCardTypeDropdownOpen] = useState(false);
  const [filterCardType, setFilterCardType] = useState(CARD_TYPE_LIST[0].title);

  const [searchText, setTextSearch] = useState("");
  const [searchBy, setSearchBy] = useState(SEARCH_BY_LIST[0]);
  const [isSelectOpen, setIsSelectOpen] = useState(false);

  const [searchList, setSearchList] = useState([""]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const [cardRadio, setCardRadio] = useState("");
  const [isUseFiltered, setIsUseFiltered] = useState(false);

  const [acquiringList, setAcquiringList] = useState([DEFAULT_ACQUIRING]);
  const [cardList, setCardList] = useState([DEFAULT_CARD]);
  const [cardDisplay, setCardDisplay] = useState([DEFAULT_CARD]);
  const [cardFiltered, setCardFiltered] = useState([DEFAULT_CARD]);

  const [defaultCard, setDefaultCard] = useState(DEFAULT_CARD);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [modalType, setModalType] = useState("add");

  const [isYesNoModalOpen, setIsYesNoModalOpen] = useState(false);
  const [isSpeedDialOpen, setIsSpeedDialOpen] = useState(false);
  const [isLoadingModalOpen, setIsLoadingModalOpen] = useState(true);

  const [isToastOpen, setIsToastOpen] = useState(false);
  const [toastTitle, setToastTitle] = useState("");
  const [toastType, setToastType] = useState("success");

  useEffect(() => {
    if (isUseFiltered) {
      setCardDisplay(cardFiltered);
      const listData = getListBySelect(cardFiltered);
      setSearchList(listData);
    } else {
      setCardDisplay(cardList);
      setSearchList(getListBySelect(cardList));
    }
  }, [isUseFiltered, cardFiltered, cardList, searchBy]);

  const hanleFilterCardType = (cardList: any[]) => {
    return cardList.filter((card: any) => {
      return card.cardType === filterCardType;
    });
  };

  const hanleFilterTextSearch = (cardList: any[]) => {
    return cardList.filter((card: any) => {
      if (searchBy.name === "Acqurer name") {
        return getAcqNameById(card.acquirerId)
          .toLowerCase()
          .includes(searchText.toLowerCase());
      } else if (searchBy.name === "Holder name") {
        return card.cardHolderName
          .toLowerCase()
          .includes(searchText.toLowerCase());
      } else if (searchBy.name === "Acqurer ID") {
        return card.acquirerId.toLowerCase().includes(searchText.toLowerCase());
      }
    });
  };

  const getListBySelect = (cardList: any[]) => {
    const listData: string[] = [];

    for (const card of cardList) {
      if (searchBy.name === "Acqurer name") {
        let data = getAcqNameById(card.acquirerId);
        if (!listData.includes(data)) {
          listData.push(data);
        }
      } else if (searchBy.name === "Holder name") {
        let data = card.cardHolderName;
        if (!listData.includes(data)) {
          listData.push(data);
        }
      } else if (searchBy.name === "Acqurer ID") {
        let data = card.acquirerId;
        if (!listData.includes(data)) {
          listData.push(data);
        }
      }
    }

    return listData;
  };

  const handleClickDelete = () => {
    setIsYesNoModalOpen(true);
  };

  const handleDeleted = async (id: string = cardRadio) => {
    setIsYesNoModalOpen(false);

    // handle removing
    setIsLoadingModalOpen(true);
    const res: any = await deleteCard(id);
    setIsLoadingModalOpen(false);

    if (res.status < 200 || res.status >= 300) {
      setToastType("danger");
      setToastTitle("Something went wrong!");
      setIsToastOpen(true);
    } else {
      const filteredList = cardList.filter((card: any) => {
        return card.cardNumber !== id;
      });
      setCardList(filteredList);

      // handle deleted
      setCardRadio("");
      setToastType("success");
      setToastTitle("Deleted successfully!");
      setIsToastOpen(true);
    }
  };

  const handleClickEdit = (id: string = cardRadio) => {
    setIsSpeedDialOpen(false);

    // handle pre edit
    const card = cardList.filter((card: any) => {
      return card.cardNumber === id;
    });

    setDefaultCard(card[0]);
    setModalType("edit");
    setIsFormModalOpen(true);
  };

  const handleEdited = async (newData: any, cardNumber: string) => {
    setIsFormModalOpen(false);

    // handle editing
    setIsLoadingModalOpen(true);
    const res: any = await updateCard(cardNumber, newData);
    setIsLoadingModalOpen(false);

    if (res.status < 200 || res.status >= 300) {
      setToastType("danger");
      setToastTitle("Something went wrong!");
      setIsToastOpen(true);
    } else {
      const filteredList = cardList.filter((card: any) => {
        return card.cardNumber !== cardNumber;
      });
      setCardList([...filteredList, res.data]);

      // handle edited
      setCardRadio("");
      setToastType("success");
      setToastTitle("Edited successfully!");
      setIsToastOpen(true);
    }
  };

  const handleClickAdd = () => {
    setIsSpeedDialOpen(false);

    // handle pre add
    setDefaultCard(DEFAULT_CARD);
    setModalType("add");
    setIsFormModalOpen(true);
  };

  const handleAdded = async (newData: any) => {
    setIsFormModalOpen(false);

    // handle adding
    setIsLoadingModalOpen(true);
    const res: any = await createCard(newData);
    setIsLoadingModalOpen(false);

    if (res.status < 200 || res.status >= 300) {
      setToastType("danger");
      setToastTitle("Something went wrong!");
      setIsToastOpen(true);
    } else {
      setCardList([...cardList, res.data]);

      // handle added
      setDefaultCard(DEFAULT_CARD);
      setToastType("success");
      setToastTitle("Added successfully!");
      setIsToastOpen(true);
    }
  };

  const getAcqNameById = (acqId: string) => {
    const acqObj = acquiringList?.filter((acqObj: any) => {
      return acqObj.id === acqId;
    });
    return acqObj[0]?.name ?? "";
  };

  const getAcqIdByName = (acqName: string) => {
    const acqObj = acquiringList?.filter((acqObj: any) => {
      return acqObj.name.toLowerCase() === acqName.toLowerCase();
    });
    return acqObj[0]?.id ?? "";
  };

  const initData = async () => {
    const [resCard, resAcqu]: [any, any] = await Promise.all([
      getAllCards(),
      getAllAcquirers(),
    ]);

    if (
      resCard.status < 200 ||
      resCard.status >= 300 ||
      resAcqu.status < 200 ||
      resAcqu.status >= 300
    ) {
      setToastType("danger");
      setToastTitle("Something went wrong!");
      setIsToastOpen(true);
      setIsLoadingModalOpen(false);
    } else {
      setCardList(resCard.data);
      setAcquiringList(resAcqu.data);

      setToastType("success");
      setToastTitle("Loaded successfully!");
      setIsToastOpen(true);
      setIsLoadingModalOpen(false);
    }
  };

  //? ---------- Clear and Refresh data ----------
  const refreshAndClear = async () => {
    // handle clear
    setFilterCardType(CARD_TYPE_LIST[0].title);
    setTextSearch("");
    setCardRadio("");

    // handle refresh
    setIsLoadingModalOpen(true);
    await initData();
  };

  useEffect(() => {
    initData();
  }, []);

  //? Filter
  useEffect(() => {
    let filteredList = cardList;

    if (filterCardType !== CARD_TYPE_LIST[0].title) {
      filteredList = hanleFilterCardType(filteredList);
    }

    if (searchText !== "") {
      filteredList = hanleFilterTextSearch(filteredList);
    }

    if (filterCardType !== CARD_TYPE_LIST[0].title || searchText !== "") {
      setIsUseFiltered(true);
    } else {
      setIsUseFiltered(false);
    }

    setCardFiltered(filteredList);
  }, [filterCardType, searchText, cardList]);

  return (
    <div className="h-screen w-screen relative">
      <LoadingModal
        isLoadingModalOpen={[isLoadingModalOpen, setIsLoadingModalOpen]}
      />
      <YesNoModal
        isYesNoModalOpen={[isYesNoModalOpen, setIsYesNoModalOpen]}
        handleSuccess={handleDeleted}
        itemSelected={cardRadio}
      />
      <FormCardModal
        isFormModalOpen={[isFormModalOpen, setIsFormModalOpen]}
        typeForm={modalType}
        data={defaultCard}
        cardTypeList={CARD_TYPE_LIST}
        acquiringList={acquiringList}
        statusList={STATUS_LIST}
        handleAdded={handleAdded}
        handleEdited={handleEdited}
        getAcqNameById={getAcqNameById}
        getAcqIdByName={getAcqIdByName}
      />
      <Toast
        isToastOpen={[isToastOpen, setIsToastOpen]}
        type={toastType}
        title={toastTitle}
      />

      <SpeedDial
        isSpeedDialOpen={[isSpeedDialOpen, setIsSpeedDialOpen]}
        handleClickAdd={handleClickAdd}
        handleClickEdit={handleClickEdit}
        handleClickDelete={handleClickDelete}
        itemSelected={cardRadio}
      />

      <div className="relative sm:ms-64 translate-y-16  ">
        <div className="w-full  sticky -top-2 pt-3   shadow-md bg-white">
          <div className=" justify-between pt-2 pb-4 mx-5 flex-row md:flex  ">
            <div className=" flex space-x-3 ">
              <FilterDropdown
                filter={[filterCardType, setFilterCardType]}
                isDropdownOpen={[
                  isCardTypeDropdownOpen,
                  setIsCardTypeDropdownOpen,
                ]}
                dropdownList={CARD_TYPE_LIST}
                DropdownIcon={BsCreditCardFill}
                name="cardType"
              />

              <SearchBySelect
                searchByList={SEARCH_BY_LIST}
                searchList={searchList}
                searchText={[searchText, setTextSearch]}
                searchBy={[searchBy, setSearchBy]}
                isSelectOpen={[isSelectOpen, setIsSelectOpen]}
                isSearchOpen={[isSearchOpen, setIsSearchOpen]}
                inputClassName=" w-72"
                placeholder="Search"
              />
            </div>

            <RefreshBtn
              isLoading={isLoadingModalOpen}
              onClick={() => refreshAndClear()}
            />
          </div>
        </div>

        <TableCard
          cardRadio={[cardRadio, setCardRadio]}
          isLoadingModalOpen={isLoadingModalOpen}
          cardDisplay={cardDisplay}
          headerList={HEADER_LIST}
          statusList={STATUS_LIST}
          cardTypeList={CARD_TYPE_LIST}
          getAcqNameById={getAcqNameById}
        />
      </div>
    </div>
  );
}

export default Page;
