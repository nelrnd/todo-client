import { useState } from "react"

const API_BASE = import.meta.env.VITE_API_BASE

const App = () => {
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
    </div>
  )
}

export default App
