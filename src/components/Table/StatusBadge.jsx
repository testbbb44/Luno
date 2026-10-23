const statusColors = {
  Paid: "bg-[#C9F3BE] text-[#256C14] border border-[#256C14]",
  Pending: "bg-[#F3F1BE] text-[#817E18] border border-[#817E18]",
  Failed: "bg-[#F3C8BE] text-[#812B18] border border-[#812B18]",
  Overdue: "bg-[#F3C8BE] text-[#812B18] border border-[#812B18]",
  Partially: "bg-[#EADDFF] text-[#4F378A] border border-[#4F378A]",
};

export function StatusBadge({ status }) {
  return (
    <span
      className={`px-2 m-auto py-1 rounded-full text-xs font-medium ${statusColors[status]}`}
    >
      {status}
    </span>
  );
}
