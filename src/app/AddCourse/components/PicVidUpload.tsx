import { Tables } from '@/types/database.types';
import Image from 'next/image';
import React from 'react';

// Define the prop types
interface PicVidUploadProps {
  data: Tables<'courses'>;
}

export default function PicVidUpload({ data }: PicVidUploadProps) {
  return (
    <div className="flex justify-between w-[60rem] ">
      <div className='flex flex-col gap-3 w-[25rem]'>
        <div className="text-sm font-semibold text-gray-900">Course Thumbnail</div>
        <div className='flex items-start justify-between gap-3'>
          {data?.pic ? (
            <Image src={data.pic} width={400} height={400} alt='Course Thumbnail' className='w-[20rem]' />
          ) : (
            <div className='bg-gray-50 py-5 px-8'>
              <Image src="/AddCourse/Image.png" width={200} height={200} alt='Placeholder Thumbnail' />
            </div>
          )}
          <div className='flex flex-col gap-3'>
            <div className='text-xs'>
              Upload your course Thumbnail here. Important guidelines: 1200x800 pixels or 12:8 Ratio. Supported format: .jpg, .jpeg, or .png
            </div>
            <label className='bg-customBg text-customText font-semibold py-2 px-4 flex items-center flex-row text-sm cursor-pointer w-[10rem] justify-center gap-2'>
              Upload image 
              <Image src="/AddCourse/UploadSimple.png" width={20} height={20} alt='Upload Icon' />
              <input type="file" name="filepicture" className="hidden" />
            </label>
          </div>
        </div>
      </div>

      <div className='flex flex-col gap-3 w-[25rem]'>
        <div className="text-sm font-semibold text-gray-900">Course Trailer</div>
        <div className='flex items-start justify-between gap-3'>
          {data?.trailer ? (
            <Image src={data.trailer} width={400} height={400} alt='Course Trailer' className='w-[20rem] min-w-[20rem] ' />
          ) : (
            <div className='bg-gray-50 py-5 px-8'>
              <Image src="/AddCourse/PlayCircle2.png" width={200} height={200} alt='Placeholder Trailer' />
            </div>
          )}
          <div className='flex flex-col gap-3'>
            <div className='text-xs'>
              Upload your course trailer here. Important guidelines: 1200x800 pixels or 12:8 Ratio. Supported format: .mp4, .mov, or .avi
            </div>
            <label className='bg-customBg text-customText font-semibold py-2 px-4 flex items-center flex-row text-sm cursor-pointer w-[10rem] justify-center gap-2'>
              Upload video 
              <Image src="/AddCourse/UploadSimple.png" width={20} height={20} alt='Upload Icon' />
              <input type="file" name="filevid" className="hidden" />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
