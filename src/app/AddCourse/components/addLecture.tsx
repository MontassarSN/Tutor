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
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                  <DialogFooter>
                    <button
                      className="bg-blue-500 text-white py-2 px-4 rounded"
                    >
                      Add Lecture
                    </button>
                    <button
                      className="bg-gray-500 text-white py-2 px-4 rounded ml-2"
                    >
                      Cancel
                    </button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
    </div>
  )
}
