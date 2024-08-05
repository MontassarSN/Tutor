import React from 'react'
import Image from 'next/image'

export default function FooterDown() {
  return (
    <div className="flex flex-row w-3/4 m-auto py-20 justify-between px-10  ">
    <div className='flex flex-col gap-3 w-1/4'>
        <div className='flex fles-row items-center gap-1'>
            <Image src='/socials/GraduationCap.png' alt="Graduation Cap" width={32} height={32} />
            <h1 className="text-2xl font-bold text-white">E-Tutor</h1>
        </div>
        <div className=" text-xs  text-gray-500 m-auto">
            Aliquam rhoncus ligula est, non pulvinar elit convallis nec. Donec mattis odio at.
        </div>
        <div className='flex flex-row gap-2 items-center'>
            <Image src='/socials/s1.png' alt="Social" width={32} height={32} />
            <Image src='/socials/s2.png' alt="Social" width={32} height={32} />
            <Image src='/socials/s3.png' alt="Social" width={64} height={32} />
            <Image src='/socials/s4.png' alt="Social" width={32} height={32} />
            <Image src='/socials/s5.png' alt="Social" width={32} height={32} />
        </div>
    </div>
    <div className='flex flex-col gap-2 w-1/6'>
        <div className='text-sm py-2'>Top 4 Category</div>
        <ul className='flex flex-col gap-4'>
            <li className='text-xs text-gray-500'>Development</li>
            <li className='text-xs text-gray-500'>Finance & Accounting</li>
            <li className='text-xs text-gray-500'>Design</li>
            <li className='text-xs text-gray-500'>Business</li>
        </ul>
    </div>
    <div className='flex flex-col gap-2 w-1/6'>
        <div className='text-sm py-2'>Quick Links</div>
        <ul className='flex flex-col gap-4'>
            <li className='text-xs text-gray-500'>About</li>
            <li className='text-xs text-gray-500'>Become Instructor</li>
            <li className='text-xs text-gray-500'>Contact</li>
            <li className='text-xs text-gray-500'>Career</li>
        </ul>
    </div>
    <div className='flex flex-col gap-2 w-1/6'>
        <div className='text-sm py-2'>Support</div>
        <ul className='flex flex-col gap-4'>         
            <li className='text-xs text-gray-500'>Help Center</li>
            <li className='text-xs text-gray-500'>FAQs</li>
            <li className='text-xs text-gray-500'>Terms & Condition</li>
            <li className='text-xs text-gray-500'>Privacy Policy</li>
        </ul>
    </div>
    <div className='flex flex-col gap-2 w-1/6'>
        <div className='text-sm py-2 text-center'>Download our app</div>
        <div className='flex flex-col gap-3'>
            <div className='flex flex-row gap-2 items-center bg-gray-700 m-auto py-1 px-2'>
                <Image src='/socials/apl.png' alt="App Store" width={32} height={32} />
                <div className='flex flex-col '>
                    <div className='text-xs text-gray-500'>Download now</div>
                    <h1 className='text-lg text-white'>App Store</h1>
                </div>
            </div>
            <div className='flex flex-row gap-2 items-center bg-gray-700 m-auto py-1 px-2'>
                <Image src='/socials/gp.png' alt="App Store" width={32} height={32} />
                <div className='flex flex-col '>
                    <div className='text-xs text-gray-500'>Download now</div>
                    <h1 className='text-lg text-white'>Play Store</h1>
                </div>
            </div>
        </div>
    </div>
</div>
  )
}
