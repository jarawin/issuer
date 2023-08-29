import React from "react";

function ButtonIcon(props: any) {
  return (
    <button
      className={
        "flex-shrink-0 inline-flex items-center px-3 text-sm font-medium text-center text-gray-600 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-0 w-fit min-w-max hover:text-gray-800 space-x-2   py-2.5"
      }
      onClick={props.onClick}
    >
      <props.icon className="w-5 h-5" />
      <span className="">{props.title}</span>
    </button>
  );
}

export default ButtonIcon;
