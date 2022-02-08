import { createMemoryHistory } from "history";
import React from "react";
import { Router } from "react-router-dom";
import {
  mockSelectorUserID,
  render,
  waitFor,
  fireEvent,
  changeInputValue,
  mockUserDB,
  screen,
} from "src/util/test-utils";
import Register from "..";

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
}));

const mockBtnFunction = jest.fn();

jest.mock("src/components/Button", () => {
  return {
    __esModule: true,
    default: () => {
      return <button onClick={mockBtnFunction}>Registrar</button>;
    },
  };
});

afterAll(() => {
  jest.restoreAllMocks();
});

const mockErrorMessage =
  "An error has ocurried when attempting to register a new account.";

const getFormValues = () => {
  const formElement = document.querySelector(".auth__input__fields");
  const username = document.querySelector("#auth-username");
  const email = document.querySelector("#auth-email");
  const password = document.querySelector("#auth-password");
  const password2 = document.querySelector("#auth-password2");

  return { formElement, username, email, password, password2 };
};

describe("acessing register page with no user loggeded", () => {
  mockSelectorUserID(-1);

  it("render pages correctly", () => {
    const { getByText } = render(<Register />);

    expect(getByText(/Crie sua conta/i)).toBeInTheDocument();
  });
});

describe("trying to access register page when an user is logged in", () => {
  mockSelectorUserID(1);

  it("should redirect user back when there is an user logged in.", () => {
    const history = createMemoryHistory();
    const goBackSpy = jest.spyOn(history, "goBack");

    render(
      <Router history={history}>
        <Register />
      </Router>
    );

    expect(goBackSpy).toHaveBeenCalled();
  });

  it("login button should be in the document with href redirecting to login page", async () => {
    const { getByText } = render(<Register />);

    const loginLinkElement = getByText(/login/i);

    await waitFor(() => {
      expect(loginLinkElement).toBeInTheDocument();
      expect(loginLinkElement).toHaveAttribute("href", "/login");
    });
  });

  it("should call register functions when clicked", () => {
    const { getByText } = render(<Register />);

    const registerBtn = getByText(/Registrar/i);

    expect(registerBtn).toBeInTheDocument();

    fireEvent.click(registerBtn);
    expect(mockBtnFunction).toHaveBeenCalled();
  });

  describe("form functionalities", () => {
    it("form should initiate empty", async () => {
      render(<Register />);

      const { formElement } = getFormValues();

      await waitFor(() => {
        expect(formElement).toBeInTheDocument();
        expect(formElement).toHaveFormValues({
          username: "",
          email: "",
          password: "",
          password2: "",
        });
      });
    });

    it("should fill form values and trigger register function successfuly", async () => {
      render(<Register />);
      const { formElement, ...restFormValues } = getFormValues();
      const { ...restMockDB } = mockUserDB;

      changeInputValue(restFormValues.email, restMockDB.email);
      changeInputValue(restFormValues.password, restMockDB.password);
      changeInputValue(restFormValues.password2, restMockDB.password);
      changeInputValue(restFormValues.username, restMockDB.username);

      delete mockUserDB.id;

      await waitFor(() => {
        expect(formElement).toBeInTheDocument();
        expect(formElement).toHaveFormValues(mockUserDB);
      });

      const registerBtn = screen.getByText(/Registrar/i);

      expect(registerBtn).toBeInTheDocument();

      fireEvent.click(registerBtn);
      expect(mockBtnFunction).toHaveBeenCalled();
    });
  });
});

describe("displaying error message when state is filled", () => {
  mockSelectorUserID(1);

  it("If there's an error when attempting to register it should be displayed on the document", async () => {
    React.useState = jest.fn().mockReturnValue([mockErrorMessage, {}]);

    const { getByText } = render(<Register />);

    const loginLinkElement = getByText(mockErrorMessage);

    await waitFor(() => {
      expect(loginLinkElement).toBeInTheDocument();
    });
  });
});
