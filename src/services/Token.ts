export const getToken = () => {
  const token = localStorage.getItem("@Token_todo");

  return token;
};

export const cleanToken = () => {
  const token = localStorage.removeItem("@Token_todo");

  return token;
};

export const setToken = async (key: string) => {
  const token = await localStorage.setItem("@Token_todo", key);

  return token;
};
