import { Modal } from "@material-ui/core";
import React from "react";
import Button from "../Button";
import Icons from "../Icons";
import "./styles.scss";

interface IModalWarningProps {
  show: boolean;
  handleClose: () => void;
  handleConfirm?: () => void;
  modalMessage?: string;
  modalRef: any;
}

const ModalWarning = ({
  show,
  handleClose,
  modalMessage,
  modalRef,
  handleConfirm,
}: IModalWarningProps) => {
  return (
    <Modal open={show} onClose={handleClose}>
      <div className="modal__wrapper" ref={modalRef}>
        <div className="modal__wrapper__background">
          <div className="modal__wrapper__header">
            <div className="modal__wrapper__header__message">
              <span>Aviso:</span>

              <Icons name="close" handleClick={handleClose} />
            </div>
            <div className="modal__wrapper__body">
              <p className="modal__wrapper__body__message">{modalMessage}</p>
            </div>

            <div className="modal__wrapper__footer">
              <Button
                btnClasses="_red"
                btnExtraStyles={{ height: 35, width: "48%" }}
                btnFunction={handleClose}
              >
                CANCELAR
              </Button>
              <Button
                btnClasses="_blue"
                btnExtraStyles={{ height: 35, width: "48%" }}
                btnFunction={handleConfirm}
              >
                CONFIRMAR
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ModalWarning;
