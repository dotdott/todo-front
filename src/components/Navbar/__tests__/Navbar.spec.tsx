import Navbar from "../index";
import {
  render,
  screen,
  waitFor,
  fireEvent,
  mockSelectorUserID,
} from "src/util/test-utils";

import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
}));

afterAll(() => {
  jest.restoreAllMocks();
});

describe("rendering while simulating HAS NO user is logged", () => {
  mockSelectorUserID(-1);

  it("should render navbar component correctly", () => {
    render(<Navbar />);

    expect(document.querySelector(".navbar")).toBeInTheDocument();
  });

  it("should show LOGIN button when there is no user logged", async () => {
    render(<Navbar />);

    await waitFor(() => {
      expect(screen.getByText(/Login/i)).toBeInTheDocument();
    });
  });
});

describe("rendering while simulating that HAS an user logged", () => {
  mockSelectorUserID(1);

  it("should show LOGOUT button when there is no user logged", async () => {
    render(<Navbar />);

    await waitFor(() => {
      expect(screen.queryByText(/Logout/i)).toBeInTheDocument();
    });
  });

  it("check if mavbar icon is rendered and try to click it and get redirected to '/tarefas'", async () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <Navbar />
      </Router>
    );

    const navIcon = screen.getByRole("img");
    expect(navIcon).toBeInTheDocument();

    fireEvent.click(navIcon);
    expect(history.location.pathname).toBe("/tarefas");
  });

  it(`click 'Minhas Tarefas' btn and redirect to /tarefas,
    if route is equal to /tarefas, btn 'Minhas Tarefas'
    should have 'current' className that indicate it is currently active`, () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <Navbar />
      </Router>
    );

    const userTaskNavLink = screen.getByText(/Minhas Tarefas/i);
    expect(userTaskNavLink).toBeInTheDocument();

    fireEvent.click(userTaskNavLink);
    expect(history.location.pathname).toBe("/tarefas");

    expect(userTaskNavLink).toHaveClass("navbar__navigation__hrefs current");
  });
});
