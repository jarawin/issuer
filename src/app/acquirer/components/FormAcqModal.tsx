"use client";
import { useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import TextInput from "../../../components/TextInput";
import SelectInput from "../../../components/SelectInput";

function FormAcqModal(props: any) {
  const [isFormModalOpen, setIsFormModalOpen] = props.isFormModalOpen;
  const {
    typeForm,
    data,
    countryList,
    statusList,
    categoryList,
    handleAdded,
    handleEdited,
  } = props;

  const [btnTitle, setBtnTitle] = useState("Save all");

  // Form
  const [name, setName] = useState(data.name);
  const [country, setCountry] = useState(data.country);
  const [category, setCategory] = useState(data.category);
  const [status, setState] = useState(data.status);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    switch (typeForm) {
      case "add":
        handleAdded({ name, country, category, status });
        break;
      case "edit":
        handleEdited({ name, country, category, status, id: data.id });
        break;
    }
  };

  useEffect(() => {
    setName(data.name);
    setCountry(data.country);
    setCategory(data.category);
    setState(data.status);
  }, [data, isFormModalOpen]);

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
        (!isFormModalOpen ? "hIdden" : "") +
        " grid place-items-center justify-center z-50 items-center justify-items-center"
      }
      style={{ opacity: isFormModalOpen ? 1 : 0 }}
    >
      <div className="fixed inset-0 z-50 bg-black bg-opacity-50 "></div>

      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center w-full p-4 overflow-x-hIdden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div className="relative w-full max-w-2xl max-h-full ">
          <form className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-black dark:text-white capitalize">
                {`${typeForm} acquiring `}
                {typeForm === "edit" && (
                  <span className="text-gray-400 dark:text-white">{`#${data.id.slice(
                    -6
                  )}`}</span>
                )}
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
                {/* name */}
                <TextInput
                  value={[name, setName]}
                  placeholder={data.name}
                  label={"name"}
                  type={"text"}
                  required
                />

                {/* country */}
                <SelectInput
                  label={"country"}
                  value={[country, setCountry]}
                  list={countryList.slice(1)}
                  required
                />

                {/* category */}
                <SelectInput
                  label={"category"}
                  value={[category, setCategory]}
                  list={categoryList.slice(1)}
                  required
                />

                {/* status */}
                <SelectInput
                  label={"status"}
                  value={[status, setState]}
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
          </form>
        </div>
      </div>
    </div>
  );
}

export default FormAcqModal;
