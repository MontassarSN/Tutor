import Image from 'next/image'
import React from 'react'

export default function Subjects({ subjects }:{subjects: string[] | null | undefined}) {
  return (
    <div className='bg-green-50 p-5'>
        <div className="text-xl font-bold text-gray-900 ">What you will learn in this course</div>
        <div className='grid grid-cols-2 gap-5 mt-4 '>
        {subjects && subjects.length > 0 ? (
              subjects.map((subject) => (
                <div
                  className="flex gap-1 items-center text-sm text-gray-700"
                  key={subject}
                >
                  <Image src="/course_details/CheckCircle.png" alt="Book" width={20} height={20} />
                  {subject}
                </div>
              ))
            ) : (
              <div className="text-xs text-gray-500">No subjects available</div>
            )}
    </div>

    </div>

  )
}
