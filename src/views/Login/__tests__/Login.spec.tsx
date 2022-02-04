import { useSelector } from "react-redux";
import { render, fireEvent, waitFor } from "src/util/test-utils";
import { createMemoryHistory } from "history";
import Login from "..";
import { Router } from "react-router-dom";

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
}));

const mockBtnFunction = jest.fn();

jest.mock("src/components/Button", () => {
  return {
    __esModule: true,
    default: () => {
      return <button onClick={mockBtnFunction}>Entrar</button>;
    },
  };
});

describe("acess login page with user id === -1", () => {
  beforeEach(() => {
    (useSelector as jest.Mock).mockImplementation(() => {
      const value = {
        id: -1,
      };

      return value;
    });
  });

  afterEach(() => {
    (useSelector as jest.Mock).mockClear();
  });

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
});

describe("acess login page with user id === 1", () => {
  beforeEach(() => {
    (useSelector as jest.Mock).mockImplementation(() => {
      const value = {
        id: 1,
      };

      return value;
    });
  });

  afterEach(() => {
    (useSelector as jest.Mock).mockClear();
  });

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
