import { RouteObject, createBrowserRouter } from "react-router-dom";
import Layout from "../layouts";
import Contact from "../pages/contact";
import ErrorPage from "../pages/error-page";
import LoginPage from "../pages/login";
import UserPage from "../pages/user";
// import { contactLoader } from "../pages/contact";

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
        // loader: contactLoader,
      },
      {
        path: "user",
        element: <UserPage />,
      }
    ],
  },
  // {
  //   path: "contacts/:contactId",
  //   element: <Contact />,
  // },
]

export const router = createBrowserRouter(routes);