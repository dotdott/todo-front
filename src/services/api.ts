import axios from "axios";

const url = "http://127.0.0.1:3333";
// const url = "https://todo-back-dotdott.herokuapp.com";

/*eslint-disable*/

export const api = axios.create({
  baseURL: `${url}`,
});
