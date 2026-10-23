import React, { useState } from "react";
import { Download, Plus } from "lucide-react";
import { StatusBadge } from "./StatusBadge";
import { ActionMenu } from "./ActionMenu";
import { ReminderModal } from "./ReminderModal";
import { Button, IconButton, Popover } from "@mui/material";
import Filter from "../../assets/filter.svg";
import SearchIcon from "../../assets/searchicon.svg";

export function DataTable({
  title,
  data,
  columns,
  hasSearch = true,
  hasFilter = true,
  hasAction = true,
  hasPagination = true,
  showGenerateButton = false,
  showExportButton = false,
  onGenerateNew,
  onExport,
  filterActions,
  onSearch,
  searchTerm,
  setSearchTerm,
  currentPage = 1,
  setCurrentPage,
  totalPages,
  itemsPerPage = 10,
  totalItems,
  filterByMonth,
  options,
  setSelected,
  selected,
  hasBorder = true,
  children
}) {
  const [isReminderModalOpen, setIsReminderModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [currentMonth, setCurmrentMonth] = useState("This Month");
  const [anchorEl, setAnchorEl] = useState(null);

  const handleSendReminder = (item) => {
    setSelectedItem(item);
    setIsReminderModalOpen(true);
  };

  const handleReminderSubmit = (email) => {
    console.log("Sending reminder to:", email, "for item:", selectedItem);
    // Add your reminder sending logic here
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // const [selected, setSelected] = useState(options[0].value);

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div className={`bg-white ${hasBorder && "border"} rounded-xl shadow-sm`}>
      <div className={`${hasBorder && "p-6"}`}>
        {filterByMonth && (
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-medium">{title}</h2>
            <div className="flex items-center gap-4">
              <select
                className="text-sm bg-transparent border-0"
                value={currentMonth}
                onChange={(e) => {
                  setCurrentMonth(e.target.value);
                  filterByMonth(e.target.value);
                }}
              >
                <option>This Month</option>
                <option>Last Month</option>
              </select>
            </div>
          </div>
        )}

        <div className="flex mb-6 flex-row-reverse justify-between items-center">
          {children}
          {showExportButton || showGenerateButton ? (
            <div className="flex gap-4 items-center">
              {showGenerateButton && (
                <button
                  onClick={() => onGenerateNew(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-darkBlue text-white rounded-lg hover:bg-indigo-700"
                >
                  <Plus className="w-4 h-4" />
                  Generate New Invoice
                </button>
              )}
              {showExportButton && (
                <button
                  onClick={onExport}
                  className="flex items-center border-darkBlue text-darkBlue border-2 gap-2 px-4 py-2 rounded-lg hover:bg-gray-50"
                >
                  Export
                  <Download className="w-4 h-4" />
                </button>
              )}
            </div>
          ) : null}

          <div className="flex justify-end gap-4">
            {hasSearch && (
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => {
                    // setSearchTerm(e.target.value)
                    onSearch(e.target.value);
                  }}
                  placeholder="Search..."
                  className="max-w-[200px] pr-10 pl-4 py-2 bg-offwhite rounded-lg focus:outline-none focus:ring-none focus:ring-none"
                />
                <img
                  src={SearchIcon || "/placeholder.svg"}
                  className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500"
                  alt="Search"
                />
              </div>
            )}
            {hasFilter && (
              <IconButton onClick={handleClick} aria-label="filter">
                <img
                  src={Filter || "/placeholder.svg"}
                  className="h-5 w-5"
                  alt="Filter"
                />
              </IconButton>
            )}
            {options && (
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
                <div className="space-y-4 p-4">
                  {/* <div className="text-lg font-medium">Actions</div> */}
                  {/* <div className="grid grid-cols-1 gap-1 w-fit">
                  {filterActions?.map((action, index) => (
                    <button
                      key={index}
                      className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                      onClick={() => {
                        handleClose();
                        action.onClick?.();
                      }}
                    >
                      {action.label}
                    </button>
                  ))}
                </div> */}
                  <div className="space-y-2  rounded-md">
                    {options.map((option) => (
                      <label
                        key={option.value}
                        className="flex items-center text-xs space-x-2 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          name="category"
                          value={option.value}
                          checked={selected === option.value}
                          onChange={() => setSelected(option.value)}
                          className="w-3 h-3 text-darbBlue"
                        />
                        <span className="text-gray-800">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </Popover>
            )}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b text-xs text-[#3D3D49] font-medium">
                {columns?.map((data, index) => (
                  <th
                    key={index}
                    className={`${
                      data?.header === "Status" ? "text-center" : "text-center"
                    } pb-4 font-medium`}
                  >
                    {data?.header}
                  </th>
                ))}
                {hasAction && (
                  <th className="pb-4 text-center font-medium">Actions</th>
                )}
              </tr>
            </thead>
            <tbody>
              {data?.transactionData.map((item, index) => (
                <tr key={index} className="border-b text-sm last:border-b-0">
                  {columns?.map((column, colIndex) => (
                    <td
                      key={colIndex}
                      className={`py-4 ${
                        column.key === "status" ? "text-center" : "text-center"
                      }`}
                    >
                      {column?.key === "status" ? (
                        <StatusBadge status={item[column.key]} />
                      ) : (
                        item[column.key]
                      )}
                    </td>
                  ))}
                  {hasAction && (
                    <td className="py-4 text-center">
                      <ActionMenu
                        onSendReminder={() => handleSendReminder(item)}
                      />
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {hasPagination && (
          <div className="mt-6">
            <p className="text-sm bg-offwhite p-4 text-[#62646A]">
              Showing {itemsPerPage} items out of {totalItems} entries found
            </p>
            <div className="flex justify-end mt-6 items-center gap-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="rounded-full w-6 h-6 flex justify-center items-center border-2 border-grey hover:bg-gray-100 disabled:opacity-50"
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    d="M15 18l-6-6 6-6"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
              {Array.from(
                { length: totalItems / itemsPerPage },
                (_, i) => i + 1
              ).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 rounded-lg ${
                    page === currentPage
                      ? "bg-darkBlue text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() =>
                  setCurrentPage((prev) =>
                    Math.min(prev + 1, totalItems / itemsPerPage)
                  )
                }
                disabled={currentPage === totalItems / itemsPerPage}
                className="rounded-full w-6 h-6 flex justify-center items-center border-2 border-grey hover:bg-gray-100 disabled:opacity-50"
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    d="M9 18l6-6-6-6"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>

      <ReminderModal
        isOpen={isReminderModalOpen}
        onClose={() => setIsReminderModalOpen(false)}
        onSubmit={handleReminderSubmit}
        clientEmail={selectedItem?.email}
      />
    </div>
  );
}
