"use client";

import { LayoutGrid, List, ChevronDown } from "lucide-react";
import { BoxViewIcon, SideBarTaskIcon } from "../icons/Icons";

export default function Header({ viewType, onToggleView }) {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-lg md:text-xl  font-bold">
        {viewType === "kanban" ? "Kanban Board" : "Task List"}
      </h1>

      <div className="flex items-center gap-4">
        <div className=" hidden md:flex items-center gap-2">
          <span className="text-xs md:text-sm ">This Month</span>
          <ChevronDown className="h-4 w-4" />
        </div>

        <div className="flex gap-4   overflow-hidden">
          <div
            className={`  p-2 ${
              viewType === "kanban"
                ? "bg-primary-background rounded-md text-white"
                : "bg-white"
            }`}
            onClick={() => onToggleView("kanban")}
            aria-label="Kanban view"
          >
            <SideBarTaskIcon />
          </div>
          <div
            className={` p-2 ${
              viewType === "list"
                ? "bg-primary-background rounded-md text-white"
                : "bg-white"
            }`}
            onClick={() => onToggleView("list")}
            aria-label="List view"
          >
            <BoxViewIcon />
          </div>
        </div>
      </div>
    </div>
  );
}
