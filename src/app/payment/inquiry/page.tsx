"use client";
import { useState, useEffect } from "react";

// components
import Endpoint from "@/components/payment/Endpoint";
import BodyInput from "@/components/payment/BodyInput";
import Response from "@/components/payment/Response";
import SendBtn from "@/components/payment/SendBtn";
import HeaderProgram from "@/components/payment/HeaderProgram";

// constants
import {
  INQUIRY_API,
  API_STATUS_TEXT,
  INQUIRY_API_DOC,
} from "@/utils/constant/payment";
import { InquiryData } from "@/utils/types/payment";

// apis
import { paymentInquiry } from "@/apis/payment";

function page() {
  const [navigatePath, setNavigatePath] = useState("");
  const [isSent, setIsSent] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [input, setInput] = useState(INQUIRY_API.sample);
  const [response, setResponse] = useState("");
  const [statusCode, setStatusCode] = useState(0);

  useEffect(() => {
    setIsFetching(false);
  }, []);

  const varidateData = (data: any) => {
    if (data instanceof Object) {
      const saleData: InquiryData = data as InquiryData;
      return saleData;
    } else {
      console.log("Data is not of type InquiryData");
    }
  };

  const postData = async (data: InquiryData) => {
    setIsFetching(true);
    setNavigatePath(`/transaction?requestId=${data?.requestId}`);
    const res: any = await paymentInquiry(data);
    setIsSent(true);
    setIsFetching(false);

    setResponse(res?.data ?? res?.response?.data);
    setStatusCode(res?.status ?? res?.response?.status);
  };

  const handleClickSend = () => {
    const jsonData = JSON.parse(input);
    const saleData = varidateData(jsonData);

    if (saleData) {
      postData(saleData);
    } else {
      console.log("Data is not valid");
      setInput(INQUIRY_API.sample);
    }
  };

  const handleClickView = () => {
    window.location.href = navigatePath;
  };

  function getHttpStatusText(statusCode: number): string {
    const statusTextMap: Record<number, string> = API_STATUS_TEXT;
    return statusTextMap[statusCode] ?? "null";
  }

  return (
    <div className=" relative sm:ms-64 translate-y-16 mx-2 grid grid-cols-12 gap-2 ">
      <div className="col-span-12 sm:col-span-7 ms-2 space-y-4">
        <h1 className=" mt-6 text-2xl font-extrabold">Payment Void API</h1>
        <hr />

        {INQUIRY_API_DOC.map((attr, idx) => (
          <div key={idx}>
            <div className=" flex space-x-2 mb-2">
              <h2 className=" text-lg font-semibold ">{attr.title}</h2>
              <p className=" text-lg font-extralight text-gray-400">
                : {attr.type}
              </p>
            </div>
            <p className=" text-sm text-gray-800 font-extralight">
              {attr.meaning}
            </p>
          </div>
        ))}
      </div>

      <div className="col-span-12 sm:col-span-5 space-y-3 bg-gray-100 p-3 rounded-md border-2 border-gray-400 sm:my-3 my-6">
        <HeaderProgram />

        <Endpoint link={INQUIRY_API.endpoint} method={INQUIRY_API.method} />
        <BodyInput rows={5} title={"Request body"} input={[input, setInput]} />

        {statusCode != 0 && (
          <Response
            rows={statusCode != 0 ? 5 : 3}
            text={
              response == ""
                ? getHttpStatusText(statusCode)
                : JSON.stringify(response, null, 2)
            }
            statusCode={statusCode}
          />
        )}

        <SendBtn
          isSent={isSent}
          isFetching={isFetching}
          handleClickSend={handleClickSend}
          handleClickView={handleClickView}
        />
      </div>
    </div>
  );
}

export default page;
