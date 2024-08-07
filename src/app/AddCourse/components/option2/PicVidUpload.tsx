"use client";
import { Tables } from "@/types/database.types";
import Image from "next/image";
import React, { useState, useEffect } from "react";

interface PicVidUploadProps {
  data: Tables<"courses"> | undefined | null;
}

export default function PicVidUpload({ data }: PicVidUploadProps) {
  const [pic, setPic] = useState<string | ArrayBuffer | null>(data?.pic || null);
  const [video, setVideo] = useState<string | ArrayBuffer | null>(data?.trailer || null);

  useEffect(() => {
    if (data) {
      setPic(data.pic || null);
      setVideo(data.trailer || null);
    }
  }, [data]);

  const handlePicChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVideoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setVideo(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex justify-between w-[60rem]">
      <div className="flex flex-col gap-3 w-[25rem]">
        <div className="text-sm font-semibold text-gray-900">
          Course Thumbnail
        </div>
        <div className="flex items-start justify-between gap-3">
          {pic ? (
            <Image
              src={pic as string}
              width={400}
              height={400}
              alt="Course Thumbnail"
              className="w-[20rem]"
            />
          ) : (
            <div className="bg-gray-50 py-5 px-8">
              <Image
                src="/AddCourse/Image.png"
                width={200}
                height={200}
                alt="Placeholder Thumbnail"
              />
            </div>
          )}
          <div className="flex flex-col gap-3">
            <div className="text-xs">
              Upload your course Thumbnail here. Important guidelines: 1200x800
              pixels or 12:8 Ratio. Supported format: .jpg, .jpeg, or .png
            </div>
            <label className="bg-customBg text-customText font-semibold py-2 px-4 flex items-center flex-row text-sm cursor-pointer w-[10rem] justify-center gap-2">
              Upload image
              <Image
                src="/AddCourse/UploadSimple.png"
                width={20}
                height={20}
                alt="Upload Icon"
              />
              <input type="file" name="filepicture" className="hidden" onChange={handlePicChange} />
            </label>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 w-[25rem]">
        <div className="text-sm font-semibold text-gray-900">
          Course Trailer
        </div>
        <div className="flex items-start justify-between gap-3">
          {video ? (
            <Image
              src={video as string}
              width={400}
              height={400}
              alt="Course Trailer"
              className="w-[20rem] min-w-[20rem]"
            />
          ) : (
            <div className="bg-gray-50 py-5 px-8">
              <Image
                src="/AddCourse/PlayCircle2.png"
                width={200}
                height={200}
                alt="Placeholder Trailer"
              />
            </div>
          )}
          <div className="flex flex-col gap-3">
            <div className="text-xs">
              Upload your course trailer here. Important guidelines: 1200x800
              pixels or 12:8 Ratio. Supported format: .mp4, .mov, or .avi
            </div>
            <label className="bg-customBg text-customText font-semibold py-2 px-4 flex items-center flex-row text-sm cursor-pointer w-[10rem] justify-center gap-2">
              Upload video
              <Image
                src="/AddCourse/UploadSimple.png"
                width={20}
                height={20}
                alt="Upload Icon"
              />
              <input type="file" name="filevid" className="hidden" onChange={handleVideoChange} />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
