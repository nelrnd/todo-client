import { useNavigate } from "react-router-dom"

const Settings = () => {
  const navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem("token")
    navigate("/login")
  }

  return (
    <>
      <h2 className="font-bold text-2xl mb-4">Settings</h2>

      <button
        onClick={logout}
        className="block w-full font-semibold text-sm text-white bg-red-500 hover:bg-red-600 px-4 py-3 rounded"
      >
        Logout
      </button>
    </>
  )
}

export default Settings
