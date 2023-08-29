export function firstUpper(input: string): string {
  if (input.length === 0) {
    return input;
  }

  const firstChar = input.charAt(0);
  const restOfString = input.slice(1).toLowerCase();

  if (isNaN(Number(firstChar))) {
    return firstChar.toUpperCase() + restOfString;
  } else {
    return input;
  }
}
export const strDate2Date = (dateStr: string, timeStr?: string) => {
  if (!dateStr) {
    console.log("dateStr is empty");
  }

  const [day, month, year] = dateStr.split("/").map(Number);

  if (timeStr != null) {
    const [hour, minute, second] = timeStr!.split(":").map(Number);
    return new Date(year, month - 1, day, hour, minute, second);
  } else {
    return new Date(year, month - 1, day);
  }
};

export const generatePathList = (currentPath: string): any => {
  const paths = currentPath.split("/").filter((path) => path !== "");
  const pathList = [];

  let href = "";
  for (let i = 0; i < paths.length; i++) {
    const title = paths[i];
    href += `/${paths[i]}`;

    pathList.push({ title, href });
  }

  return pathList;
};

function addZeros(number: number, digit: number): string {
  const numStr = number.toString();
  const zerosToAdd = Math.max(0, digit - numStr.length);
  return "0".repeat(zerosToAdd) + numStr;
}

export const dateArrayToString = (date: number[]) => {
  return `${addZeros(date[2], 2)}/${addZeros(date[1], 2)}/${addZeros(
    date[0],
    4
  )}`;
};

export const timeArrayToString = (date: number[]) => {
  return `${addZeros(date[0], 2)}:${addZeros(date[1], 2)}:${addZeros(
    date[2],
    2
  )}`;
};

export const formatCreditCardNumber = (cardNumber: any) => {
  let maskedNumber = cardNumber;
  if (typeof cardNumber !== "string") {
    maskedNumber = cardNumber.toString();
  }

  const formattedNumber = `${maskedNumber.slice(0, 2)} ${maskedNumber.slice(
    2,
    7
  )} ${maskedNumber.slice(7, 12)} ${maskedNumber.slice(12)}`;
  return formattedNumber;
};

export const hiddenCreditCardNumber = (cardNumber: number) => {
  const maskedNumber = cardNumber.toString().replace(/\d(?=\d{4})/g, "*");
  return formatCreditCardNumber(maskedNumber);
};

export const formatDateWithYear = (yearsToAdd: number) => {
  const currentDate = new Date();
  const originalDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate()
  );

  const date = new Date(
    originalDate.getFullYear() + yearsToAdd,
    originalDate.getMonth(),
    originalDate.getDate()
  );

  const day = date.getDate();
  const month = date.getMonth() + 1; // Months are zero-based
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};
