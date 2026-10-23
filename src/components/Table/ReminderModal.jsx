import { useState } from "react"
import { X } from "lucide-react"

export function ReminderModal({ isOpen, onClose, onSubmit, clientEmail }) {
  const [email, setEmail] = useState(clientEmail || "")

  if (!isOpen) return null

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} >
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg w-full max-w-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium">Send Reminder</h2>
            {/* <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
              <X className="w-4 h-4" />
            </button> */}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault()
              onSubmit(email)
              setEmail("")
              onClose()
            }}
          >
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-700 mb-1">Client Information</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Client's Email Address"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
             <div className="flex justify-center items-center">
             <button
                type="submit"
                className="w-fit bg-darkBlue m-auto text-white py-2 px-4 rounded-lg hover:bg-indigo-700"
              >
                Send Reminder
              </button>
             </div>
            </div>
          </form>
        </div>
      </div>
      </div>
    </>
  )
}

