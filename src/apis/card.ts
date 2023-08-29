import axios from "axios";

export const acquiring = axios.create({
  baseURL: "http://localhost:1234/api/cards",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getAllCards = async () => {
  try {
    const response = await acquiring.get("/");
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getCardById = async (id: string) => {
  try {
    const response = await acquiring.get(`/${id}`);
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const createCard = async (data: any) => {
  try {
    const response = await acquiring.post("/", data);
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const updateCard = async (id: string, data: any) => {
  try {
    const response = await acquiring.put(`/${id}`, data);
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const deleteCard = async (id: string) => {
  try {
    const response = await acquiring.delete(`/${id}`);
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};
