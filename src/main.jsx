import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "./routes/Home"
import Login from "./routes/Login"
import Register from "./routes/Register"
import Settings from "./routes/Settings"
import "./index.css"
import RouteGuard from "./components/RouteGuard"

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <RouteGuard>
        <Home />
      </RouteGuard>
    ),
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/settings",
    element: (
      <RouteGuard>
        <Settings />
      </RouteGuard>
    ),
  },
])

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
