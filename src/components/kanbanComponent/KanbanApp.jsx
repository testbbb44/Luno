"use client";

import { useState } from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import { initialData } from "@/data/initialData";
import KanbanBoard from "./KanbanBoard";
import TaskList from "./TaskList";
import Header from "./Headers";
import { TableContainer } from "@mui/material";

function KanbanApp() {
  const [columns, setColumns] = useState(initialData.columns);
  const [tasks, setTasks] = useState(initialData.tasks);
  const [viewType, setViewType] = useState("kanban");

  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    // If there's no destination or the item is dropped in the same place
    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    ) {
      return;
    }

    // Find the task being moved
    const task = tasks.find((t) => t.id === draggableId);
    if (!task) return;

    // Update the task's status based on the destination column
    const updatedTask = { ...task, status: destination.droppableId };

    // Update tasks array
    const updatedTasks = tasks.map((t) =>
      t.id === draggableId ? updatedTask : t
    );
    setTasks(updatedTasks);
  };

  const handleAddTask = (columnId, task) => {
    setTasks([...tasks, task]);
  };

  const handleUpdateTask = (updatedTask) => {
    setTasks(
      tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const handleToggleView = (view) => {
    setViewType(view);
  };

  return (
    <div className="min-h-screen flex-1 overflow-auto rounded-xl">
      <div className=" border rounded-xl  p-4">
        <Header viewType={viewType} onToggleView={handleToggleView} />

        <div className="flex-1 max-w-full">
        
          <DragDropContext onDragEnd={handleDragEnd}>
            {viewType === "kanban" ? (
              <KanbanBoard
                columns={columns}
                tasks={tasks}
                onAddTask={handleAddTask}
                onUpdateTask={handleUpdateTask}
                onDeleteTask={handleDeleteTask}
              />
            ) : (
              <TaskList
                tasks={tasks}
                onUpdateTask={handleUpdateTask}
                onDeleteTask={handleDeleteTask}
              />
            )}
          </DragDropContext>
        </div>
      </div>
    </div>
  );
}

export default KanbanApp;
