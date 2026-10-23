export default function AvatarGroup({ users, maxAvatars = 3 }) {
    const visibleUsers = users.slice(0, maxAvatars)
    const remainingCount = users.length - maxAvatars
  
    return (
      <div className="flex -space-x-2">
        {visibleUsers.map((user) => (
          <div
            key={user.id}
            className="w-6 h-6 rounded-full border-2 border-white overflow-hidden bg-gray-200"
            title={user.name}
          >
            <img src={user.avatar || "/placeholder.svg"} alt={user.name} className="w-full h-full object-cover" />
          </div>
        ))}
  
        {remainingCount > 0 && (
          <div className="w-6 h-6 rounded-full border-2 border-white bg-gray-300 flex items-center justify-center text-xs text-gray-600">
            +{remainingCount}
          </div>
        )}
      </div>
    )
  }
  