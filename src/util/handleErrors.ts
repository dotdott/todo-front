export const handleErrors = (err: any) => {
  let message: string = "O servidor estão fora de ar 😢";
  let status: number = 500;

  if (err.response) {
    if (err.response.data) {
      if (err.response.data.error) {
        message = err.response.data.error;
        return { message };
      } else {
        message = err.response.data.message;
        return { message };
      }
    }

    return { status, message };
  } else {
    return { status, message };
  }
};
