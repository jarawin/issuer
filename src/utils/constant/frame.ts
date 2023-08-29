import { BiSolidBank, BiSolidDashboard } from "react-icons/bi";
import { BsFillCreditCardFill } from "react-icons/bs";
import { SiFampay } from "react-icons/si";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { HiDocumentText } from "react-icons/hi";

export const HEADER = Object.freeze({
  title: "Isuuer",
  icon: SiFampay,
});

export const PAGE_LIST = Object.freeze([
  {
    title: "Dashboard",
    href: "/",
    icon: BiSolidDashboard,
  },
  {
    title: "Acquirer",
    href: "/acquirer",
    icon: BiSolidBank,
  },
  {
    title: "Card",
    href: "/card",
    icon: BsFillCreditCardFill,
  },

  {
    title: "Transaction",
    href: "/transaction",
    icon: FaMoneyBillTransfer,
  },
  {
    title: "Payment API Docs",
    href: "/payment",
    icon: HiDocumentText,
    subs: [
      {
        title: "Sale",
        href: "/payment/sale",
      },
      {
        title: "Void",
        href: "/payment/void",
      },
      {
        title: "reverse",
        href: "/payment/reverse",
      },
      {
        title: "settlement",
        href: "/payment/settlement",
      },
      {
        title: "batch-upload",
        href: "/payment/batch-upload",
      },
      {
        title: "refund",
        href: "/payment/refund",
      },
      {
        title: "inquiry",
        href: "/payment/inquiry",
      },
    ],
  },
]);

export const PROFILE_DROPDOWN_LIST = Object.freeze([
  {
    title: "Dashboard",
    href: "/",
  },
  {
    title: "Settings",
    href: "/settings",
  },
  {
    title: "Sign out",
    href: "/sign-out",
  },
]);

export const MOCKUP_USER = Object.freeze({
  name: "Jarawin",
  email: "jarawin.promsawat@gmail.com",
  image: "https://flowbite.com/docs/images/people/profile-picture-1.jpg",
});
