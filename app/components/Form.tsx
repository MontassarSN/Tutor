import React from 'react';

const Form: React.FC = () => {
  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-4xl font-bold align-middle py-10">Create your account</h1>
      <div className="text-sm font-semibold text-gray-900">Full Name</div>
      <div className="flex flex-row justify-between">
        <input className=" border-gray-100 border-[1px] px-4 py-2 w-[45%] tx-lg text-gray-500" type="text" placeholder="First Name..." />
        <input className=" border-gray-100 border-[1px] px-4 py-2 w-[45%]" type="text" placeholder="Last Name" />
      </div>
      <div className="text-sm font-semibold text-gray-900">Username</div>
      <div>
        <input className=" border-gray-100 border-[1px] px-4 py-2 w-full" type="text" placeholder="Username" />
      </div>
      <div className="text-sm font-semibold text-gray-900">Email</div>
      <div>
        <input className=" border-gray-100 border-[1px] px-4 py-2 w-full" type="email" placeholder="Email Address" />
      </div>
      <div className="flex flex-row justify-between">
        <div className="text-sm font-semibold text-gray-900 w-[45%]">Password</div>
        <div className="text-sm font-semibold text-gray-900 w-[45%]">Confirm Password</div>
      </div>
      <div className="flex flex-row justify-between">
        <input className=" border-gray-100 border-[1px] px-4 py-2 w-[45%] tx-lg text-gray-500" type="password" placeholder="Create Password" />
        <input className=" border-gray-100 border-[1px] px-4 py-2 w-[45%] tx-lg text-gray-500" type="password" placeholder="Confirm Password" />
      </div>
      <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row gap-1">
                <input type="checkbox" />
                <span className='text-sm text-gray-500'>I agree to the E-Tutor <span className='text-blue-800'>Terms and Conditions</span></span>
            </div>
            <button className="bg-customText text-white text-sm py-2 px-2 " type="submit">
                <div className='flex flex-row gap-2'>
                    <div>Create Account</div>
                    <img src="/ArrowRight.png" alt="Arrow Right" className="h-[20px] w-[20px]" />
                </div>
            </button>
      </div>
    </div>
  );
}

export default Form;
