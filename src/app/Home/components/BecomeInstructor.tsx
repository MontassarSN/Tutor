import React from 'react';
import Image from 'next/image';

const BecomeInstructor: React.FC = () => {
  return (
    <div className="flex flex-row mt-10 w-3/4 items-center m-auto justify-between p-10">
      <div className='w-[49%]'>
        <Image src="/BecomeAnInstructor.png" alt="Become Instructor" width={500} height={500} className="w-full h-auto object-cover" />
      </div>
      <div className="flex flex-col bg-white w-[49%] items-center justify-center p-4 shadow-lg rounded-lg">
        <h1 className="text-3xl font-semibold mb-6 text-center">Your teaching & earning steps</h1>
        <div className="flex flex-row gap-3 items-center justify-start">
          <div className="bg-purple-100 text-purple-500 px-4 py-2 rounded-[50%]">1</div>
          <div className="text-sm text-black">Apply to become instructor</div>
          <div className="bg-orange-100 text-orange-500 px-4 py-2 rounded-[50%]">2</div>
          <div className="text-sm text-black">Build & edit your profile</div>
        </div>
        <div className="flex flex-row gap-3 items-center justify-start">
          <div className="bg-pink-100 text-pink-500 px-4 py-2 rounded-[50%]">3</div>
          <div className="text-sm text-black">Create your new course</div>
          <div className="bg-green-100 text-green-500 px-4 py-2 rounded-[50%]">4</div>
          <div className="text-sm text-black">Start teaching & earning</div>
        </div>
      </div>
    </div>
  );
}

export default BecomeInstructor;
