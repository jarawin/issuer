import { FaCcVisa, FaCcMastercard, FaCcAmex } from "react-icons/fa";

export const DEFAULT_CARD = Object.freeze({
  cardNumber: 0,
  cvv: 0,
  acquirerId: "",
  cardType: "Visa",
  cardHolderName: "",
  cardStatus: "pending",
  createDate: [2023, 1, 1],
  expirationDate: [2027, 1, 1],
  creditLimit: 20000,
  balance: 0,
  overdue: 0,
});

export const HEADER_LIST = Object.freeze([
  {
    title: "",
  },
  {
    title: "Card number",
  },
  {
    title: "Cvv",
  },
  {
    title: "Acquirer name",
    titleSwapped: "Acquirer ID",
    swappable: true,
  },
  {
    title: "Card type",
  },
  {
    title: "Holder name",
  },
  {
    title: "Balance",
  },
  {
    title: "Limit",
  },
  {
    title: "Overdue",
  },
  {
    title: "Create date",
  },
  {
    title: "Exp date",
  },
  {
    title: "Status",
  },
]);

export const SEARCH_BY_LIST = Object.freeze([
  {
    name: "Acqurer name",
  },
  {
    name: "Holder name",
  },
  {
    name: "Acqurer ID",
  },
]);

export const CARD_TYPE_LIST = Object.freeze([
  {
    title: "Card type",
    icon: "",
  },
  {
    title: "Visa",
    icon: FaCcVisa,
  },
  {
    title: "Mastercard",
    icon: FaCcMastercard,
  },
  {
    title: "Amex",
    icon: FaCcAmex,
  },
]);
