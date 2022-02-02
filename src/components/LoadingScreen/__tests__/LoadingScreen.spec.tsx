import { render, screen } from "@testing-library/react";
import LoadingScreen from "../LoadingScreen";

describe("LoadingScreen Component", () => {
  it("renders loading screen spinner", () => {
    render(<LoadingScreen />);

    const spinnerElement = screen.getByRole(/progressBar/i);
    expect(spinnerElement).toBeInTheDocument();
  });
});
