import axios from "axios";
import { getToken } from "./Token";

const token = getToken();

// const url = "http://127.0.0.1:3333";
const url = "https://todo-back-dotdott.herokuapp.com";

export const api = axios.create({
  baseURL: `${url}`,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
