"use client";
import { useState, useRef } from "react";
import { BiSolidCopyAlt } from "react-icons/bi";

function BodyInput(props: any) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [input, setInput] = props.input;

  const setCopyState = () => {
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 200);
  };

  const handleCopy = () => {
    if (textareaRef.current) {
      textareaRef.current.select();
      try {
        navigator.clipboard.writeText(textareaRef.current.value);
        setCopyState();
      } catch (err) {
        console.error("Unable to copy", err);
      }
    }
  };

  return (
    <div className="  w-full h-fit ">
      <div
        className="rounded-t-lg w-full flex justify-between bg-gray-700 hover:bg-gray-800 items-center px-3"
        onClick={handleCopy}
      >
        <h2 className="text-white py-2.5">{props.title}</h2>
        <button type="button" className="w-4 h-4 text-white">
          <BiSolidCopyAlt className={isCopied ? " animate-ping" : ""} />
        </button>
      </div>

      <div className=" relative">
        <textarea
          rows={props.rows}
          className="block p-2.5 w-full text-gray-900 bg-white rounded-b-lg border-0 text-sm focus:outline-none focus:ring-0 focus:border-transparent"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          ref={textareaRef}
        />
        <span className=" absolute top-1 right-2 text-xs text-gray-500">
          JSON
        </span>
      </div>
    </div>
  );
}

export default BodyInput;
