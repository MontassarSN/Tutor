import React from 'react';
import Form from './components/Form';
import SmallNav from '../../components/SmallNav';
import Link from 'next/link';
import Image from 'next/image';


export default function Page()  {
  return (
    <div className="flex flex-col bg-white text-gray-900">
      <SmallNav>
        <div className='flex flex-row items-center gap-3'>
          <div>Already have an Account?</div>
          <Link href="/SignIn"><button className="bg-customBg text-customText py-2 px-4">Sign in</button></Link>
        </div>
      </SmallNav>
      <div className='flex flex-row '>
        <div className='w-[45%] bg-purple-100 flex justify-center items-center'>
          <Image src="/saly.png" alt="saly" className="w-full h-auto" width={180} height={180}/>
        </div>
        <div className="p-24 w-[55%]">
            <div className="w-[80%]">
            <Form />
            </div>
        </div>
      </div>
    </div>
  );
}

