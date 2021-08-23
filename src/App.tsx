import { Suspense } from "react";
import { renderRoutes } from "react-router-config";
import { BrowserRouter as Router } from "react-router-dom";

import routes from "./routes";

import "./global/global.scss";
import LoadingScreen from "./components/LoadingScreen";
import { Container } from "@material-ui/core";
import Navbar from "./components/Navbar";

function App() {
  const route: any = routes;

  return (
    <Container maxWidth={false} className="home" style={{ padding: 0 }}>
      <Router>
        <Navbar />
        <Suspense fallback={<LoadingScreen />}>{renderRoutes(route)}</Suspense>
      </Router>
    </Container>
  );
}

export default App;
