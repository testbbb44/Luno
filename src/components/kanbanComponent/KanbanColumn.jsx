"use client"

import { Draggable } from "@hello-pangea/dnd"
import { Plus } from "lucide-react"
import TaskCard from "./TaskCard"

export default function KanbanColumn({ column, tasks, onTaskClick, onAddTask, onToggleExpand, provided, color }) {
  return (
    <div className="flex-shrink-0 w-72">
      <div className="flex   items-center justify-between mb-2 bg-[#F6F6FE] rounded-md p-3">
        <div className="flex items-center gap-2">
          <h3 className="font-medium text-sm md:text-base">{column.title}</h3>
          <span className={`${color || "bg-[#d0cbff]"} text-gray-700 text-xs  px-2 py-0.5 rounded-full`}>{tasks.length}</span>
        </div>
        <button
          className="p-1 rounded-full bg-[#DEDEED] hover:bg-[#F6F6FE]"
          onClick={onAddTask}
          aria-label={`Add task to ${column.title}`}
        >
          <Plus className="h-5 w-5" />
        </button>
      </div>

      <div ref={provided.innerRef} {...provided.droppableProps} className="space-y-3">
        {tasks.map((task, index) => (
          <Draggable key={task.id} draggableId={task.id} index={index}>
            {(provided) => (
              <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                <TaskCard
                  task={task}
                  onClick={() => onTaskClick(task)}
                  onToggleExpand={() => onToggleExpand(task.id)}
                />
              </div>
            )}
          </Draggable>
        ))}
        {provided.placeholder}

        <button
          className="w-full py-2 px-3 bg-gray-100 hover:bg-gray-200 rounded-md text-gray-600 text-sm flex items-center justify-center"
          onClick={onAddTask}
        >
          <Plus className="h-4 w-4 mr-1" /> Create New Task
        </button>
      </div>
    </div>
  )
}
