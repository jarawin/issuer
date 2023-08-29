"use client";
import { useState, useEffect } from "react";

import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";

function TextWrapper(props: any) {
  const { textVisible, textHidden } = props;

  const [text, setText] = useState(textHidden);
  const [visible, setVisible] = useState(false);

  const handleClick = (e: any) => {
    e.stopPropagation();

    if (visible) {
      setText(textHidden);
      setVisible(false);
    } else {
      setText(textVisible);
      setVisible(true);
    }
  };

  useEffect(() => {
    setText(textHidden);
    setVisible(false);
  }, [textHidden]);

  return (
    <div className="flex ">
      <div className="text-gray-500 ">{props.label}</div>

      <div className="flex flex-grow space-x-2">
        <div className="">{text}</div>
        <div className="flex items-center">
          <button onClick={handleClick}>
            {visible ? (
              <AiFillEyeInvisible className="w-5 h-5" />
            ) : (
              <AiFillEye className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default TextWrapper;
