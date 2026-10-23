import { useState } from "react";
import {
  Eye,
  Edit,
  Save,
  Download,
  Clock,
  Archive,
  MoreVertical,
} from "lucide-react";
import { Popover, Typography } from "@mui/material";
import {
  PopoverArchivedIcon,
  PopoverDownloadIcon,
  PopoverEditIcon,
  PopoverSaveIcon,
  PopoverViewIcon,
} from "../icons/popoverIcons";

export function ActionMenu({ onSendReminder }) {
  // const [isOpen, setIsOpen] = useState(false)

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const actions = [
    { icon: PopoverViewIcon, label: "View" },
    { icon: PopoverEditIcon, label: "Edit" },
    { icon: PopoverSaveIcon, label: "Save" },
    { icon: PopoverDownloadIcon, label: "Download" },
    { icon: Clock, label: "Send Reminder", onClick: onSendReminder },
    { icon: PopoverArchivedIcon, label: "Archived" },
  ];

  return (
    <div className="relative">
      <button
        onClick={handleClick}
        className="p-2 hover:bg-gray-100 rounded-full"
      >
        <MoreVertical className="w-4 h-4" />
      </button>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <div className="space-y-4  p-4">
          <div className="text-lg font-medium">Actions</div>
          <div className=" grid grid-cols-2 gap-4  w-fit ">
            {actions.map((action, index) => (
              <button
                key={index}
                className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                onClick={() => {
                  handleClose();
                  action.onClick?.();
                }}
              >
                <action.icon className="w-4 h-4" />
                {action.label}
              </button>
            ))}
          </div>
        </div>
      </Popover>
    </div>
  );
}
