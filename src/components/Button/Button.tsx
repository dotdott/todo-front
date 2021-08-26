import React from "react";
import "./styles.scss";
import * as MU from "@material-ui/core";

interface IButtonProps {
  btnFunction?: () => void;
  btnClasses: string;
  btnExtraStyles?: {};
  children?: React.ReactNode;
}

const Button = ({
  btnFunction,
  btnClasses,
  btnExtraStyles,
  children,
}: IButtonProps) => {
  return (
    <MU.Button
      style={btnExtraStyles}
      className={`button ${btnClasses}`}
      onClick={btnFunction}
    >
      {children}
    </MU.Button>
  );
};

export default Button;
