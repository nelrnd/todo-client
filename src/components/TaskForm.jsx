import { useState } from "react"

const API_BASE = import.meta.env.VITE_API_BASE

const TaskForm = () => {
  const [name, setName] = useState("")

  const handleNameChange = (event) => setName(event.target.value)

  const handleSubmit = (event) => {
    event.preventDefault()

    const options = {}
    options.method = "POST"
    options.headers = { "Content-Type": "application/json" }
    options.body = JSON.stringify({ name })

    fetch(`${API_BASE}/tasks`, options)
      .then(() => location.reload())
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
