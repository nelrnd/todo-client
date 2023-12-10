import Header from "./components/Header"
import TaskForm from "./components/TaskForm"
import TaskList from "./components/TaskList"

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

export default App
