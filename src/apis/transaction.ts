import axios from "axios";

export const acquiring = axios.create({
  baseURL: "http://localhost:1234/api/transactions",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getAllTransactions = async () => {
  try {
    const response = await acquiring.get("/");
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getTransactionById = async (
  transactionId: string,
  requestId: string
) => {
  try {
    const response = await acquiring.get(
      `/transaction-request-id?transactionId=${transactionId}&requestId=${requestId}`
    );
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const createTransaction = async (data: any) => {
  try {
    const response = await acquiring.post("/", data);
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const updateTransaction = async (
  transactionId: string,
  requestId: string,
  data: any
) => {
  try {
    const response = await acquiring.put(
      `?transactionId=${transactionId}&requestId=${requestId}`,
      data
    );
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const deleteTransaction = async (
  transactionId: string,
  requestId: string
) => {
  try {
    const response = await acquiring.delete(
      `?transactionId=${transactionId}&requestId=${requestId}`
    );
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};
