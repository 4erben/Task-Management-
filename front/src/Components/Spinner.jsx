import React from 'react'

export default function Spinner() {
  return (
    <div className="flex items-center justify-center h-screen mx-auto">
        <div className="animate-spin rounded-full border-4 border-t-4 border-gray-200 border-t-blue-500 w-16 h-16"></div>
    </div>
  )
}
