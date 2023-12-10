import { useEffect, useState } from "react"
import Task from "./Task"

const API_BASE = import.meta.env.VITE_API_BASE

const TaskList = () => {
  const [tasks, setTasks] = useState()

  useEffect(() => {
    fetch(`${API_BASE}/tasks`)
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.error(err))
  }, [])

  return (
    <div className="flex flex-col gap-2">
      {tasks &&
        (tasks.length === 0 ? (
          <p className="text-gray-400 text-center">No tasks added yet...</p>
        ) : (
          tasks.map((task) => <Task key={task._id} task={task} />)
        ))}
    </div>
  )
}

export default TaskList
