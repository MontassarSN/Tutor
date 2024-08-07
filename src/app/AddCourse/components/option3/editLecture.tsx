import React from 'react'
import Image from 'next/image'
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";

export default function EditLecture() {
  return (
    <div>
    <Dialog>
            <DialogTrigger asChild>
              <Image 
                src="/AddCourse/PencilLine.png" 
                alt="Plus" 
                width={18} 
                height={18} 
                className='cursor-pointer' 
              />
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit Lecture Name</DialogTitle>
              </DialogHeader>
              <input
                type="text"
                placeholder="Lecture Name"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <DialogFooter>
                <button
                  className="bg-customBg text-customText font-semibold py-2 px-4"
                >
                  Save Changes
                </button>
                <button
                  className="bg-gray-100 text-gray-600 py-2 px-3"
                >
                  Cancel
                </button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
</div>
  )
}
