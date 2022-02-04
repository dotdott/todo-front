import { useSelector } from "react-redux";
import { render } from "src/util/test-utils";
import { createMemoryHistory } from "history";
import Login from "..";
import { Router } from "react-router-dom";

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
}));

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
