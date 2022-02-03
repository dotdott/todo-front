import Navbar from "../index";
import { render, screen, waitFor, fireEvent } from "src/util/test-utils";

import { useSelector } from "react-redux";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
}));

describe("rendering while simulating HAS NO user is logged", () => {
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
});
