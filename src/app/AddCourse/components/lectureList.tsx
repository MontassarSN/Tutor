import { Tables } from '@/types/database.types'
import Image from 'next/image';
import React from 'react'
import EditLecture from './editLecture';

interface LectureListProps {
  lectures: Tables<"lectures">[];
}

export default function LectureList({ lectures }: LectureListProps) {
  return (
    <div>
      {lectures.map(lecture => (
        <div key={lecture.id} className='flex justify-between items-center p-2 border-t'>
          <div className='flex items-center gap-2'>
            <Image src="/AddCourse/Menu2.png" alt="Menu" width={18} height={18} /> 
            <span className='font-semibold'>{lecture.title}</span>
          </div>
          <EditLecture />
          <Image src="/AddCourse/Trash.png" alt="Trash" width={18} height={18} />              
        </div>
      ))}
    </div>
  )
}
