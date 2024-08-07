import { Tables } from '@/types/database.types'
import Image from 'next/image'
import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
export default function AddLecture() {
  return (
    <div>
        <Dialog>
                <DialogTrigger asChild>
                  <Image 
                    src="/AddCourse/Plus.png" 
                    alt="Plus" 
                    width={18} 
                    height={18} 
                    className='cursor-pointer' 
                  />
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Add Lecture</DialogTitle>
                  </DialogHeader>
                  <input
                    type="text"
                    placeholder="Lecture Title"
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none"
                  />
                  <DialogFooter>
                  <div className='flex justify-between w-full'>
                    <button
                      className="bg-gray-100 text-gray-600 py-2 px-3 "
                    >
                      Cancel
                    </button>
                    <button
                      className="bg-customText text-white py-2 px-4 "
                    >
                      Add Section
                    </button>

                    </div>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
    </div>
  )
}
