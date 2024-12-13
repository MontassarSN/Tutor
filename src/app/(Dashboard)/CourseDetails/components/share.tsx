import Image from 'next/image';
import React from 'react'

export default function Share() {
  return (
    <>
    <div className=" text-sm font-bold px-3 text-gray-900 "> Share This course:</div>
          <div className="px-3 flex flex-row justify-between">
            <button className="bg-gray-100 px-3 py-2" onClick={() => {
                const courseLink = window.location.href; 
                navigator.clipboard.writeText(courseLink);
              }}>
              <div className="flex justify-center gap-2 ">
                <Image
                  src="/course_details/Copy.png"
                  alt="Copy"
                  width={20}
                  height={20}
                />
                <div>
                  <div className="text-gray-700 text-xs font-semibold">
                    Copy Link
                  </div>
                </div>

              </div>

            </button>
            <button className="p-2 bg-gray-100 ">
            <Image
                  src="/course_details/facebook.png"
                  alt="Copy"
                  width={18}
                  height={18}
                />

            </button>
            <button className="p-2 bg-gray-100 ">
            <Image
                  src="/course_details/twitter1.png"
                  alt="Copy"
                  width={18}
                  height={18}
                />

            </button>
            <button className="p-2 bg-gray-100 ">
            <Image
                  src="/course_details/Envelope.png"
                  alt="Copy"
                  width={18}
                  height={18}
                />

            </button>
            <button className="p-2 bg-gray-100 ">
            <Image
                  src="/course_details/whatsapp.png"
                  alt="Copy"
                  width={18}
                  height={18}
                />

            </button>

          </div>
    </>
  )
}
