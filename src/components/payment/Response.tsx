"use client";
import { useState, useRef } from "react";
import { BiSolidCopyAlt } from "react-icons/bi";
import { STATUS_LIST } from "@/utils/constant/payment";

function Response(props: any) {
  const { text, statusCode } = props;

  const getStatusColor = (statusCode: number) => {
    const statusObj = STATUS_LIST.filter((statusObj: any) => {
      return statusObj?.min <= statusCode && statusObj?.max >= statusCode;
    });
    return statusObj[0]?.color;
  };

  return (
    <div className="rounded-2xl  w-full h-fit ">
      <div className="rounded-t-lg w-full flex justify-between bg-gray-700 hover:bg-gray-800 items-center px-3">
        <h2 className="text-white py-2.5">Response</h2>

        <button type="button" className=" text-white text-xs">
          <div className="flex items-center ">
            <div
              className={
                (statusCode ? "" : "hidden") + " h-2.5 w-2.5 rounded-full mr-2"
              }
              style={{
                backgroundColor: getStatusColor(statusCode) ?? "gray",
              }}
            ></div>{" "}
            {statusCode ? statusCode : ""}
          </div>
        </button>
      </div>

      <div className=" relative">
        <textarea
          rows={props.rows}
          className="block p-2.5 w-full text-gray-900 bg-white rounded-b-lg border-0 text-sm focus:outline-none focus:ring-0 focus:border-transparent"
          value={text}
          disabled
        />
        <span className=" absolute top-1 right-2 text-xs text-gray-500">
          JSON
        </span>
      </div>
    </div>
  );
}

export default Response;
