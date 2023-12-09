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
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleNameChange}
        />
        <button>Submit</button>
      </form>

      <div>
        {tasks && tasks.map((task) => <Task key={task._id} task={task} />)}
      </div>
    </div>
  )
}

const Task = ({ task }) => <div>{task.name}</div>

export default App
