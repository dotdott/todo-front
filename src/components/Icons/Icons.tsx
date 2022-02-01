import { Icon } from "@material-ui/core";
import "./styles.scss";

interface IIConsProps {
  name: string;
  Styles?: {};
  ClassName?: string;
  handleClick?: () => void;
}

const Icons = ({ name, Styles, ClassName, handleClick }: IIConsProps) => {
  return (
    <Icon
      className={`icon ${ClassName}`}
      style={Styles}
      onClick={handleClick}
      data-testid="icon-test-id"
    >
      {name}
    </Icon>
  );
};

export default Icons;
