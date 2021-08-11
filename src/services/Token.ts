export const getToken = () => {
  const token = localStorage.getItem("@Token_todo");

  return token;
};

export const cleanToken = () => {
  const token = localStorage.removeItem("@Token_todo");

  return token;
};

export const setToken = (key: string) => {
  const token = localStorage.setItem("@Token_todo", key);

  return token;
};
