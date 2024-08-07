import { Tables } from '@/types/database.types'
import Image from 'next/image';
import React from 'react'
import EditLecture from './editLecture';

interface LectureListProps {
  lectures: Tables<"lectures">[];
}

export default function LectureList({ lectures }: LectureListProps) {
  return (
    <div className='flex flex-col gap-2 py-3 px-2'>
      {lectures.map(lecture => (
        <div key={lecture.id} className='flex justify-between items-center p-2 bg-white'>
          <div className='flex items-center gap-2'>
            <Image src="/AddCourse/Menu2.png" alt="Menu" width={18} height={18} /> 
            <span className='font-semibold'>{lecture.title}</span>
          </div>
          <div className='flex gap-2'>
          <EditLecture />
          <Image src="/AddCourse/Trash.png" alt="Trash" width={18} height={18} />   
          </div>
                    
        </div>
      ))}
    </div>
  )
}
