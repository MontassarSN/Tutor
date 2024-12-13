import Image from 'next/image'
import React from 'react'

export default function Includes() {
  return (
    <>
              <div className=" text-sm font-bold px-3  text-gray-900"> This course includes:</div>
          <div className="flex flex-col gap-2 px-3">
                <div className="flex items-center gap-3 text-gray-700 text-xs">
                    <Image src="/course_details/1.png" width={20} height={20} alt="Clock" />
                    <div>Lifetime access</div>
                    
                </div>
                <div className="flex items-center gap-3 text-gray-700 text-xs">
                    <Image src="/course_details/2.png" width={20} height={20} alt="Clock" />
                    <div>30-days money-back guarantee</div> 
                </div>

                <div className="flex items-center gap-3 text-gray-700 text-xs">
                    <Image src="/course_details/3.png" width={20} height={20} alt="Clock" />
                    <div>Free exercises file & downloadable resources</div>
                </div>

                <div className="flex items-center gap-3 text-gray-700 text-xs">
                    <Image src="/course_details/4.png" width={20} height={20} alt="Clock" />
                    <div>Shareable certificate of completion</div>
                    
                </div>
                <div className="flex items-center gap-3 text-gray-700 text-xs">
                    <Image src="/course_details/5.png" width={20} height={20} alt="Clock" />
                    <div>Access on mobile , tablet and TV</div>
                    
                </div>
                <div className="flex items-center gap-3 text-gray-700 text-xs">
                    <Image src="/course_details/6.png" width={20} height={20} alt="Clock" />
                    <div>English subtitles</div>
                    
                </div>
                <div className="flex items-center gap-3 text-gray-700 text-xs">
                    <Image src="/course_details/7.png" width={20} height={20} alt="Clock" />
                    <div>100% online course</div>
                    
                </div>
          
          </div>        
    </>
  )
}
