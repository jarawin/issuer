import React from "react";
import { TbLoader, TbLoaderQuarter } from "react-icons/tb";

function RefreshBtn(props: any) {
  return (
    <button
      className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-50 hover:bg-gray-100 border border-gray-300 focus:outline-none p-2 hover:text-gray-800 hover:animate-spin"
      onClick={props.onClick}
    >
      {props.isLoading ? (
        <TbLoaderQuarter className="w-6 h-6 text-gray-400 animate-spin" />
      ) : (
        <TbLoader className="w-6 h-6 text-gray-400" />
      )}
    </button>
  );
}

export default RefreshBtn;
