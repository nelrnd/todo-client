import TaskMenu from "./TaskMenu"
import { useContext } from "react"
import { TasksContext } from "../contexts/TasksContext"

const API_BASE = import.meta.env.VITE_API_BASE

const Task = ({ task }) => {
  const { setTasks } = useContext(TasksContext)

  const handleCheck = (event) => {
    const token = localStorage.getItem("token")
    if (!token) return

    const updatedTask = { ...task, done: event.target.checked }
    setTasks((prevTasks) =>
      prevTasks.map((t) => (t._id === task._id ? updatedTask : t))
    )

    const options = {}
    options.method = "PUT"
    options.headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    }
    options.body = JSON.stringify({ done: event.target.checked })
    fetch(`${API_BASE}/tasks/${task._id}`, options).catch((err) =>
      console.error(err)
    )
  }

  if (!task) return null

  return (
    <div className="p-3 flex items-center gap-2 border-b border-gray-200 dark:border-gray-600 last-of-type:border-b-0">
      <div className="flex-1">
        <label className="inline-flex gap-2 items-center">
          <input
            type="checkbox"
            onChange={handleCheck}
            defaultChecked={task.done}
            className="bg-transparent"
          />
          <span className={task.done ? "text-gray-400 line-through" : ""}>
            {task.name}
          </span>
        </label>
      </div>

      <TaskMenu task={task} setTasks={setTasks} />
    </div>
  )
}

export default Task
