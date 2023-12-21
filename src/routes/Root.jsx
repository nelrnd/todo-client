import { Outlet } from "react-router-dom"
import Header from "../components/Header"
import { useEffect, useState } from "react"
import { TasksContext } from "../contexts/TasksContext"

const API_BASE = import.meta.env.VITE_API_BASE

export const Root = () => {
  const [tasks, setTasks] = useState([])

  // Fetch tasks
  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      const options = {}
      options.headers = { Authorization: `Bearer ${token}` }
      fetch(`${API_BASE}/tasks`, options)
        .then((res) => res.json())
        .then((data) => setTasks(data))
        .catch((err) => console.error(err))
    }
  }, [])

  return (
    <TasksContext.Provider value={{ tasks, setTasks }}>
      <div className="min-h-screen px-4 py-8 dark:bg-gray-950 dark:text-white">
        <div className="max-w-lg m-auto">
          <Header />
          <Outlet />
        </div>
      </div>
    </TasksContext.Provider>
  )
}
