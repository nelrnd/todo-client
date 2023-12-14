import Header from "../components/Header"
import TaskForm from "../components/TaskForm"
import TaskList from "../components/TaskList"

const Home = () => (
  <div className="min-h-screen px-4 py-8 dark:bg-gray-950 dark:text-white">
    <div className="max-w-lg m-auto">
      <Header />
      <TaskForm />
      <TaskList />
    </div>
  </div>
)

export default Home
