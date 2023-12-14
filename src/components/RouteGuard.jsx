import { Navigate } from "react-router-dom"

const RouteGuard = ({ children }) => {
  const token = localStorage.getItem("token")

  return token ? children : <Navigate to="/login" />
}

export default RouteGuard
