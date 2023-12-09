import { useState, useEffect } from "react"

const API_BASE = import.meta.env.VITE_API_BASE

const App = () => {
  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-lg m-auto">
        <Header />

        <TaskForm />

        <TaskList />
      </div>
    </div>
  )
}

const Header = () => (
  <header>
    <h1 className="font-bold text-4xl text-center mb-8">ToDo List</h1>
  </header>
)

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
          className="flex-1 p-3"
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
  )
}

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

const Task = ({ task }) => {
  const [editMode, setEditMode] = useState(false)

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

  const handleEditToggle = () => {
    setEditMode(!editMode)
  }

  const handleDelete = () => {
    const options = {}
    options.method = "DELETE"
    fetch(`${API_BASE}/tasks/${task._id}`, options)
      .then(() => location.reload())
      .catch((err) => console.error(err))
  }

  return (
    <div className="p-3 flex gap-2 border-b border-gray-200 last-of-type:border-b-0">
      <div className="flex-1">
        <label className="inline-flex gap-2 items-center">
          <input
            type="checkbox"
            onChange={handleCheck}
            defaultChecked={task.done}
          />
          {editMode ? <TaskEditForm task={task} /> : <span>{task.name}</span>}
        </label>
      </div>

      <button onClick={handleEditToggle}>{editMode ? "Close" : "Edit"}</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  )
}

const TaskEditForm = ({ task }) => {
  const [newName, setNewName] = useState(task.name)

  const handleNewNameChange = (event) => setNewName(event.target.value)

  const handleSubmit = (event) => {
    event.preventDefault()

    const options = {}
    options.method = "PUT"
    options.headers = { "Content-Type": "application/json" }
    options.body = JSON.stringify({ name: newName })
    fetch(`${API_BASE}/tasks/${task._id}`, options)
      .then(() => location.reload())
      .catch((err) => console.error(err))
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={newName}
        onChange={handleNewNameChange}
      />
      <button>Update</button>
    </form>
  )
}

export default App
