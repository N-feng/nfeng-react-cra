import { RouteObject, createBrowserRouter } from "react-router-dom";
import Layout from "../layouts";
import Contact from "../pages/contact";
import ErrorPage from "../pages/error-page";
import ErrorRouter from "../pages/error-router";
import LoginPage from "../pages/login";
import UserPage from "../pages/user";
import { Counter } from "../features/counter/Counter";

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
        path: "/counter",
        element: <Counter />,
      },
      {
        path: "*",
        element: <ErrorRouter />,
      }
    ],
  },
]

export const router = createBrowserRouter(routes);