import Navbar from "../index";
import { render, screen } from "src/util/test-utils";

describe("Navbar Component", () => {
  it("should render navbar component correctly", () => {
    render(<Navbar />);

    expect(document.querySelector(".navbar")).toBeInTheDocument();
  });
});
