import { mockTodos, render, spySelector, waitFor } from "src/util/test-utils";
import TodoList from "..";

const mockSelectors = {
  isLoading: false,
  data: mockTodos,
  errorMessage: "",
  id: 1,
};

describe("TodoList page", () => {
  it("render pages correctly", () => {
    render(<TodoList />);

    expect(document.querySelector(".todo__container")).toBeInTheDocument();
  });
});

describe("should have mocked todo list rendered", () => {
  spySelector(mockSelectors);

  it("render mockTodos", () => {
    const { getByText } = render(<TodoList />);

    waitFor(() => {
      expect(getByText(/New Task/i)).toBeInTheDocument();
      expect(getByText(/New Uncompleted Task/i)).toBeInTheDocument();
    });
  });
});
