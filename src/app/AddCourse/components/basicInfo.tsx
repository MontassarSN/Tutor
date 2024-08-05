import React from 'react'
import BasicInfoForm from './basicInfoForm'


 
export default function BasicInfo() {
  return (
    <div className='py-5 px-10 flex flex-col gap-5 w-[60rem]'>
        <div className='flex justify-between w-full'>
            <div className='text-2xl font-bold'>Basic Information</div>
            <div className='flex gap-2' > 
                <button className="bg-customBg text-customText font-semibold py-2 px-4">
                  Save
                </button>
                <button className=" text-customText font-semibold py-2 px-4">
                  Save Preview
                </button>
            </div>
        </div>
        <BasicInfoForm />
    </div>
  )
}
