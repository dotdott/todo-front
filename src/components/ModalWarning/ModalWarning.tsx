import { Modal } from "@material-ui/core";
import React from "react";
import Icons from "../Icons";
import "./styles.scss";

interface IModalWarningProps {
  show: boolean;
  handleClose: () => void;
  modalMessage: string;
}

const ModalWarning = ({
  show,
  handleClose,
  modalMessage,
}: IModalWarningProps) => {
  return (
    <Modal open={show} onClose={handleClose}>
      <div className="modal__wrapper">
        <div className="modal__wrapper__background">
          <div className="modal__wrapper__header">
            <div className="modal__wrapper__header__message">
              <span>Aviso:</span>

              <Icons name="close" handleClick={handleClose} />
            </div>
            <div>
              <p>{modalMessage}</p>
            </div>

            <div>OK</div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ModalWarning;
