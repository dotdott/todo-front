import { CircularProgress } from "@material-ui/core";
import "./styles.scss";

const LoadingScreen = () => {
  return (
    <div className="loading_screen">
      <CircularProgress color="secondary" />
    </div>
  );
};

export default LoadingScreen;
