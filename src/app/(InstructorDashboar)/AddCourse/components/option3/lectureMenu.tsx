"use client"
import React, { useState } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
import Video from './video';
import Image from 'next/image';
import { Tables } from '@/types/database.types';
import File from './file';
import Caption from './captions';
import Notes from './notes';
import Description from './description';

export default function LectureMenu({lecture}:{lecture : Tables<"lectures">}) {
    const [cart, setCart] = useState<boolean>(false);
  return (

    <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <button
        className="bg-customBg text-customText hover:text-texthover2 hover:bg-hoverbutton2 py-1 px-2"
        onClick={() => setCart(prev => !prev)}
      >
        <div className="flex gap-2 items-center">
          <div>contents</div>
          <Image
            src={cart ? "/CaretDown.png" : "/CaretUp.png"}
            alt="Caret"
            width={15}
            height={15}
          />
        </div>
      </button>
    </DropdownMenuTrigger>
    {cart && (
      <DropdownMenuContent>
        <DropdownMenuItem asChild>
          <Video lectureId={lecture.id} videoUrl={lecture.video_url} />
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
            <File lectureId={lecture.id} Lecturefile={lecture.file} />
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Caption lectureId={lecture.id} initialCaption={lecture.captions} />
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Notes lectureId={lecture.id} initialNotes={lecture.notes} />
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Description lectureId={lecture.id} initialDescription={lecture.description} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    )}
  </DropdownMenu>
  )
}
