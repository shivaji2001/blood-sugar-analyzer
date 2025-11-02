import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Signup from "./components/Signup";
import Login from "./components/Login";
import HomePage from "./components/HomePage";
import PrivateRoute from "./components/PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/homepage",
    element: <PrivateRoute><HomePage /></PrivateRoute>
  },
]);
