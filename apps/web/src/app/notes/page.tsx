import { tempArr } from '@/lib/constants'
import React from 'react'

const Page = () => {
  return (

    <div className="column-1 md:columns-2 lg:columns-3 xl:columns-4 gap-4 mx-8 mt-3">
      {tempArr.map(item => (
        <div
          key={item}
          className="border border-gray-400 p-4 min-h-16 max-h-[500px] rounded-lg mb-4 break-inside-avoid"
          style={{ height: `${parseFloat(Math.random().toFixed(3)) * 1000}px` }}
        >
          {item}
        </div>
      ))}
    </div>
  )
}

export default Page