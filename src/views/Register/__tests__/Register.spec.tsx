import { createMemoryHistory } from "history";
import { useSelector } from "react-redux";
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

describe("trying to access register page when an user is logged in", () => {
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

describe("trying to access registedr page when an user is logged in", () => {
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
