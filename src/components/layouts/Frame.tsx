"use client";
import { useEffect, useState } from "react";

// Components
import Navbar from "@/components/layouts/Navbar";
import SideBar from "@/components/layouts/SideBar";
import Breadcrumb from "@/components/layouts/Breadcrumb";

// Utils
import {
  PAGE_LIST,
  PROFILE_DROPDOWN_LIST,
  MOCKUP_USER,
  HEADER,
} from "@/utils/constant/frame";
import { generatePathList } from "@/utils/formatter/string";

declare const window: any;

function Frame() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isUserOptionOpen, setIsUserOptionOpen] = useState(false);
  const [pathList, setPathList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const onPageLoading = () => {
    const newPathList = generatePathList(window?.location?.pathname);
    setIsSidebarOpen(window?.innerWidth > 640);
    setPathList(newPathList);
    setIsLoading(false);
  };

  useEffect(() => {
    onPageLoading();
  }, []);

  return (
    <div suppressHydrationWarning>
      <Navbar
        header={HEADER}
        user={MOCKUP_USER}
        profileDropdownList={PROFILE_DROPDOWN_LIST}
        sideBar={[isSidebarOpen, setIsSidebarOpen]}
        userOption={[isUserOptionOpen, setIsUserOptionOpen]}
      />

      <Breadcrumb pathList={pathList} isLoading={isLoading} />

      <SideBar
        sideBar={[isSidebarOpen, setIsSidebarOpen]}
        menuList={PAGE_LIST}
        pathList={pathList}
      />
    </div>
  );
}

export default Frame;
