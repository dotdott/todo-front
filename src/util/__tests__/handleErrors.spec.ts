import { handleErrors } from "../handleErrors";

const message: string = "O servidor estão fora de ar 😢";
const status: number = 500;

describe("handleErrors", () => {
  it("should return default message and status when err.response is not passed", () => {
    const errors = handleErrors({ error: "any" });

    expect(errors).toEqual({ status, message });
  });

  it("should return proper message error when it is provided from err.response.data.error", () => {
    const msg = "message error.";
    const error = { response: { data: { error: msg } } };
    const errors = handleErrors(error);

    expect(errors).toEqual({ message: msg });
  });

  it("should return proper message error when it is provided from err.response.data.message", () => {
    const msg = "message error.";
    const error = { response: { data: { message: msg } } };
    const errors = handleErrors(error);

    expect(errors).toEqual({ message: msg });
  });

  it("should return default message and status when there is error.response but no chained custom errors", () => {
    const errors = handleErrors({ error: { response: "any" } });

    expect(errors).toEqual({ status, message });
  });
});
