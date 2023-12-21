import { Outlet } from "react-router-dom"
import Header from "../components/Header"

export const Layout = () => (
  <div className="min-h-screen px-4 py-8 dark:bg-gray-950 dark:text-white">
    <div className="max-w-lg m-auto">
      <Header />
      <Outlet />
    </div>
  </div>
)
