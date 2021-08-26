import { useEffect } from "react";

interface IProps {
  handleClose: () => void;
  showModalError: boolean;
  modalRef: any;
}

export const useCheckIfClickedOutside = ({
  showModalError,
  handleClose,
  modalRef,
}: IProps) => {
  useEffect(() => {
    const checkIfClickedOutside = (e: any) => {
      if (showModalError && modalRef.current === e.target) {
        handleClose();
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [showModalError]);
};
