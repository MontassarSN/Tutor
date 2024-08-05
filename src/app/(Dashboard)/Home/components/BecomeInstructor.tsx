import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const BecomeInstructor: React.FC = () => {
  return (
    <div className="flex flex-row mt-10 w-3/4 items- m-auto justify-center gap-10 p-10 items-center">
      <div className='w-[41%] flex flex-row justify-center gap-6 bg-customText  px-5 '>
        <div className='flex flex-col gap-4 center py-5'>
          <h1 className='text-xl text-white font-bold'>Become an instructor</h1>
          <div className='text-xs text-white'> 
          Instructors from around the world teach millions of students on Udemy. We provide the tools and skills to teach what you love.
          </div>
          <Link href="/BecomeAnInstructor">
          <button className="text-customText bg-white text-sm py-2 px-2  font-semibold">
                            <div className='flex flex-row justify-center gap-2 w-[8rem]'>
                                <div>Start teaching</div>
                                <img src="/ArrowRightOrange.png" alt="Arrow Right" className="h-[20px] w-[20px]" />
                            </div>
          </button>
          </Link>
        </div>
        <div className='relative w-[35rem] h-[10rem] mt-auto'>
        <Image src="/BecomeAnInstructor.png" alt="Become Instructor"fill className='mt-auto'/>
        </div>
      </div>
      <div className="flex flex-col bg-white w-[49%] items-center justify-center p-4 shadow-lg rounded-lg">
        <h1 className="text-3xl font-semibold mb-6 text-center">Your teaching & earning steps</h1>
        <div className="gap-3 items-center grid-cols-2 grid-rows-2 grid" >
          <div className='flex flex-row items-center gap-1'>
            <div className="bg-purple-100 text-purple-500 px-4 py-2 rounded-[50%]">1</div>
            <div className="text-sm text-black">Apply to become instructor</div>
          </div>
          <div className='flex flex-row items-center gap-1'>
            <div className="bg-orange-100 text-orange-500 px-4 py-2 rounded-[50%]">2</div>
            <div className="text-sm text-black">Build & edit your profile</div>
          </div>
          <div className='flex flex-row items-center gap-1'>
            <div className="bg-pink-100 text-pink-500 px-4 py-2 rounded-[50%]">3</div>
            <div className="text-sm text-black">Create your new course</div>
          </div>
          <div className='flex flex-row items-center gap-1'>   
            <div className="bg-green-100 text-green-500 px-4 py-2 rounded-[50%]">4</div>
            <div className="text-sm text-black">Start teaching & earning</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BecomeInstructor;
