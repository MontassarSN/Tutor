import React from 'react';
import { useUsers } from '@/queries/useUsers';
import { useInstructors } from '@/queries/useInstructors';
import Image from 'next/image';

export default function SiteInfo() {
  const { data: users, isLoading: isUsersLoading, isError: isUsersError } = useUsers();
  const { data: instructors, isLoading: isInstructorsLoading, isError: isInstructorsError } = useInstructors();

  if (isUsersLoading || isInstructorsLoading) return <div>Loading...</div>;
  if (isUsersError) return <div>Error loading users data</div>;
  if (isInstructorsError) return <div>Error loading instructors data</div>;

  const usersCount = users ? users.length : 0;
  const instructorsCount = instructors && instructors.data ? instructors.data.length : 0;

  return (
    <div className='flex flex-row justify-between px-[20rem] bg-customBg py-5'>
        <div className='flex flex-row gap-2 items-start'>
            <div className='relative w-[2rem] h-[2rem]'>
                <Image src="/BecomeAnInstructor/Users.png" fill alt='aa'/>
            </div>
            <div className='flex flex-col gap-1 '>
                <div className='text-xl font-bold'>{usersCount}</div>
                <div className='text-xs text-gray-500'>students</div>
            </div>
        </div>
        <div className='flex flex-row gap-2 items-start'>
            <div className='relative w-[2rem] h-[2rem]'>
                <Image src="/BecomeAnInstructor/Notebook.png" fill alt='aa' />
            </div>
            <div className='flex flex-col gap-1 '>
                <div className='text-xl font-bold'>{instructorsCount}</div>
                <div className='text-xs text-gray-500'>Certified Instructor</div>
            </div>
        </div>
        <div className='flex flex-row gap-2 items-start'>
            <div className='relative w-[2rem] h-[2rem]'>
                <Image src="/BecomeAnInstructor/GlobeHemisphereWest.png" fill alt='aa' />
            </div>
            <div className='flex flex-col gap-1 '>
                <div className='text-xl font-bold'>72</div>
                <div className='text-xs text-gray-500'>Country Language</div>
            </div>
        </div>
        <div className='flex flex-row gap-2 items-start'>
            <div className='relative w-[2rem] h-[2rem]'>
                <Image src="/BecomeAnInstructor/CircleWavyCheck.png" fill  alt='aa'/>
            </div>
            <div className='flex flex-col gap-1 '>
                <div className='text-xl font-bold'>99.9%</div>
                <div className='text-xs text-gray-500'>Success Rate</div>
            </div>
        </div>
        <div className='flex flex-row gap-2 items-start'>
            <div className='relative w-[2rem] h-[2rem]'>
                <Image src="/BecomeAnInstructor/Stack.png" fill alt='aa'/>
            </div>
            <div className='flex flex-col gap-1 '>
                <div className='text-xl font-bold'>57</div>
                <div className='text-xs text-gray-500'>Trusted Companies</div>
            </div>
        </div>
    </div>
  );
}
