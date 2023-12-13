import React, { useRef, useState } from "react"
import * as Dialog from "@radix-ui/react-dialog"
import * as Menu from "@radix-ui/react-dropdown-menu"

const API_BASE = import.meta.env.VITE_API_BASE

const TaskMenu = ({ task }) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [hasOpenDialog, setHasOpenDialog] = useState(false)
  const menuTriggerRef = useRef(null)
  const focusRef = useRef(null)

  const handleDialogItemSelect = () => {
    focusRef.current = menuTriggerRef.current
  }

  const handleDialogItemOpenChange = (open) => {
    setHasOpenDialog(open)
    if (open === false) {
      setMenuOpen(false)
    }
  }

  return (
    <Menu.Root open={menuOpen} onOpenChange={setMenuOpen}>
      <Menu.Trigger asChild>
        <button
          ref={menuTriggerRef}
          className="w-8 h-8 block px-2.5 py-1.5 rounded-sm border border-gray-200 hover:bg-gray-200 dark:border-gray-800 dark:hover:bg-gray-800"
        >
          <div className="-translate-y-1 text-gray-500">...</div>
        </button>
      </Menu.Trigger>
      <Menu.Content
        hidden={hasOpenDialog}
        onCloseAutoFocus={(event) => {
          if (focusRef.current) {
            focusRef.current.focus()
            focusRef.current = null
            event.preventDefault()
          }
        }}
        className="bg-white dark:bg-gray-900 rounded-md shadow shadow-menu p-2 translate-y-1 z-10 animate-menu-content"
      >
        <div className="flex flex-col gap-2">
          <TaskEditDialog
            task={task}
            onSelect={handleDialogItemSelect}
            onOpenChange={handleDialogItemOpenChange}
          />
          <TaskDeleteDialog
            task={task}
            onSelect={handleDialogItemSelect}
            onOpenChange={handleDialogItemOpenChange}
          />
        </div>
        <Menu.Arrow className="fill-white dark:fill-gray-900" />
      </Menu.Content>
    </Menu.Root>
  )
}

const DialogItem = React.forwardRef((props, forwardedRef) => {
  const { triggerChildren, children, onSelect, onOpenChange, ...itemProps } =
    props
  return (
    <Dialog.Root onOpenChange={onOpenChange}>
      <Dialog.Trigger asChild>
        <Menu.Item
          {...itemProps}
          ref={forwardedRef}
          className="MenuItem"
          onSelect={(event) => {
            event.preventDefault()
            onSelect && onSelect()
          }}
        >
          {triggerChildren}
        </Menu.Item>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black bg-opacity-20 fixed inset-0" />
        <Dialog.Content className="bg-white dark:bg-gray-900 dark:text-white fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-sm w-11/12 rounded-lg shadow-xl p-6 animate-dialog-content">
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
})

DialogItem.displayName = "DialogItem"

const TaskEditDialog = ({ task, onSelect, onOpenChange }) => {
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
    <DialogItem
      triggerChildren={
        <button className="block w-full font-semibold text-sm text-gray-500 bg-gray-100 hover:bg-gray-200 px-6 py-2 rounded dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700">
          Edit
        </button>
      }
      onSelect={onSelect}
      onOpenChange={onOpenChange}
    >
      <Dialog.Title className="font-bold text-2xl mb-4">Edit task</Dialog.Title>
      <form onSubmit={handleSubmit}>
        <input
          className="block w-full mb-4 rounded border-gray-300 bg-transparent dark:border-gray-600"
          type="text"
          name="name"
          value={newName}
          onChange={handleNewNameChange}
        />
        <div className="flex justify-end gap-4">
          <Dialog.Close asChild>
            <button
              type="button"
              className="font-semibold text-gray-500 bg-gray-100 hover:bg-gray-200 px-6 py-2 rounded dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
            >
              Close
            </button>
          </Dialog.Close>
          <button className="font-semibold text-white bg-blue-700 hover:bg-blue-800 px-6 py-2 rounded">
            Save
          </button>
        </div>
      </form>
    </DialogItem>
  )
}

const TaskDeleteDialog = ({ task, onSelect, onOpenChange }) => {
  const handleDelete = () => {
    const options = {}
    options.method = "DELETE"
    fetch(`${API_BASE}/tasks/${task._id}`, options)
      .then(() => location.reload())
      .catch((err) => console.error(err))
  }
  return (
    <DialogItem
      triggerChildren={
        <button className="block w-full font-semibold text-sm text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded">
          Delete
        </button>
      }
      onSelect={onSelect}
      onOpenChange={onOpenChange}
    >
      <Dialog.Title className="font-bold text-2xl mb-4">
        Delete task
      </Dialog.Title>
      <p className="text-gray-600 mb-4">
        Do you really want to delete that{" "}
        <span className="text-black dark:text-white">"{task.name}"</span> task?
      </p>
      <div className="flex justify-end gap-4">
        <Dialog.Close asChild>
          <button
            type="button"
            className="font-semibold text-gray-500 bg-gray-100 hover:bg-gray-200 px-6 py-2 rounded dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
          >
            Close
          </button>
        </Dialog.Close>
        <button
          onClick={handleDelete}
          className="font-semibold text-white bg-red-500 hover:bg-red-600 px-6 py-2 rounded"
        >
          Delete
        </button>
      </div>
    </DialogItem>
  )
}

export default TaskMenu
