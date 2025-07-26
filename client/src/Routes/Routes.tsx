import { createBrowserRouter, type RouteObject } from "react-router";
import PublicLayout from "../Layouts/PublicLayout";
import Dashboard from "../Pages/Dashboard/Dashboard";
import Login from "../Pages/Login";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
    ],
  },
];

const router = createBrowserRouter(routes);
export default router;
