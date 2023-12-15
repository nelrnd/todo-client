import { useNavigate } from "react-router-dom"
import Header from "../components/Header"

const Settings = () => {
  const navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem("token")
    navigate("/login")
  }

  return (
    <div className="min-h-screen px-4 py-8 dark:bg-gray-950 dark:text-white">
      <div className="max-w-lg m-auto">
        <Header />
        <h2 className="font-bold text-2xl mb-4">Settings</h2>

        <button
          onClick={logout}
          className="block w-full font-semibold text-sm text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  )
}

export default Settings
