import React from 'react'

const NotesCard = ({ item, className }: { item: any, className: string | undefined }) => {

  return (

    <div
      className="border border-gray-400 p-4 min-h-16 max-h-[500px] rounded-lg mb-4 break-inside-avoid"
      style={{ height: `${parseFloat(Math.random().toFixed(3)) * 1000}px` }}
    >
      <div className={className}>
        {item}
      </div>
    </div>

  )
}

export default NotesCard