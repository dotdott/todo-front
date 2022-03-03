import { render } from "src/util/test-utils";
import TodoList from "..";

describe("TodoList page", () => {
  it("render pages correctly", () => {
    render(<TodoList />);

    expect(document.querySelector(".todo__container")).toBeInTheDocument();
  });
});
