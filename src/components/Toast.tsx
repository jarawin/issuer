"use client";
import { useState, useEffect } from "react";
import { BsCheckLg } from "react-icons/bs";
import { IoCloseSharp } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { IoWarning } from "react-icons/io5";

const TOAST_LIST = [
  {
    type: "danger",
    className: "text-red-500 bg-red-100 dark:bg-red-800 dark:text-red-200",
    icon: IoMdClose,
  },
  {
    type: "success",
    className:
      "text-green-500 bg-green-100 dark:bg-green-800 dark:text-green-200",
    icon: BsCheckLg,
  },
  {
    type: "warning",
    className:
      "text-yellow-500 bg-yellow-100 dark:bg-yellow-800 dark:text-yellow-200",
    icon: IoWarning,
  },
];

function Toast(props: any) {
  const [toast, setToast] = useState(TOAST_LIST[0]);
  const [isToastOpen, setIsToastOpen] = props.isToastOpen;
  const { type, title } = props;

  useEffect(() => {
    if (isToastOpen) {
      setTimeout(() => {
        setIsToastOpen(false);
      }, 3000);
    }
  }, [isToastOpen]);

  useEffect(() => {
    const toast = TOAST_LIST.find((toast) => toast.type === type);

    if (toast) {
      setToast(toast);
    }
  }, [type]);

  return (
    <div className="flex justify-center  ">
      <div
        className=" flex fixed  items-center sm:w-full w-fit  max-w-xs  sm:p-4 p-2 mb-4 text-gray-500 bg-white rounded-lg  dark:text-gray-400 dark:bg-gray-800 z-50 bottom-4 transition duration-300 ease-in-out transform  shadow-lg "
        style={{
          opacity: isToastOpen ? 1 : 0,
        }}
        role="alert"
      >
        <div
          className={
            toast.className +
            " inline-flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-lg "
          }
        >
          <toast.icon className="w-5 h-5" />
        </div>
        <div className="ml-3 text-sm font-normal">{title}</div>
        <button
          type="button"
          className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
          onClick={() => {
            setIsToastOpen(false);
          }}
        >
          <IoCloseSharp className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}

export default Toast;
