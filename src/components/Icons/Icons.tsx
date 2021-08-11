import { Icon } from "@material-ui/core";
import "./styles.scss";

interface IIConsProps {
  name: string;
  Styles: {};
  ClassName: string;
}

const Icons = ({ name, Styles, ClassName }: IIConsProps) => {
  return (
    <Icon className={`icon ${ClassName}`} style={Styles}>
      {name}
    </Icon>
  );
};

export default Icons;
