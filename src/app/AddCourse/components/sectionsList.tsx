import { Tables } from '@/types/database.types'
import Image from 'next/image'
import React from 'react'
import AddLecture from './addLecture';
import EditSection from './editSection';
import LectureList from './lectureList';

interface SectionWithLectures extends Tables<"sections"> {
  lectures: Tables<"lectures">[];
}

interface SectionsListProps {
  sections: SectionWithLectures[];
}

export default function SectionsList({ sections }: SectionsListProps) {
  return (
    <div className='flex flex-col gap-3'>
      {sections?.map(section => (
        <div key={section.id}>
          <h2 className='text-lg font-semibold'>{section.title}</h2>
          <div className='flex justify-between items-center'>
            <div className='flex gap-2 items-center'>
              <Image src="/AddCourse/Menu.png" alt="Menu" width={18} height={18} />
              <div className='flex gap-1 items-center font-semibold'>
                Sections <span className='flex'>{section.order}:</span> 
              </div>
              <span>{section.title}</span>
            </div>
            <div className='flex items-center gap-2'>
              <AddLecture />
              <EditSection />
              <Image src="/AddCourse/Trash.png" alt="Trash" width={18} height={18} />              
            </div>
          </div>
          <LectureList lectures={section.lectures} />
        </div>
      ))}
    </div>
  )
}
