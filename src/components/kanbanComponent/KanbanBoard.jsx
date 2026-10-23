import { useState } from "react"
import { Droppable } from "@hello-pangea/dnd"
import KanbanColumn from "./KanbanColumn"
import TaskModal from "./TaskModal"
import { generateId } from "@/utils/helpers"

export default function KanbanBoard({ columns, tasks, onAddTask, onUpdateTask, onDeleteTask }) {
  const [selectedTask, setSelectedTask] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleTaskClick = (task) => {
    setSelectedTask(task)
    setIsModalOpen(true)
  }

  const handleAddTask = (columnId) => {
    const newTask = {
      id: `task-${generateId()}`,
      title: "Save Secure",
      description: "Design Save Secure Landing Page and draw wireframe for the other pages",
      status: columnId,
      dueDate: "12/02/25",
      progress: 0,
      assignees: [],
      comments: 0,
      project: "Save Secure",
      isExpanded: true,
    }

    onAddTask(columnId, newTask)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedTask(null)
  }

  const handleSaveTask = (task) => {
    onUpdateTask(task)
    setIsModalOpen(false)
    setSelectedTask(null)
  }

  const handleDeleteTask = (taskId) => {
    onDeleteTask(taskId)
    setIsModalOpen(false)
    setSelectedTask(null)
  }

  const handleToggleExpand = (taskId) => {
    const task = tasks.find((t) => t.id === taskId)
    if (task) {
      onUpdateTask({ ...task, isExpanded: !task.isExpanded })
    }
  }

  return (
    <div className="flex gap-4 overflow-x-auto pb-4">
      {columns.map((column) => {
        const columnTasks = tasks.filter((task) => task.status === column.id)

        return (
          <Droppable key={column.id} droppableId={column.id}>
            {(provided) => (
              <KanbanColumn
                column={column}
                tasks={columnTasks}
                onTaskClick={handleTaskClick}
                onAddTask={() => handleAddTask(column.id)}
                onToggleExpand={handleToggleExpand}
                provided={provided}
              />
            )}
          </Droppable>
        )
      })}

      {isModalOpen && selectedTask && (
        <TaskModal
          task={selectedTask}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSave={handleSaveTask}
          onDelete={handleDeleteTask}
          columns={columns}
        />
      )}
    </div>
  )
}
