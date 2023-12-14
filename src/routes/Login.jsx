import { useState } from "react"
import { Link } from "react-router-dom"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleEmailChange = (event) => setEmail(event.target.value)
  const handlePasswordChange = (event) => setPassword(event.target.value)

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log({ email, password })
  }

  return (
    <div className="min-h-screen px-4 py-8 dark:bg-gray-950 dark:text-white">
      <div className="max-w-sm m-auto">
        <h1 className="font-bold text-2xl mb-6">Login</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label>
            <span>Email</span>
            <input
              className="block w-full mt-1 p-3 rounded bg-transparent border-gray-300 dark:border-gray-700"
              type="email"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </label>
          <label>
            <span>Password</span>
            <input
              className="block w-full mt-1 p-3 rounded bg-transparent border-gray-300 dark:border-gray-700"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </label>
          <button className="mt-2 font-semibold rounded text-white bg-blue-700 hover:bg-blue-800 px-6 py-3">
            Login
          </button>
        </form>
        <p className="text-gray-400 dark:text-gray-600 mt-6">
          You don&#39;t have an account yet?{" "}
          <Link to="/register" className="text-blue-500 hover:text-blue-600">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login
