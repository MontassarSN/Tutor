import React, { useState } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function EditLecture({
  handleUpdateLecture,
  Lecturetitle,
  lectureid,
}: {
  handleUpdateLecture: (id: string, column: string, value: any) => void;
  Lecturetitle: string;
  lectureid: string;
}) {
  const [newtitle, setTitle] = useState(Lecturetitle);

  return (
    <div className="my-auto">
      <Dialog>
        <DialogTrigger asChild>
          <Image
            src="/AddCourse/PencilLine.png"
            alt="Plus"
            width={18}
            height={18}
            className="cursor-pointer "
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
            value={newtitle}
            onChange={(e) => setTitle(e.target.value)}
          />
          <DialogFooter>
            <button className="bg-customBg text-customText hover:text-texthover2 hover:bg-hoverbutton2 font-semibold py-2 px-4"
              onClick={() => handleUpdateLecture(lectureid, "title", newtitle)}

            >
              Save Changes
            </button>
            <button className="bg-gray-100 text-gray-600 py-2 px-3">
              Cancel
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
