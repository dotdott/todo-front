import {
  render,
  RenderResult,
  screen,
  fireEvent,
} from "@testing-library/react";
import ModalWarning from "../ModalWarning";

const mocks = {
  close: jest.fn(),
  confirm: jest.fn(),
  ref: jest.fn(),
};

const renderModal = async (
  message?: string,
  show: boolean = true
): Promise<RenderResult> => {
  return render(
    <ModalWarning
      handleClose={mocks.close}
      show={show}
      modalRef={mocks.ref}
      modalMessage={message}
      handleConfirm={mocks.confirm}
    />
  );
};

describe("ModalWarning Component", () => {
  it("should render the modal component", () => {
    renderModal();

    const modalElement = screen.getByText(/Aviso/i);

    expect(modalElement).toBeInTheDocument();
  });

  it("should NOT render the modal component", () => {
    renderModal(undefined, false);

    const modalElement = screen.queryByText(/Aviso/i);

    expect(modalElement).not.toBeInTheDocument();
  });

  it("calls handleClose when clicked on 'CANCELAR' button", () => {
    renderModal();

    const btnElement = screen.getByText(/CANCELAR/i);

    fireEvent.click(btnElement);

    expect(mocks.close).toHaveBeenCalled();
  });

  it("calls handleConfirm when clicked on 'CONFIRMAR' button", () => {
    renderModal();

    const btnElement = screen.getByText(/CONFIRMAR/i);

    fireEvent.click(btnElement);

    expect(mocks.confirm).toHaveBeenCalled();
  });

  it("should display the body message when passed by props", () => {
    renderModal("Something has gone wrong...");

    const messageElement = screen.queryByText(/Something has gone wrong.../i);

    expect(messageElement).toBeInTheDocument();
  });
});
