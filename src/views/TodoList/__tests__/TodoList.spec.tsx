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

  describe("testing when task is INCOMPLETED (has_completed === 0)", () => {
    spySelector({ ...mockSelectors.data[1] });

    it("should show task description 'em andamento'", () => {
      render(<TodoList />);

      const descriptionStatusElement = document.querySelector(
        ".tasks__list__my-task__status"
      )?.innerHTML;

      waitFor(() => {
        expect(descriptionStatusElement).toBe("Em andamento");
      });
    });

    it("status toggle switched should be false", () => {
      const { getByTestId } = render(<TodoList />);

      waitFor(() => {
        expect(getByTestId("task-status-switch")).not.toBeChecked();
      });
    });
  });

  describe("testing when task is COMPLETED (has_completed === 1)", () => {
    spySelector({ ...mockSelectors.data[0] });

    it("should show the time the task was finished", () => {
      render(<TodoList />);

      const descriptionStatusElement = document.querySelector(
        ".tasks__list__my-task__status"
      )?.innerHTML;

      waitFor(() => {
        expect(descriptionStatusElement).toBe(
          mockSelectors.data[0].finished_at
        );
      });
    });

    it("status toggle switched should be TRUE", () => {
      const { getByTestId } = render(<TodoList />);

      waitFor(() => {
        expect(getByTestId("task-status-switch")).toBeChecked();
      });
    });
  });
});
