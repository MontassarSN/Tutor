"use client";

import { useUser } from '@/queries/useUser';
import Image from 'next/image';
import React from 'react';
import InstructorsInfos from './InstructorsInfos';
import { Tables } from '@/types/database.types';
import { useInstructor } from '@/queries/useInstrcutor';


export default function Instructors({ instructorsIds }: { instructorsIds: string[] }) {
  const instructorsData = instructorsIds?.map((id) => {
    const { data: instructor } = useInstructor(id);
    const { data: user } = useUser(instructor?.user_id);

    return { instructor, user };
  });
  const validInstructors = instructorsData?.filter(
    (data) => data.instructor && data.user
  );

  return (
    <div className='flex flex-col gap-5 w-full'>
        <div className="text-xl font-bold text-gray-900 ">Course instructor ({instructorsIds?.length})</div>
        <ul className='flex flex-col gap-5'>
        {validInstructors?.map((data, index) => (
          <li key={index} className='flex gap-2 items-start p-4 w-full'>
              <Image src={data?.user?.pic || "/noAvatar.png"} alt="Instructor Pic" width={100} height={100} className="rounded-full min-h-[6rem] max-h-[6rem] min-w-[6rem] max-w-[6rem]" />
              <div className='flex flex-col gap-1 w-full'>
                <div className='text-lg font-bold'>{data.user?.username}</div>
                <div className='text-xs text-gray-500'>{data.instructor?.title}</div>
                <InstructorsInfos instructor={data?.instructor as Tables<"instructors">} />
                <div className='text-xs text-gray-500'>{data.instructor?.description}</div>
              </div>

          </li>
        ))}
      </ul>
    </div>
  );
}
