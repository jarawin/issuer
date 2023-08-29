import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:1234/api/payments",
  headers: {
    "Content-Type": "application/json",
  },
});

export const paymentSale = async (data: any) => {
  try {
    const response = await api.post("/sale", data);
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const paymentVoid = async (data: any) => {
  try {
    const response = await api.post("/void", data);
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const paymentReverse = async (data: any) => {
  try {
    const response = await api.post("/reverse", data);
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const paymentSettlement = async (data: any) => {
  try {
    const response = await api.post("/settlement", data);
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const paymentBatchUpload = async (data: any) => {
  try {
    const response = await api.post("/batch-upload", data);
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const paymentRefund = async (data: any) => {
  try {
    const response = await api.post("/refund", data);
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const paymentInquiry = async (data: any) => {
  try {
    const response = await api.post("/inquiry", data);
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};
