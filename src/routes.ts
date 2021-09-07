import { lazy } from "react";
import PrivateRoute from "./components/PrivateRoute";

const routes = [
  {
    path: "/login",
    exact: true,
    component: lazy(() => import("./views/Login")),
  },
  {
    path: "/registrar",
    exact: true,
    component: lazy(() => import("./views/Register")),
  },

  {
    route: "*",
    component: PrivateRoute,
    routes: [
      {
        path: "/tarefas",
        exact: true,
        component: lazy(() => import("./views/TodoList")),
      },
      {
        component: lazy(() => import("./views/Login")),
      },
    ],
  },
];

export default routes;
