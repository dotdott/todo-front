import { Router } from "react-router-dom";
import { render, screen } from "src/util/test-utils";
import { createMemoryHistory } from "history";
import { getToken } from "src/services/Token";
import PrivateRoute from "..";

const mockRoutes = jest.fn();

jest.mock("src/services/Token", () => ({
  getToken: jest.fn(),
}));

describe("PrivateRoute component", () => {
  it("should render routes", () => {
    const privateRoute = render(<PrivateRoute route={mockRoutes} />);

    expect(privateRoute).toMatchSnapshot();
  });

  it("should redirect user when there is no token settled", () => {
    const history = createMemoryHistory();

    (getToken as jest.Mock).mockImplementation(() => "");

    render(
      <Router history={history}>
        <PrivateRoute route={mockRoutes} />
      </Router>
    );

    expect(history.length).toBeGreaterThan(1);
    expect(history.location.pathname).toBe("/login");
  });
});
