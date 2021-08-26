import { Suspense } from "react";
import { renderRoutes } from "react-router-config";
import { BrowserRouter as Router } from "react-router-dom";

import routes from "./routes";

import "./global/global.scss";
import LoadingScreen from "./components/LoadingScreen";
import { Container } from "@material-ui/core";
import Navbar from "./components/Navbar";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IStateUser } from "./global/@types";
import { Types } from "./store/reducers/userReducer";
import { cleanToken } from "./services/Token";

const stHome = {
  padding: 0,
  overflow: "hidden",
  height: "100vh",
  width: "100vw",
};

function App() {
  const route: any = routes;
  const { saveLogin } = useSelector((state: IStateUser) => state.stateUser);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!saveLogin) {
      dispatch({
        type: Types.CLEAN_USER,
      });

      cleanToken();
    }
  }, []);

  return (
    <Container maxWidth={false} className="home" style={stHome}>
      <Router>
        <Navbar />
        <Suspense fallback={<LoadingScreen />}>{renderRoutes(route)}</Suspense>
      </Router>
    </Container>
  );
}

export default App;
