"use client";
import { useRef, useState } from "react";
import { BiSolidCopyAlt } from "react-icons/bi";

function Endpoint(props: any) {
  const { method, link } = props;
  const inputRef = useRef<HTMLInputElement>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [input, setInput] = useState(link);

  const setCopyState = () => {
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 200);
  };

  const handleCopy = () => {
    if (inputRef.current) {
      inputRef.current.select();
      try {
        navigator.clipboard.writeText(inputRef.current.value);
        setCopyState();
      } catch (err) {
        console.error("Unable to copy", err);
      }
    }
  };

  return (
    <div className="">
      <div className="flex">
        <button
          id="dropdown-button"
          className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center bg-gray-700 hover:bg-gray-800 text-white  rounded-l-lg focus:ring-0 focus:outline-none right-0 border-0 "
          type="button"
        >
          {method}
        </button>
        <div className="relative w-full">
          <input
            type="text"
            className="block p-2.5 w-full z-20 border-0 text-sm text-gray-900 bg-white rounded-r-lg focus:ring-0 focus:outline-none"
            value={input}
            onChange={() => setInput(input)}
            ref={inputRef}
          />
          <button
            type="submit"
            className="absolute top-0 right-0 p-2.5 h-full text-sm font-medium text-white bg-gray-700 rounded-r-lg border-0 hover:bg-gray-800 focus:ring-0 focus:outline-none"
            onClick={handleCopy}
          >
            <BiSolidCopyAlt
              className={(isCopied ? " animate-ping" : "") + " w-4 h-4"}
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Endpoint;
