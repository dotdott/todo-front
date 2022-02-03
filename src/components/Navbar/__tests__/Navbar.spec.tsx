import Navbar from "../index";
import { render, screen, waitFor } from "src/util/test-utils";

import { useSelector } from "react-redux";

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
});
