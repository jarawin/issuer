import React from "react";
import ItemSidebtn from "./ItemSidebtn";

function SideBar(props: any) {
  const [isSidebarOpen, setIsSidebarOpen] = props.sideBar;
  const { menuList, pathList } = props;

  return (
    <div
      className={
        (!isSidebarOpen ? "-translate-x-full" : "translate-x-0") +
        " transition-transform fixed top-0 left-0 z-30 w-64 h-screen pt-20  bg-white border-r border-gray-200  dark:bg-gray-800 dark:border-gray-700  "
      }
    >
      <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
        <ul className="space-y-2 font-medium">
          {menuList.map((menu: any, idx: number) => (
            <ItemSidebtn key={idx} pathList={pathList} idx={idx} menu={menu} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SideBar;
