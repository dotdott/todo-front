import { render } from "src/util/test-utils";
import CreateTodoModal from "..";

const showModal = jest.fn(() => true);
const closeModal = showModal.mockReturnValue(false);
const modalRef = jest.fn();

describe("Modal should open display the create modal layout", () => {
  it("should display 'create' texts fields in modal when there is no todo selected", () => {
    const { getByText } = render(
      <CreateTodoModal
        show={showModal()}
        handleClose={closeModal}
        modalRef={modalRef}
      />
    );

    expect(getByText(/Crie uma nova tarefa!/i)).toBeInTheDocument();
    expect(getByText(/CRIAR NOVA TAREFA/i)).toBeInTheDocument();
  });
});
