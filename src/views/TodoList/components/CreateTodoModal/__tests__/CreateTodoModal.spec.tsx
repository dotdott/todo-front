import { IUserTodos } from "src/global/@types";
import { render, fireEvent, mockTodos } from "src/util/test-utils";
import CreateTodoModal from "..";

const showModal = jest.fn();
const closeModal = showModal.mockImplementationOnce(() => false);
const modalRef = jest.fn();

const setup = (selectedTodo?: IUserTodos) => {
  const { getByText, ...rest } = render(
    <CreateTodoModal
      show={true}
      handleClose={closeModal}
      modalRef={modalRef}
      selectedTodo={selectedTodo}
    />
  );

  const titleInput = (document.querySelector("#todo-title") as HTMLInputElement)
    .value;

  const descriptionInput = (
    document.querySelector(
      ".modal__todo__body__description-field"
    ) as HTMLInputElement
  ).value;

  return { getByText, titleInput, descriptionInput, ...rest };
};

describe("Modal show case.", () => {
  it("should display 'create' texts fields in modal when there is no todo selected", () => {
    const { getByText } = setup();

    expect(getByText(/Crie uma nova tarefa!/i)).toBeInTheDocument();
    expect(getByText(/CRIAR NOVA TAREFA/i)).toBeInTheDocument();
  });

  it("should close modal when clicked in closeBtn", () => {
    const { getByText, rerender } = setup();

    const closeIcon = getByText(/close/i);
    fireEvent.click(closeIcon);

    rerender(
      <CreateTodoModal
        show={showModal()}
        handleClose={closeModal}
        modalRef={modalRef}
      />
    );
    expect(document.querySelector(".modal__todo")).not.toBeInTheDocument();
  });
});

describe("modal inputs", () => {
  describe("opened as a create new task component", () => {
    it("should start title input empty", () => {
      const { titleInput } = setup();

      expect(titleInput).toBe("");
    });

    it("should start description input empty", () => {
      const { descriptionInput } = setup();

      expect(descriptionInput).toBe("");
    });

    it("checkbox should start UNCHECKED", () => {
      const { getByLabelText } = setup();

      const checkboxInput = getByLabelText("Marcar como concluída");

      expect(checkboxInput).not.toBeChecked();
    });

    it("button should have 'CRIAR NOVA TAREFA' text when it is to create a new task", () => {
      const { getByText } = setup();

      expect(getByText(/CRIAR NOVA TAREFA/i)).toBeInTheDocument();
    });
  });

  describe("opening as editing an task", () => {
    it("title input default value should be passed selected todo title", () => {
      const { titleInput } = setup(mockTodos[0]);

      expect(titleInput).toBe(mockTodos[0].task);
    });

    it("title description default value should be passed selected todo title", () => {
      const { descriptionInput } = setup(mockTodos[0]);

      expect(descriptionInput).toBe(mockTodos[0].description);
    });

    it("checkbox should start CHECKED", () => {
      const { getByLabelText } = setup(mockTodos[0]);

      const checkboxInput = getByLabelText("Marcar como concluída");

      expect(checkboxInput).toBeChecked();
    });

    it("button should have 'ATUALIZAR' text when it is to create a new task", () => {
      const { getByText } = setup(mockTodos[0]);

      expect(getByText(/ATUALIZAR/i)).toBeInTheDocument();
    });
  });
});
