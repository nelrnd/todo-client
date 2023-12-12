import { useEffect, useState } from "react"
import * as RadioGroup from "@radix-ui/react-radio-group"
import Task from "./Task"

const API_BASE = import.meta.env.VITE_API_BASE

const allFilter = () => true
const activeFilter = (task) => !task.done
const completedFilter = (task) => task.done

const TaskList = () => {
  const [tasks, setTasks] = useState()

  const [filter, setFilter] = useState(() => allFilter)

  const handleValueChange = (value) => {
    if (value === "active") {
      setFilter(() => activeFilter)
    } else if (value === "completed") {
      setFilter(() => completedFilter)
    } else {
      setFilter(() => allFilter)
    }
  }

  useEffect(() => {
    fetch(`${API_BASE}/tasks`)
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.error(err))
  }, [])

  return (
    <div className="flex flex-col gap-2">
      <RadioGroup.Root
        className="flex gap-3"
        defaultValue="all"
        onValueChange={handleValueChange}
      >
        <RadioGroup.Item value="all" className="RadioGroupItem">
          <div className="relative w-fit">
            All
            <RadioGroup.Indicator className="RadioGroupIndicator" />
          </div>
        </RadioGroup.Item>
        <RadioGroup.Item value="active" className="RadioGroupItem">
          <div className="relative w-fit">
            Active
            <RadioGroup.Indicator className="RadioGroupIndicator" />
          </div>
        </RadioGroup.Item>
        <RadioGroup.Item value="completed" className="RadioGroupItem">
          <div className="relative w-fit">
            Completed
            <RadioGroup.Indicator className="RadioGroupIndicator" />
          </div>
        </RadioGroup.Item>
      </RadioGroup.Root>

      {tasks &&
        (tasks.length === 0 ? (
          <p className="text-gray-400 text-center">No tasks added yet...</p>
        ) : (
          tasks
            .filter(filter)
            .map((task) => <Task key={task._id} task={task} />)
        ))}
    </div>
  )
}

export default TaskList
