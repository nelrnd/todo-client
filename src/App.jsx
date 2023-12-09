import { useState, useEffect } from "react"

const API_BASE = import.meta.env.VITE_API_BASE

const App = () => {
  const [name, setName] = useState("")
  const [tasks, setTasks] = useState()

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

  useEffect(() => {
    fetch(`${API_BASE}/tasks`)
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.error(err))
  }, [])

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-lg m-auto">
        <h1 className="font-bold text-4xl text-center mb-8">ToDo List</h1>
        <form onSubmit={handleSubmit} className="m-auto">
          <div className="flex gap-2">
            <input
              className="flex-1"
              type="text"
              name="name"
              placeholder="Add a task"
              value={name}
              onChange={handleNameChange}
            />
            <button className="font-semibold text-white bg-blue-700 hover:bg-blue-800 px-6">
              Submit
            </button>
          </div>
        </form>

        <div>
          {tasks && tasks.map((task) => <Task key={task._id} task={task} />)}
        </div>
      </div>
    </div>
  )
}

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

  const handleEdit = () => {
    console.log("edited")
  }

  const handleDelete = () => {
    const options = {}
    options.method = "DELETE"
    fetch(`${API_BASE}/tasks/${task._id}`, options)
      .then(() => location.reload())
      .catch((err) => console.error(err))
  }

  return (
    <div>
      <label>
        <input
          type="checkbox"
          onChange={handleCheck}
          defaultChecked={task.done}
        />
        <span>{task.name}</span>
      </label>

      <button onClick={handleEdit}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  )
}

export default App
