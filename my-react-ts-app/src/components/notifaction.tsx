type NotificationProps = {
  message: string | null
}

export default function Notification({ message }: NotificationProps) {
  if (!message) {
    return null
  }

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed right-4 top-4 z-50 rounded bg-green-700 px-4 py-3 text-white shadow-lg"
    >
      {message}
    </div>
  )
}
