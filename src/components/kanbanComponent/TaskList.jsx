"use client"

import { useState } from "react"
import { MoreHorizontal } from "lucide-react"
import { getStatusBadgeColor, getPriorityColor } from "@/utils/helpers"
import TaskModal from "./TaskModal"
import AvatarGroup from "./AvatarGroup"
import { users } from "@/data/initialData"

export default function TaskList({ tasks, onUpdateTask, onDeleteTask }) {
  const [selectedTask, setSelectedTask] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const columns = [
    { id: "to-do", title: "To do" },
    { id: "ongoing", title: "Ongoing" },
    { id: "reviewed", title: "Reviewed" },
    { id: "completed", title: "Completed" },
  ]

  const handleTaskClick = (task) => {
    setSelectedTask(task)
    setIsModalOpen(true)
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

  // Calculate pagination
  const totalPages = Math.ceil(tasks.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedTasks = tasks.slice(startIndex, startIndex + itemsPerPage)

  // Map status to display format
  const getDisplayStatus = (status) => {
    switch (status) {
      case "to-do":
        return "Upcoming"
      case "ongoing":
        return "Ongoing"
      case "reviewed":
        return "Completed"
      case "completed":
        return "Completed"
      default:
        return status
    }
  }

  return (
   <div className="">


<div className="bg-white rounded-lg shadow overflow-y-scroll">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Task
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Project
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Assignee
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Priority Level
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Due Date
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Tracked Time
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {paginatedTasks.map((task) => {
            const taskUsers = task.assignees
              ? task.assignees.map((id) => users.find((user) => user.id === id)).filter(Boolean)
              : []

            const displayStatus = getDisplayStatus(task.status)
            const statusClass = getStatusBadgeColor(displayStatus)
            const priorityClass = getPriorityColor(task.priority)

            return (
              <tr key={task.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => handleTaskClick(task)}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{task.title}</div>
                  {task.description && (
                    <div className="text-sm text-gray-500 truncate max-w-xs">{task.description}</div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{task.project}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusClass}`}>
                    {displayStatus}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <AvatarGroup users={taskUsers} maxAvatars={2} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {task.priority && (
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${priorityClass}`}>
                      {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{task.dueDate}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{task.timeSpent || "8 hours"}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    className="text-gray-400 hover:text-gray-500"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleTaskClick(task)
                    }}
                  >
                    <MoreHorizontal className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>

      {/* Pagination */}
      

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

<div className="bg-gray-50 px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
<div className="text-sm text-gray-700">
  Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, tasks.length)} of {tasks.length} entries
  found
</div>
<div className="flex-1 flex justify-end">
  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
    <button
      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
      disabled={currentPage === 1}
      className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
    >
      &laquo;
    </button>

    {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
      const pageNum = i + 1
      return (
        <button
          key={pageNum}
          onClick={() => setCurrentPage(pageNum)}
          className={`relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium ${
            pageNum === currentPage ? "bg-indigo-50 text-indigo-600" : "text-gray-700 hover:bg-gray-50"
          }`}
        >
          {pageNum}
        </button>
      )
    })}

    <button
      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
      disabled={currentPage === totalPages}
      className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
    >
      &raquo;
    </button>
  </nav>
</div>
</div>
   </div>
  )
}
