import { useState, useEffect } from "react"
import * as Dialog from "@radix-ui/react-dialog"
import * as Menu from "@radix-ui/react-dropdown-menu"

const API_BASE = import.meta.env.VITE_API_BASE

const App = () => {
  return (
    <div className="px-4 py-8">
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
          autoFocus
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

const TaskMenu = ({ task }) => {
  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <button className="w-8 h-8 block px-2.5 py-1.5 rounded-sm border border-gray-200 hover:bg-gray-200">
          <div className="-translate-y-1 text-gray-500">...</div>
        </button>
      </Menu.Trigger>

      <Menu.Portal>
        <Menu.Content className="bg-white shadow shadow-modal p-2">
          <Menu.Arrow className="fill-white" />
          <div className="flex flex-col gap-2">
            <Menu.Item asChild>
              <TaskEditModal task={task} />
            </Menu.Item>
            <Menu.Item asChild>
              <TaskDeleteModal task={task} />
            </Menu.Item>
          </div>
        </Menu.Content>
      </Menu.Portal>
    </Menu.Root>
  )
}

const TaskEditModal = ({ task }) => {
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
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="block w-full font-semibold text-sm text-gray-500 bg-gray-100 hover:bg-gray-200 px-6 py-2">
          Edit
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black bg-opacity-20 fixed inset-0" />
        <Dialog.Content className="bg-white fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-sm w-11/12 shadow-sm p-6">
          <Dialog.Title className="font-bold text-2xl mb-4">
            Edit task
          </Dialog.Title>
          <form onSubmit={handleSubmit}>
            <input
              className="block w-full mb-4"
              type="text"
              name="name"
              value={newName}
              onChange={handleNewNameChange}
            />
            <div className="flex justify-end gap-4">
              <Dialog.Close asChild>
                <button
                  type="button"
                  className="font-semibold text-gray-500 bg-gray-100 hover:bg-gray-200 px-6 py-2"
                >
                  Close
                </button>
              </Dialog.Close>
              <button className="font-semibold text-white bg-blue-700 hover:bg-blue-800 px-6 py-2">
                Save
              </button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

const TaskDeleteModal = ({ task }) => {
  const handleDelete = () => {
    const options = {}
    options.method = "DELETE"
    fetch(`${API_BASE}/tasks/${task._id}`, options)
      .then(() => location.reload())
      .catch((err) => console.error(err))
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="block w-full font-semibold text-sm text-white bg-red-500 hover:bg-red-600 px-4 py-2">
          Delete
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black bg-opacity-20 fixed inset-0" />
        <Dialog.Content className="bg-white fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-sm w-11/12 shadow-sm p-6">
          <Dialog.Title className="font-bold text-2xl mb-4">
            Delete task
          </Dialog.Title>
          <p className="text-gray-600 mb-4">
            Do you really want to delete that{" "}
            <span className="text-black">"{task.name}"</span> task?
          </p>
          <div className="flex justify-end gap-4">
            <Dialog.Close asChild>
              <button
                type="button"
                className="font-semibold text-gray-500 bg-gray-100 hover:bg-gray-200 px-6 py-2"
              >
                Close
              </button>
            </Dialog.Close>
            <button
              onClick={handleDelete}
              className="font-semibold text-white bg-red-500 hover:bg-red-600 px-6 py-2"
            >
              Delete
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default App
