import { render, screen } from "@testing-library/react";
import Button from "./Button";

describe("Button Component", () => {
  it("should render button component with default blue class when not passed an value in prop", () => {
    render(<Button />);

    const btnElement = screen.getByTestId("button-test-id");

    expect(btnElement).toHaveClass("button _blue");
  });
});
