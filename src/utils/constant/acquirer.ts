export const HEADER_LIST = Object.freeze([
  "",
  "Acquirer ID",
  "Name",
  "Country",
  "Category",
  "State",
]);

export const DEFAULT_ACQUIRING = Object.freeze({
  id: "",
  name: "",
  country: "Thailand",
  category: "Large",
  status: "pending",
});

export const STATUS_LIST = Object.freeze([
  {
    title: "active",
    color: "#009B77",
  },
  {
    title: "pending",
    color: "#EFC050",
  },
  {
    title: "inactive",
    color: "#DD4124",
  },
]);

export const CATEGORY_LIST = Object.freeze([
  {
    title: "Category",
  },
  {
    title: "Large",
  },
  {
    title: "Medium",
  },
  {
    title: "Small",
  },
]);

export const COUNTRY_LIST = Object.freeze([
  {
    title: "Country",
    iconName: "",
  },
  {
    title: "Thailand",
    iconName: "TH",
  },
  {
    title: "Australia",
    iconName: "AU",
  },
  {
    title: "Canada",
    iconName: "CA",
  },
  {
    title: "Germany",
    iconName: "DE",
  },
  {
    title: "Japan",
    iconName: "JP",
  },
  {
    title: "Vietnam",
    iconName: "VN",
  },
  {
    title: "Switzerland",
    iconName: "CH",
  },
  {
    title: "Singapore",
    iconName: "SG",
  },
  {
    title: "United States",
    iconName: "US",
  },
  {
    title: "United Kingdom",
    iconName: "GB",
  },
  {
    title: "Hong Kong",
    iconName: "HK",
  },
]);
