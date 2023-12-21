import { useEffect, useState } from "react"
import TaskForm from "../components/TaskForm"
import TaskList from "../components/TaskList"

const API_BASE = import.meta.env.VITE_API_BASE

const Home = () => {
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
    <>
      <TaskForm addTask={(t) => setTasks([t, ...tasks])} />
      <TaskList tasks={tasks} setTasks={setTasks} />
    </>
  )
}

export default Home
