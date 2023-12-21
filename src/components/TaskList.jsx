import { useState } from "react"
import * as RadioGroup from "@radix-ui/react-radio-group"
import { groupBy } from "core-js/actual/array/group-by"
import moment from "moment"
import Task from "./Task"

const filters = {
  all: () => true,
  active: (task) => !task.done,
  completed: (task) => task.done,
}

const TaskList = ({ tasks }) => {
  const [filter, setFilter] = useState(() => filters.all)

  const currentTasks = tasks
    .filter(filter)
    .groupBy((task) => task.timestamp.toString().slice(0, 10))

  const handleFilter = (filter) => {
    setFilter(() => filters[filter])
  }

  if (!tasks) return null

  return (
    <div>
      <RadioGroup.Root
        className="flex gap-1 mb-4"
        defaultValue="all"
        onValueChange={handleFilter}
      >
        {Object.keys(filters).map((filter) => (
          <RadioGroup.Item
            key={filter}
            value={filter}
            className="RadioGroupItem"
          >
            <div className="relative w-fit">
              {filter[0].toUpperCase() + filter.slice(1)}
              <RadioGroup.Indicator className="RadioGroupIndicator" />
            </div>
          </RadioGroup.Item>
        ))}
      </RadioGroup.Root>

      {tasks.length === 0 ? (
        <p className="text-gray-400 text-center">No tasks added yet...</p>
      ) : (
        Object.keys(currentTasks).map((dayGroup) => (
          <div key={dayGroup} className="relative">
            <Day timestamp={dayGroup} />
            {currentTasks[dayGroup].map((task) => (
              <Task key={task._id} initialTask={task} />
            ))}
          </div>
        ))
      )}
    </div>
  )
}

const Day = ({ timestamp }) => (
  <div className="sticky top-4 w-fit mb-2 px-3 py-0.5 pb-1 rounded-full m-auto bg-gray-100 dark:bg-gray-900">
    <time dateTime={timestamp} className="text-gray-400 text-sm inline">
      {moment(timestamp).isSame(new Date(), "day")
        ? "Today"
        : moment(timestamp).format("dddd D")}
    </time>
  </div>
)

export default TaskList
