import { useContext, useState } from "react"
import { TasksContext } from "../contexts/TasksContext"

const API_BASE = import.meta.env.VITE_API_BASE

const TaskForm = () => {
  const { setTasks } = useContext(TasksContext)
  const [name, setName] = useState("")

  const handleNameChange = (event) => setName(event.target.value)

  const handleSubmit = (event) => {
    event.preventDefault()
    const token = localStorage.getItem("token")

    if (!name || !token) return
    const options = {}
    options.method = "POST"
    options.headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    }
    options.body = JSON.stringify({ name })
    fetch(`${API_BASE}/tasks`, options)
      .then((res) => res.json())
      .then((task) => {
        setTasks((prevTasks) => [task, ...prevTasks])
        setName("")
      })
      .catch((err) => console.error(err))
  }

  return (
    <form onSubmit={handleSubmit} className="m-auto mb-4">
      <div className="flex gap-2">
        <input
          className="flex-1 p-3 rounded bg-transparent border-gray-300 dark:border-gray-700"
          type="text"
          name="name"
          autoComplete="off"
          placeholder="Add a task"
          required={true}
          value={name}
          onChange={handleNameChange}
          autoFocus
        />
        <button className="font-semibold rounded text-white bg-blue-700 hover:bg-blue-800 px-6">
          Submit
        </button>
      </div>
    </form>
  )
}

export default TaskForm
