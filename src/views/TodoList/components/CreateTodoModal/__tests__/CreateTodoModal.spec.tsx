import { render, fireEvent } from "src/util/test-utils";
import CreateTodoModal from "..";

const showModal = jest.fn();
const closeModal = showModal.mockImplementationOnce(() => false);
const modalRef = jest.fn();

const setup = () => {
  const { getByText, ...rest } = render(
    <CreateTodoModal show={true} handleClose={closeModal} modalRef={modalRef} />
  );

  return { getByText, ...rest };
};

describe("Modal should open display the create modal layout", () => {
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
