import { PiContactlessPaymentFill } from "react-icons/pi";

export const HEADER_LIST = Object.freeze([
  {
    title: "",
  },
  {
    title: "Transaction ID",
  },
  {
    title: "Request ID",
  },
  {
    title: "Acquirer name",
    titleSwapped: "Acquirer ID",
    swappable: true,
  },
  {
    title: "Card number",
  },
  {
    title: "Create date",
  },
  {
    title: "Time",
  },
  {
    title: "Amount",
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
    name: "Card number",
  },
  {
    name: "Request ID",
  },
  {
    name: "Transaction ID",
  },
  {
    name: "Acqurer ID",
  },
]);

export const COMPARE_LIST = Object.freeze([
  {
    name: ">",
  },
  {
    name: ">=",
  },
  {
    name: "=",
  },
  {
    name: "<=",
  },
  {
    name: "<",
  },
  {
    name: "!=",
  },
]);

export const DEFAULT_TRANSACTION = Object.freeze({
  transactionId: "",
  requestId: "",
  createDate: [2023, 1, 1],
  createTime: [1, 1, 1],
  cardNumber: 0,
  acquirerId: "",
  amount: 0,
  status: "sale",
});

export const STATUS_LIST = Object.freeze([
  {
    title: "Status",
    color: "#000000",
  },
  {
    title: "sale",
    color: "#55B4B0",
  },
  {
    title: "void",
    color: "#EFC050",
  },
  {
    title: "reverse",
    color: "#DD4124",
  },
  {
    title: "refund",
    color: "#5B5EA6",
  },
  {
    title: "settlement",
    color: "#009B77",
  },
  {
    title: "batch-upload",
    color: "#4B5335",
  },
]);
