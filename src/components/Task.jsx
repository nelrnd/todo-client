import TaskMenu from "./TaskMenu"

const API_BASE = import.meta.env.VITE_API_BASE

const Task = ({ task }) => {
  const handleCheck = (event) => {
    const done = event.target.checked
    const options = {}
    options.method = "PUT"
    options.headers = { "Content-Type": "application/json" }
    options.body = JSON.stringify({ done })
    fetch(`${API_BASE}/tasks/${task._id}`, options).catch((err) =>
      console.error(err)
    )
  }

  return (
    <div className="p-3 flex items-center gap-2 border-b border-gray-200 last-of-type:border-b-0">
      <div className="flex-1">
        <label className="inline-flex gap-2 items-center">
          <input
            type="checkbox"
            onChange={handleCheck}
            defaultChecked={task.done}
          />
          <span>{task.name}</span>
        </label>
      </div>

      <TaskMenu task={task} />
    </div>
  )
}

export default Task
