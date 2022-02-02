import { render, screen, fireEvent } from "@testing-library/react";
import Icons from "../Icons";

const changeColorMock = jest.fn();

describe("Icons Component", () => {
  it("should render Icon component with the 'Home' icon passed by props", () => {
    render(<Icons name="home" />);

    const iconElement = screen.getByTestId("icon-test-id");
    expect(iconElement).toBeInTheDocument();

    const iconChildElement = screen.getByText(/home/i);
    expect(iconChildElement).toBeInTheDocument();
  });

  it("Icon should have the black color when clicked the on the icon", () => {
    const { rerender } = render(
      <Icons
        name="home"
        handleClick={changeColorMock}
        Styles={{ color: "white" }}
      />
    );

    const iconElement = screen.getByTestId("icon-test-id");

    fireEvent.click(iconElement);
    expect(changeColorMock).toHaveBeenCalled();

    rerender(
      <Icons
        name="home"
        handleClick={changeColorMock}
        Styles={{ color: "black" }}
      />
    );
    expect(iconElement.style.color).toBe("black");
  });
});
