import React from "react";

function HeaderProgram() {
  return (
    <div className=" flex justify-between items-center mb-3">
      <div className=" flex space-x-2">
        <div className=" w-3 h-3 bg-gray-400 rounded-full"></div>
        <div className=" w-3 h-3 bg-gray-400 rounded-full"></div>
        <div className=" w-3 h-3 bg-gray-400 rounded-full"></div>
      </div>

      <div className=" flex space-x-2">
        <div className=" w-3 h-3 bg-red-500 rounded-full"></div>
        <div className=" w-3 h-3 bg-yellow-500 rounded-full"></div>
        <div className=" w-3 h-3 bg-green-500 rounded-full"></div>
      </div>
    </div>
  );
}

export default HeaderProgram;
