import { Icon } from "@material-ui/core";
import "./styles.scss";

interface IIConsProps extends Omit<React.ComponentProps<typeof Icon>, "color"> {
  name: string;
  Styles?: {};
  ClassName?: string;
  handleClick?: () => void;
}

const Icons = ({
  name,
  Styles,
  ClassName,
  handleClick,
  ...rest
}: IIConsProps) => {
  return (
    <Icon
      className={`icon ${ClassName}`}
      style={Styles}
      onClick={handleClick}
      data-testid="icon-test-id"
      {...rest}
    >
      {name}
    </Icon>
  );
};

export default Icons;
