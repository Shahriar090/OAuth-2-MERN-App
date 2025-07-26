import { createBrowserRouter, type RouteObject } from "react-router";
import Login from "../Pages/Login";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Login />,
  },
];

const router = createBrowserRouter(routes);
export default router;
