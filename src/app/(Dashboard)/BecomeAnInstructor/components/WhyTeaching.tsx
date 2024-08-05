import React from 'react';
import Image from 'next/image';

export default function WhyTeaching() {
  return (
    <div className='flex flex-row justify-center gap-5 py-10'>
      <div className='relative w-[40rem] h-auto'>
        <Image src='/BecomeAnInstructor/binstructor2.png' alt='Why Teaching' layout='fill' objectFit='contain' />
      </div>
      <div className='flex flex-col gap-3 w-[25rem]'>
        <h1 className='text-3xl font-semibold'>Why you’ll start teaching on Eduguard</h1>
        <div className='text-sm text-gray-500'>
          Praesent congue ornare nibh sed ullamcorper. Proin venenatis tellus non turpis scelerisque, vitae auctor arcu ornare. Cras vitae nulla a purus mollis venenatis.
        </div>
        <div className='flex flex-row items-start gap-2'>
          <div className='relative w-[2rem] h-[1.5rem] flex-shrink-0'>
            <Image src='/BecomeAnInstructor/CheckCircle.png' layout='fill' objectFit='contain' alt="" />
          </div>
          <div className='flex flex-col gap-2'>
            <div className='text-lg font-semibold'>Teach your students as you want.</div>
            <div className='text-xs text-gray-500'>Morbi quis lorem non orci fermentum euismod. Nam sapien tellus, aliquam nec porttitor vel, pellentesque at metus.</div>
          </div>
        </div>
        <div className='flex flex-row items-start gap-2'>
          <div className='relative w-[2rem] h-[1.5rem] flex-shrink-0'>
            <Image alt=""src='/BecomeAnInstructor/CheckCircle.png' layout='fill' objectFit='contain' />
          </div>
          <div className='flex flex-col gap-2'>
            <div className='text-lg font-semibold'>Manage your course, payment in one place</div>
            <div className='text-xs text-gray-500'>Sed et mattis urna. Sed tempus fermentum est, eu lobortis nibh consequat eu. Nullam vel libero pharetra, euismod turpis et, elementum enim.</div>
          </div>
        </div>
        <div className='flex flex-row items-start gap-2'>
          <div className='relative w-[2rem] h-[1.5rem] flex-shrink-0'>
            <Image alt='' src='/BecomeAnInstructor/CheckCircle.png' layout='fill' objectFit='contain' />
          </div>
          <div className='flex flex-col gap-2'>
            <div className='text-lg font-semibold'>Chat with your students</div>
            <div className='text-xs text-gray-500'>Nullam mattis lectus ac diam egestas posuere. Praesent auctor massa orci, ut fermentum eros dictum id. </div>
          </div>
        </div>
      </div>
    </div>
  );
}
