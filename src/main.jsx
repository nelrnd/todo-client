import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Root from "./routes/Root"
import Home from "./routes/Home"
import Login from "./routes/Login"
import Register from "./routes/Register"
import Settings from "./routes/Settings"
import {
  AuthRouteRedirect,
  NotAuthRouteRedirect,
} from "./components/RouteRedirect"
import "./index.css"

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthRouteRedirect>
        <Root />
      </AuthRouteRedirect>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
    ],
  },
  {
    path: "/register",
    element: (
      <NotAuthRouteRedirect>
        <Register />
      </NotAuthRouteRedirect>
    ),
  },
  {
    path: "/login",
    element: (
      <NotAuthRouteRedirect>
        <Login />
      </NotAuthRouteRedirect>
    ),
  },
])

ReactDOM.createRoot(document.body).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
