"use client"

import React, { useState } from "react"
import { EditWriteIcon } from "../icons/Icons"
import { X } from "lucide-react"

const PaymentPreferences = () => {
  const [editOpen, setEditOpen] = useState(false)
  const [selectedSchedule, setSelectedSchedule] = useState("monthly")

  const scheduleOptions = [
    { id: "weekly", label: "Weekly" },
    { id: "monthly", label: "Monthly" },
    { id: "completion", label: "Upon Completion" },
  ]

  const handleScheduleChange = (scheduleId) => {
    setSelectedSchedule(scheduleId)
  }

  const handleSave = () => {
    // Here you would typically send the data to a server
    setEditOpen(false)
  }

  const EditForm = () => (
    <div className="bg-white rounded-2xl border-2 p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="text-xl font-semibold">Payment Preferences</div>
        <button onClick={() => setEditOpen(false)} className="p-2 hover:bg-gray-100 rounded-full">
        <X size={20} />
        </button>
      </div>

      <div className="space-y-6">
        <div>
          <div className="text-sm text-gray-500 mb-4">Payment Schedule</div>
          <div className="space-y-4">
            {scheduleOptions.map((option) => (
              <div key={option.id} className="flex items-center justify-between">
                <span className="font-semibold">{option.label}</span>
                <button
                  onClick={() => handleScheduleChange(option.id)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none
                    ${selectedSchedule === option.id ? "bg-[#000080]" : "bg-gray-200"}`}
                >
                  <span
                    className={`inline-block h-[19px] w-[19px] transform rounded-full bg-white transition-transform
                      ${selectedSchedule === option.id ? "translate-x-6" : "translate-x-1"}`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={handleSave}
          className="w-full bg-primary-background text-white p-3 rounded-lg hover:bg-primary-background/90 transition-colors"
        >
          Save Changes
        </button>
      </div>
    </div>
  )

  const DisplayView = () => (
    <div className="bg-white rounded-2xl border-2 relative">
      <div className="p-6 flex items-center justify-between">
        <div className="text-xl font-semibold">Payment Preferences</div>
        <div className="h-5 w-5 text-gray-500">
          <button
            onClick={() => setEditOpen(true)}
            className="absolute top-3 right-3 p-2 hover:bg-gray-100 rounded-full"
          >
            <EditWriteIcon />
          </button>
        </div>
      </div>
      <div className="p-6">
        <div>
          <div className="text-sm text-gray-500 mb-4">Payment Schedule</div>
          <div className="space-y-4">
            {scheduleOptions.map((option) => (
              <div key={option.id} className="flex items-center justify-between">
                <span className="font-semibold">{option.label}</span>
                <div
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                    ${selectedSchedule === option.id ? "bg-[#000080]" : "bg-gray-200"}`}
                >
                  <span
                    className={`inline-block h-[19px] w-[19px] transform rounded-full bg-white transition-transform
                      ${selectedSchedule === option.id ? "translate-x-6" : "translate-x-1"}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  return <div className="max-w-[500px] m-auto">
    {editOpen ? <EditForm /> : <DisplayView />}
  </div>
}

export default PaymentPreferences

