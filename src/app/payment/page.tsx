"use client";
import { useEffect } from "react";

function page() {
  useEffect(() => {
    window.location.href = "/payment/sale";
  }, []);

  return <></>;
}

export default page;
