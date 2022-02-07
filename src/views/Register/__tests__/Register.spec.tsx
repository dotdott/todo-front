import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import { mockSelector, render } from "src/util/test-utils";
import Register from "..";

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
}));

afterAll(() => {
  jest.restoreAllMocks();
});

describe("acessing register page with no user loggeded", () => {
  mockSelector(-1);

  it("render pages correctly", () => {
    const { getByText } = render(<Register />);

    expect(getByText(/Crie sua conta/i)).toBeInTheDocument();
  });
});

describe("trying to access register page when an user is logged in", () => {
  mockSelector(1);

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
});
