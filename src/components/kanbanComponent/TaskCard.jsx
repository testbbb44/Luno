"use client";

import { ChevronDown, ChevronUp, MessageSquare, Eye } from "lucide-react";
import AvatarGroup from "./AvatarGroup";
import { users } from "@/data/initialData";

export default function TaskCard({ task, onClick, onToggleExpand }) {
  const taskUsers = task.assignees
    ? task.assignees
        .map((id) => users.find((user) => user.id === id))
        .filter(Boolean)
    : [];

  const statusColor =
    task.status === "to-do"
      ? "bg-pink-200"
      : task.status === "ongoing"
      ? "bg-blue-200"
      : task.status === "reviewed"
      ? "bg-indigo-200"
      : "bg-emerald-200";

  return (
    <div className="bg-slate-50 rounded-md shadow-sm">
      <div className="p-3 cursor-pointer" onClick={onClick}>
        <div className="flex justify-between items-start mb-2">
          <h4 className="font-medium text-sm md:text-base">{task.title}</h4>
          <div className={`w-12 h-1.5 rounded-full ${statusColor}`}></div>
        </div>

        {task.isExpanded && (
          <>
            {task.description && (
              <p className=" text-sm md:text-base text-gray-600 mb-3">{task.description}</p>
            )}

            <div className="my-4 flex justify-end">
              {task.dueDate && (
                <span className="text-xs  text-gray-500">
                  {/* {task.dueDate} */}
                  {task.timeSpent && (
                    <span className="block">{task.timeSpent}</span>
                  )}
                </span>
              )}
            </div>

            {task.progress !== undefined && (
              <div className="">
                <div className="w-full bg-white rounded-full h-2 mb-3">
                  <div
                    className="bg-primary-background h-2 rounded-full"
                    style={{ width: `${task.progress}%` }}
                  ></div>
                </div>
                <div className="text-xs flex justify-end">
                  {`${task.progress}%`}
                </div>
              </div>
            )}

            <div className="flex border-t mt-8  justify-between items-center pt-2">
              <div className="flex items-center">
                <AvatarGroup users={taskUsers} maxAvatars={3} />
              </div>

              <div className="flex items-center gap-3">
                {task.comments !== undefined && (
                  <div className="flex items-center text-gray-500 text-sm">
                    <Eye className="h-4 w-4 mr-1" />
                    <span>{task.comments}</span>
                  </div>
                )}

                {task.comments !== undefined && (
                  <div className="flex items-center text-gray-500 text-sm">
                    <MessageSquare className="h-4 w-4 mr-1" />
                    <span>5</span>
                  </div>
                )}
                {task.isExpanded && (
                  <button
                    className="p-1 rounded-full hover:bg-gray-100"
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleExpand();
                    }}
                    aria-label={
                      task.isExpanded ? "Collapse task" : "Expand task"
                    }
                  >
                    <ChevronUp className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          </>
        )}

        <div className="flex justify-between items-center mt-2">
          {!task.isExpanded && (
            <>
              {task.dueDate && (
                <span className="text-xs text-gray-500">
                  {task.dueDate}
                  {task.timeSpent && (
                    <span className="block">{task.timeSpent}</span>
                  )}
                </span>
              )}

              <button
                className="p-1 rounded-full hover:bg-gray-100"
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleExpand();
                }}
                aria-label={task.isExpanded ? "Collapse task" : "Expand task"}
              >
                <ChevronDown className="h-4 w-4" />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
