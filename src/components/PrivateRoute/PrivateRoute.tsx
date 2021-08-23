import React, { Suspense } from "react";
import { useEffect } from "react";
import { renderRoutes } from "react-router-config";
import { useHistory } from "react-router-dom";
import { getToken } from "../../services/Token";
import LoadingScreen from "../LoadingScreen";

const PrivateRoute = ({ route }: any) => {
  const history = useHistory();

  useEffect(() => {
    if (!getToken() || getToken() === "") {
      history.push("/login");
    }
  }, []);

  return (
    <Suspense fallback={<LoadingScreen />}>
      {renderRoutes(route.routes)}
    </Suspense>
  );
};

export default PrivateRoute;
