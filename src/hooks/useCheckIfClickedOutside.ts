import { useEffect } from "react";

interface IProps {
  handleClose: () => void;
  showModalError: boolean;
  screenRef: any;
}

export const useCheckIfClickedOutside = ({
  showModalError,
  handleClose,
  screenRef,
}: IProps) => {
  useEffect(() => {
    const checkIfClickedOutside = (e: any) => {
      if (
        showModalError &&
        screenRef.current &&
        !screenRef.current.contains(e.target)
      ) {
        handleClose();
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [showModalError]);
};
