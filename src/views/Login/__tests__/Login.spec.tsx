import { createMemoryHistory } from "history";
import React from "react";
import { Router } from "react-router-dom";
import {
  changeInputValue,
  fireEvent,
  mockSelectorUserID,
  mockUserDB,
  render,
  waitFor,
} from "src/util/test-utils";
import Login from "..";

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
}));

const error = { error: "Email/senha não conferem" };

const fakeHandleLogin = (email: string = "", password: string = "") => {
  try {
    if (email !== "" && password !== "") return mockUserDB;

    return error;
  } catch (err) {
    return error;
  }
};

const mockBtnFunction = jest.fn();

jest.mock("src/components/Button", () => {
  return {
    __esModule: true,
    default: () => {
      return <button onClick={mockBtnFunction}>Entrar</button>;
    },
  };
});

afterAll(() => {
  jest.restoreAllMocks();
});

describe("acess login page with user id === -1", () => {
  mockSelectorUserID(-1);

  it("render login page", () => {
    const { getByText } = render(<Login />);

    expect(getByText(/Acesse sua conta/i)).toBeInTheDocument();
  });

  it("render button component and triggers onClick function", () => {
    const { getByRole } = render(<Login />);

    const loginElement = getByRole("button", { name: "Entrar" });

    expect(loginElement).toBeInTheDocument();

    fireEvent.click(loginElement);

    expect(mockBtnFunction).toHaveBeenCalled();
  });

  it('tag <a> with text "registre-se" should be in the document and have href that redirect to register page "/registrar"', async () => {
    const { getByText } = render(<Login />);

    const registerLinkElement = getByText(/Registre-se/i);

    await waitFor(() => {
      expect(registerLinkElement).toBeInTheDocument();
      expect(registerLinkElement).toHaveAttribute("href", "/registrar");
    });
  });

  it("form should iniciate empty", async () => {
    render(<Login />);

    const form = document.querySelector(".auth__input__fields");

    expect(form).toHaveFormValues({
      email: "",
      password: "",
    });
  });

  describe("simulating user login with sucessfull credentials", () => {
    const email = "vocejogos5@gmail.com";
    const pass = "gabriel123";

    beforeEach(() =>
      mockBtnFunction.mockImplementation(() => fakeHandleLogin(email, pass))
    );

    afterEach(() => mockBtnFunction.mockClear());

    it("should fill the form and attempt to log in by clicking in the login button and return mocked user login results", async () => {
      const { getByRole } = render(<Login />);

      const form = document.querySelector(".auth__input__fields");

      const emailInput = document.querySelector("#auth-email");
      const passwordInput = document.querySelector("#auth-pass");

      changeInputValue(emailInput, email);
      changeInputValue(passwordInput, pass);

      const loginElement = getByRole("button", { name: "Entrar" });

      await waitFor(() => {
        expect(form).toHaveFormValues({
          email: email,
          password: pass,
        });

        fireEvent.click(loginElement);
        expect(mockBtnFunction).toHaveBeenCalled();

        const mockAttempt = new mockBtnFunction(email, pass);

        expect(mockAttempt).toBe(mockUserDB);
      });
    });
  });

  it("should attempt to login with no correct credentials", async () => {
    const { getByRole } = render(<Login />);
    mockBtnFunction.mockImplementation(() => fakeHandleLogin());

    const form = document.querySelector(".auth__input__fields");

    const loginElement = getByRole("button", { name: "Entrar" });

    await waitFor(() => {
      expect(form).toHaveFormValues({
        email: "",
        password: "",
      });

      fireEvent.click(loginElement);
      expect(mockBtnFunction).toHaveBeenCalled();

      const mockAttempt = new mockBtnFunction();

      expect(mockAttempt).toBe(error);
    });
  });
});

describe("access login page with user id === 1", () => {
  mockSelectorUserID(1);

  it("shouldn't load the login page when an user is logged and redirect user to previous page", () => {
    const history = createMemoryHistory();
    const goBackSpy = jest.spyOn(history, "goBack");

    const { queryByText } = render(
      <Router history={history}>
        <Login />
      </Router>
    );

    expect(queryByText(/Acesse sua conta/i)).not.toBeInTheDocument();

    expect(goBackSpy).toHaveBeenCalled();
  });
});

describe("should show error when error state is filled", () => {
  mockSelectorUserID(-1);

  it("If there's an error when attempting to login it should be displayed on the document", async () => {
    React.useState = jest
      .fn()
      .mockReturnValueOnce(["Error error", {}])
      .mockReturnValue([false, () => {}])
      .mockReturnValueOnce(["Error error", {}]);

    const { getByText } = render(<Login />);

    expect(getByText(/Error error/i)).toBeInTheDocument();
  });
});
