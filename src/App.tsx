import { Suspense } from "react";
import { renderRoutes } from "react-router-config";
import { BrowserRouter as Router } from "react-router-dom";

import routes from "./routes";

import "./global/global.scss";

function App() {
  const route: any = routes;

  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Suspense fallback={<p>Carregando...</p>}>
            {renderRoutes(route)}
          </Suspense>
        </Router>
      </header>
    </div>
  );
}

export default App;
