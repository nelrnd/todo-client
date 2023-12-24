import { Navigate } from "react-router-dom"

const RouteRedirect = ({ children, condition, to }) =>
  condition ? children : <Navigate to={to} />

const AuthRouteRedirect = ({ children }) => {
  const token = localStorage.getItem("token")
  return (
    <RouteRedirect to="/login" condition={token}>
      {children}
    </RouteRedirect>
  )
}

const NotAuthRouteRedirect = ({ children }) => {
  const token = localStorage.getItem("token")
  return (
    <RouteRedirect to="/" condition={!token}>
      {children}
    </RouteRedirect>
  )
}

export { AuthRouteRedirect, NotAuthRouteRedirect }
