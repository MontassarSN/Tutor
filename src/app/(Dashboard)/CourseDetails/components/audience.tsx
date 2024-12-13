import Image from 'next/image'
import React from 'react'

export default function Audience({ audience }:{audience: string[] | null | undefined}) {
  return (
    <div className=''>
        <div className="text-xl font-bold text-gray-900 ">Who this course is for:</div>
        <div className='flex flex-col gap-3 mt-4 '>
        {audience && audience.length > 0 ? (
              audience.map((audience) => (
                <div
                  className="flex gap-1 items-center text-sm text-gray-700"
                  key={audience}
                >
                  <Image src="/course_details/ArrowRight.png" alt="Book" width={20} height={20} />
                  {audience}
                </div>
              ))
            ) : (
              <div className="text-xs text-gray-500">No audience available</div>
            )}
    </div>

    </div>

  )
}
