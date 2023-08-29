"use client";
import Link from "next/link";
import { useState } from "react";
import { HiChevronDown } from "react-icons/hi";

function ItemSidebtn(props: any) {
  const { pathList, idx, menu } = props;
  const [isOpen, setIsOpen] = useState(!menu.subs ? false : true);

  return (
    <li key={idx} onClick={() => setIsOpen(!isOpen)}>
      <a
        href={menu.subs ? null : menu.href}
        className={
          (pathList[0]?.href === menu.href && !isOpen
            ? "bg-gray-100 dark:bg-gray-700 group"
            : "") +
          " flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group cursor-pointer"
        }
      >
        <menu.icon
          className={
            (pathList[0]?.href === menu.href && !isOpen
              ? "text-gray-900 dark:text-white"
              : "") +
            " flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
          }
        />
        <span className="flex-1 ml-3 whitespace-nowrap capitalize">
          {menu.title}
        </span>

        {menu.subs && (
          <HiChevronDown
            className={(isOpen ? "rotate-180" : "") + " w-6 h-6"}
          />
        )}
      </a>
      {menu.subs && isOpen && (
        <ul id="dropdown-example" className=" py-2 space-y-2">
          {menu.subs.map((sub: any, idx: number) => (
            <li key={idx}>
              <a
                href={sub.href}
                className={
                  (pathList[1]?.href === sub.href && isOpen
                    ? "bg-gray-100 dark:bg-gray-700 group"
                    : "") +
                  " flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group cursor-pointer ml-8"
                }
              >
                {sub.title}
              </a>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

export default ItemSidebtn;
