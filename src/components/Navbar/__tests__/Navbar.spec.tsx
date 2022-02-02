import Navbar from "../index";
import { render, screen, fireEvent } from "@testing-library/react";
import { MockComponent } from "../../../util/test-utils";

describe("Navbar Component", () => {
  it("should render navbar component correctly", () => {
    render(<MockComponent Component={Navbar} />);

    expect(document.querySelector(".navbar")).toBeInTheDocument();
  });
});
