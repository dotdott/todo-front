import React from "react";
import "./styles.scss";
import * as MU from "@material-ui/core";

interface IButtonProps extends React.ComponentProps<typeof MU.Button> {
  btnFunction?: () => void;
  btnClasses?: "_red" | "_blue";
  btnExtraStyles?: {};
  children?: React.ReactNode;
}

const Button = ({
  btnFunction,
  btnClasses = "_blue",
  btnExtraStyles,
  children,
  ...rest
}: IButtonProps) => {
  return (
    <MU.Button
      style={btnExtraStyles}
      className={`button ${btnClasses}`}
      onClick={btnFunction}
      data-testid="button-test-id"
      {...rest}
    >
      {children}
    </MU.Button>
  );
};

export default Button;
