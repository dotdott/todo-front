import { createMemoryHistory } from "history";
import React from "react";
import { Router } from "react-router-dom";
import {
  mockSelectorUserID,
  render,
  waitFor,
  fireEvent,
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
    it("should call register functions when clicked", async () => {
      render(<Register />);

      const formElement = document.querySelector(".auth__input__fields");

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
