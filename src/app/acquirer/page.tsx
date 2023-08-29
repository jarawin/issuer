"use client";
import { useState, useEffect } from "react";

// Constants
import {
  DEFAULT_ACQUIRING,
  CATEGORY_LIST,
  COUNTRY_LIST,
  STATUS_LIST,
  HEADER_LIST,
} from "@/utils/constant/acquirer";

// Icons
import { HiMapPin } from "react-icons/hi2";
import { AiFillFilter } from "react-icons/ai";
import { ImSearch } from "react-icons/im";

// Components
import FormAcqModal from "@/app/acquirer/components/FormAcqModal";
import TableAcq from "@/app/acquirer/components/TableAcq";
import YesNoModal from "@/components/YesNoModal";
import LoadingModal from "@/components/LoadingModal";
import FilterDropdown from "@/components/FilterDropdown";
import SpeedDial from "@/components/SpeedDial";
import Toast from "@/components/Toast";

// Apis
import {
  createAcquirer,
  deleteAcquirer,
  getAllAcquirers,
  updateAcquirer,
} from "@/apis/acquirer";
import RefreshBtn from "@/components/RefreshBtn";
import TextInputSearch from "@/components/TextInputSearch";

function Page() {
  //# ---------- Aquirer data ----------
  const [defaultAcquirer, setDefaultAcquirer] = useState(DEFAULT_ACQUIRING);
  const [acquirerList, setAcquirerList] = useState([DEFAULT_ACQUIRING]);
  const [acquirerDisplay, setAcquirerDisplay] = useState([DEFAULT_ACQUIRING]);
  const [acquirerFiltered, setAcquirerFiltered] = useState([DEFAULT_ACQUIRING]);

  //# ---------- Filter ----------
  const [isUseFiltered, setIsUseFiltered] = useState(false);
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [filterCountry, setFilterCountry] = useState(COUNTRY_LIST[0].title);
  const [filterCategory, setFilterCategory] = useState(CATEGORY_LIST[0].title);

  //# ---------- Input feild ----------
  const [textSearch, setTextSearch] = useState("");
  const [acquirerRadio, setAcquirerRadio] = useState("");

  //# ---------- Modal & SpeedDial ----------
  const [isSpeedDialOpen, setIsSpeedDialOpen] = useState(false);
  const [isYesNoModalOpen, setIsYesNoModalOpen] = useState(false);
  const [isLoadingModalOpen, setIsLoadingModalOpen] = useState(true);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [modalType, setModalType] = useState("add");

  //# ---------- Toast ----------
  const [isToastOpen, setIsToastOpen] = useState(false);
  const [toastTitle, setToastTitle] = useState("");
  const [toastType, setToastType] = useState("success");

  //? ---------- Handle Filter ----------
  const hanleFilterCountry = (acquirerList: any[]) => {
    return acquirerList.filter((acquirer: any) => {
      return acquirer.country === filterCountry;
    });
  };

  const hanleFilterCategory = (acquirerList: any[]) => {
    return acquirerList.filter((acquirer: any) => {
      return acquirer.category === filterCategory;
    });
  };

  const hanleFilterTextSearch = (acquirerList: any[]) => {
    return acquirerList.filter((acquirer: any) => {
      return acquirer.name.toLowerCase().includes(textSearch.toLowerCase());
    });
  };

  //? ---------- Handle Click BTN ----------
  const handleClickDelete = () => {
    setIsYesNoModalOpen(true);
  };

  const handleDeleted = async (id: string = acquirerRadio) => {
    setIsYesNoModalOpen(false);

    // handle removing
    setIsLoadingModalOpen(true);
    const res: any = await deleteAcquirer(id);
    setIsLoadingModalOpen(false);

    // handle deleted
    if (res.status < 200 || res.status >= 300) {
      setToastType("danger");
      setToastTitle("Something went wrong!");
      setIsToastOpen(true);
    } else {
      const filteredList = acquirerList.filter((acquirer: any) => {
        return acquirer.id !== id;
      });
      setAcquirerList(filteredList);

      setAcquirerRadio("");
      setToastType("success");
      setToastTitle("Deleted successfully!");
      setIsToastOpen(true);
    }
  };

  const handleClickEdit = (id: string = acquirerRadio) => {
    setIsSpeedDialOpen(false);

    // handle pre edit
    const acquirer = acquirerList.filter((acquirer: any) => {
      return acquirer.id === id;
    });

    setDefaultAcquirer(acquirer[0]);
    setModalType("edit");
    setIsFormModalOpen(true);
  };

  const handleEdited = async (newData: any) => {
    setIsFormModalOpen(false);

    // handle editing
    setIsLoadingModalOpen(true);
    const res: any = await updateAcquirer(newData.id, newData);
    setIsLoadingModalOpen(false);

    if (res.status < 200 || res.status >= 300) {
      setToastType("danger");
      setToastTitle("Something went wrong!");
      setIsToastOpen(true);
    } else {
      const filteredList = acquirerList.filter((acquirer: any) => {
        return acquirer.id !== newData.id;
      });
      setAcquirerList([...filteredList, res.data]);

      // handle edited
      setAcquirerRadio("");
      setToastType("success");
      setToastTitle("Edited successfully!");
      setIsToastOpen(true);
    }
  };

  const handleClickAdd = () => {
    setIsSpeedDialOpen(false);

    // handle pre add
    setDefaultAcquirer(DEFAULT_ACQUIRING);
    setModalType("add");
    setIsFormModalOpen(true);
  };

  const handleAdded = async (newData: any) => {
    setIsFormModalOpen(false);

    // handle adding
    setIsLoadingModalOpen(true);
    const res: any = await createAcquirer(newData);
    setIsLoadingModalOpen(false);

    if (res.status < 200 || res.status >= 300) {
      setToastType("danger");
      setToastTitle("Something went wrong!");
      setIsToastOpen(true);
    } else {
      setAcquirerList([...acquirerList, res.data]);

      // handle added
      setDefaultAcquirer(DEFAULT_ACQUIRING);
      setToastType("success");
      setToastTitle("Added successfully!");
      setIsToastOpen(true);
    }
  };

  //? ---------- Clear and Refresh data ----------
  const refreshAndClear = async () => {
    // handle clear
    setFilterCategory(CATEGORY_LIST[0].title);
    setFilterCountry(COUNTRY_LIST[0].title);
    setTextSearch("");
    setAcquirerRadio("");

    // handle refresh
    setIsLoadingModalOpen(true);
    await initData();
  };

  //? ---------- Init Data Function ----------
  const initData = async () => {
    const res: any = await getAllAcquirers();

    if (res.status < 200 || res.status >= 300) {
      setToastType("danger");
      setToastTitle("Something went wrong!");
      setIsToastOpen(true);
    } else {
      setAcquirerList(res.data);
      setToastType("success");
      setToastTitle("Loaded successfully!");
      setIsToastOpen(true);
    }

    setIsLoadingModalOpen(false);
  };

  const updateFiltered = () => {
    let filteredList = acquirerList;

    if (filterCountry !== COUNTRY_LIST[0].title) {
      filteredList = hanleFilterCountry(filteredList);
    }

    if (filterCategory !== CATEGORY_LIST[0].title) {
      filteredList = hanleFilterCategory(filteredList);
    }

    if (textSearch !== "") {
      filteredList = hanleFilterTextSearch(filteredList);
    }

    if (
      filterCountry !== COUNTRY_LIST[0].title ||
      filterCategory !== CATEGORY_LIST[0].title ||
      textSearch !== ""
    ) {
      setIsUseFiltered(true);
    } else {
      setIsUseFiltered(false);
    }

    setAcquirerFiltered(filteredList);
  };

  const selectDataDisplay = () => {
    if (isUseFiltered) {
      setAcquirerDisplay(acquirerFiltered);
    } else {
      setAcquirerDisplay(acquirerList);
    }
  };

  //! Fetch init data
  useEffect(() => {
    initData();
  }, []);

  //! Filter in table
  useEffect(() => {
    updateFiltered();
  }, [filterCountry, filterCategory, textSearch, acquirerList]);

  //! Select data to display
  useEffect(() => {
    selectDataDisplay();
  }, [isUseFiltered, acquirerFiltered, acquirerList]);

  return (
    <div className="h-screen w-screen relative" suppressHydrationWarning>
      <LoadingModal
        isLoadingModalOpen={[isLoadingModalOpen, setIsLoadingModalOpen]}
      />
      <YesNoModal
        isYesNoModalOpen={[isYesNoModalOpen, setIsYesNoModalOpen]}
        handleSuccess={handleDeleted}
        itemSelected={acquirerRadio}
      />
      <FormAcqModal
        isFormModalOpen={[isFormModalOpen, setIsFormModalOpen]}
        typeForm={modalType}
        data={defaultAcquirer}
        countryList={COUNTRY_LIST}
        statusList={STATUS_LIST}
        categoryList={CATEGORY_LIST}
        handleAdded={handleAdded}
        handleEdited={handleEdited}
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
        itemSelected={acquirerRadio}
      />

      <div className="relative sm:ms-64 translate-y-16  ">
        <div className="w-full  sticky -top-2 pt-3  shadow-md bg-white">
          <div className=" justify-between pt-2 pb-4 mx-5 flex-row md:flex  ">
            <div className=" flex space-x-3 ">
              <FilterDropdown
                filter={[filterCountry, setFilterCountry]}
                isDropdownOpen={[
                  isCountryDropdownOpen,
                  setIsCountryDropdownOpen,
                ]}
                dropdownList={COUNTRY_LIST}
                DropdownIcon={HiMapPin}
                name="country"
              />
              <FilterDropdown
                filter={[filterCategory, setFilterCategory]}
                isDropdownOpen={[
                  isCategoryDropdownOpen,
                  setIsCategoryDropdownOpen,
                ]}
                dropdownList={CATEGORY_LIST}
                DropdownIcon={AiFillFilter}
                name="category"
              />
            </div>

            <TextInputSearch textSearch={[textSearch, setTextSearch]} />

            <RefreshBtn
              isLoading={isLoadingModalOpen}
              onClick={() => refreshAndClear()}
            />
          </div>
        </div>

        <TableAcq
          acquirerRadio={[acquirerRadio, setAcquirerRadio]}
          isLoadingModalOpen={isLoadingModalOpen}
          acquirerDisplay={acquirerDisplay}
          countryList={COUNTRY_LIST}
          statusList={STATUS_LIST}
          headerList={HEADER_LIST}
        />
      </div>
    </div>
  );
}

export default Page;
