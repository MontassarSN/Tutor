import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useSectionsContext } from "./context/SectionsContext";

export default function EditSection({
  sectiontitle,
  sectionId,
}: {
  sectiontitle: string;
  sectionId: string;
}) {
  const { newSections, setNewSections } = useSectionsContext();
  const handleUpdateSection = (sectionId: string, newTitle: string) => {
    setNewSections((prevSections) =>
      prevSections.map((section) =>
        section.id === sectionId ? { ...section, title: newTitle } : section
      )
    );
  };
  const [title, setTitle] = useState(sectiontitle);
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Image
            src="/AddCourse/PencilLine.png"
            alt="Plus"
            width={18}
            height={18}
            className="cursor-pointer"
          />
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Section Name</DialogTitle>
          </DialogHeader>
          <input
            type="text"
            placeholder="Section Name"
            className="w-full p-2 border border-gray-300 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <DialogFooter>
            <button
              className="bg-customBg text-customText hover:text-texthover2 hover:bg-hoverbutton2 font-semibold py-2 px-4"
              onClick={() => handleUpdateSection(sectionId, title)}
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
