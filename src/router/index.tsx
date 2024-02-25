import { RouteObject, createBrowserRouter } from "react-router-dom";
import Layout from "../layouts";
import Contact from "../pages/contact";
import ErrorPage from "../pages/error-page";
import ErrorRouter from "../pages/error-router";
import LoginPage from "../pages/login";
import UserPage from "../pages/user";
import { Counter } from "../features/counter/Counter";
import RolePage from "../pages/role";
import AccessPage from "../pages/access";

export const routes: RouteObject[] = [
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "contacts/:contactId",
        element: <Contact />,
      },
      {
        path: "user",
        element: <UserPage />,
      },
      {
        path: "counter",
        element: <Counter />,
      },
      {
        path: "*",
        element: <ErrorRouter />,
      }
    ],
  },
  {
    path: "/manager",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "users",
        element: <UserPage />,
      },
      {
        path: "role",
        element: <RolePage />,
      },
      {
        path: "access",
        element: <AccessPage />,
      },
    ]
  }
]

export const router = createBrowserRouter(routes);