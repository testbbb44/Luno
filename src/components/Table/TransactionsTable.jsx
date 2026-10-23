import { useState } from "react";
import { Search } from "lucide-react";
import { StatusBadge } from "./status-badge";
import { ActionMenu } from "./action-menu";
import { ReminderModal } from "./reminder-modal";

const transactions = [
  {
    id: "#8BD5G9",
    sender: "Mustapha Norman",
    recipient: "Kolawole Adedayo",
    amount: "N400,000",
    paymentMethod: "Bank Transfer",
    date: "11/02/2025",
    status: "Paid",
  },
  // Add more transactions as needed
];

export function TransactionsTable({ title = "Recent Transactions", filterable }) {
  const [isReminderModalOpen, setIsReminderModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const handleSendReminder = (transaction) => {
    setSelectedTransaction(transaction);
    setIsReminderModalOpen(true);
  };

  const handleReminderSubmit = (email) => {
    console.log(
      "Sending reminder to:",
      email,
      "for transaction:",
      selectedTransaction
    );
    // Add your reminder sending logic here
  };

  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-medium">{title}</h2>
          <select className="text-sm bg-transparent border-0">
            <option>This Month</option>
            <option>Last Month</option>
          </select>
        </div>

        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                d="M3 4h18M3 12h18M3 20h18"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left pb-4 font-medium">Transaction ID</th>
                <th className="text-left pb-4 font-medium">Sender</th>
                <th className="text-left pb-4 font-medium">Recipient</th>
                <th className="text-left pb-4 font-medium">Amount</th>
                <th className="text-left pb-4 font-medium">Payment Method</th>
                <th className="text-left pb-4 font-medium">Date</th>
                <th className="text-left pb-4 font-medium">Status</th>
                <th className="text-left pb-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="border-b last:border-b-0">
                  <td className="py-4">{transaction.id}</td>
                  <td className="py-4">{transaction.sender}</td>
                  <td className="py-4">{transaction.recipient}</td>
                  <td className="py-4">{transaction.amount}</td>
                  <td className="py-4">{transaction.paymentMethod}</td>
                  <td className="py-4">{transaction.date}</td>
                  <td className="py-4">
                    <StatusBadge status={transaction.status} />
                  </td>
                  <td className="py-4">
                    <ActionMenu
                      onSendReminder={() => handleSendReminder(transaction)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between mt-6">
          <p className="text-sm text-gray-500">
            Showing 10 items out of 150 entries found
          </p>
          <div className="flex gap-2">
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <svg
                className="w-5 h-5"
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
            {[1, 2, 3, 4, 5].map((page) => (
              <button
                key={page}
                className={`w-8 h-8 rounded-lg ${
                  page === 1 ? "bg-indigo-600 text-white" : "hover:bg-gray-100"
                }`}
              >
                {page}
              </button>
            ))}
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path d="M9 18l6-6-6-6" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <ReminderModal
        isOpen={isReminderModalOpen}
        onClose={() => setIsReminderModalOpen(false)}
        onSubmit={handleReminderSubmit}
      />
    </div>
  );
}
