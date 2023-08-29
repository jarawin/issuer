import React from "react";

// icons
import { TbLoader3 } from "react-icons/tb";

function SendBtn(props: any) {
  return (
    <div className=" flex justify-end">
      <div className="flex space-x-2">
        <button
          type="button"
          className={
            (props.isSent
              ? "bg-gray-300 hover:bg-gray-400 text-black"
              : "bg-gray-700 hover:bg-gray-800 text-white") +
            " w-20 py-2.5 px-4 text-xs font-medium text-center   border-0 rounded-lg focus:ring-0 focus:outline-none flex justify-center"
          }
          onClick={() => {
            props.handleClickSend();
          }}
        >
          {props.isFetching ? (
            <TbLoader3 className="w-4 h-4 animate-spin" />
          ) : props.isSent ? (
            "RESEND"
          ) : (
            "SEND"
          )}
        </button>

        {props.isSent && (
          <button
            type="button"
            className=" w-20 py-2.5 px-4 text-xs font-medium text-center bg-gray-700 hover:bg-gray-800 text-white border-0 rounded-lg focus:ring-0 focus:outline-none flex justify-center"
            onClick={() => {
              props.handleClickView();
            }}
          >
            VIEW
          </button>
        )}
      </div>
    </div>
  );
}

export default SendBtn;
