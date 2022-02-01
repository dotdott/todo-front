import { render, screen, fireEvent } from "@testing-library/react";
import Button from "../Button";

const mockFunction = jest.fn();

const mockChildrens = () => {
  return <p>My beautiful paragraph :)</p>;
};

describe("Button Component", () => {
  it("should render button component with default blue class when not passed an value in prop", () => {
    render(<Button />);

    const btnElement = screen.getByTestId("button-test-id");

    expect(btnElement).toHaveClass("button _blue");
  });

  it("should render button with declared className passed by props", () => {
    render(<Button btnClasses="_red" />);

    const btnElement = screen.getByTestId("button-test-id");

    expect(btnElement).toHaveClass("button _red");
  });

  it("should execute the onClick mock function", () => {
    render(<Button btnFunction={mockFunction} />);

    const btnElement = screen.getByTestId("button-test-id");

    fireEvent.click(btnElement);

    expect(mockFunction).toHaveBeenCalled();
  });

  it("should custom style being passed by props, like opacity 0", () => {
    render(
      <Button
        btnExtraStyles={{
          opacity: "0.5",
        }}
      />
    );

    const btnElement = screen.getByTestId("button-test-id");

    expect(btnElement).toHaveProperty("style.opacity", "0.5");
  });

  it("should have rendered the red button color and have a paragraphic with any text", () => {
    render(<Button btnClasses="_red">{mockChildrens()}</Button>);

    const btnElement = screen.getByTestId("button-test-id");
    expect(btnElement).toHaveClass("button _red");

    const paraElement = screen.getByText(/My beautiful paragraph/i);
    expect(paraElement).toBeInTheDocument();
  });
});
