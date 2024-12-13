"use client";
import { useToast } from "@/components/ui/use-toast";
import { Tables } from "@/types/database.types";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";

interface PicVidUploadProps {
  setThumbnail: React.Dispatch<React.SetStateAction<string | ArrayBuffer | null>>;
  setVideo: React.Dispatch<React.SetStateAction<string | ArrayBuffer | null>>;
  thumbnail: string | ArrayBuffer | null;
  video: string | ArrayBuffer | null;
}

export default function PicVidUpload({  setThumbnail, setVideo, thumbnail, video }: PicVidUploadProps) {
  const { toast } = useToast();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoFrame, setVideoFrame] = useState<string | null>(null);

  useEffect(() => {
    if (video && videoRef.current) {
      videoRef.current.src = video as string;
      
      videoRef.current.onloadedmetadata = () => {
        if (videoRef.current) {
          videoRef.current.currentTime = 1;
        }
      };
  
      videoRef.current.onseeked = () => {
        if (videoRef.current) {
          const canvas = document.createElement("canvas");
          canvas.width = videoRef.current.videoWidth;
          canvas.height = videoRef.current.videoHeight;
          
          const ctx = canvas.getContext("2d");
          if (ctx) {
            ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
            const generatedFrame = canvas.toDataURL("image/png");
            setVideoFrame(generatedFrame);
          }
        }
      };
    }
  }, [video]);
  
  const handleThumbnailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setThumbnail(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVideoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileType = file.type;
      const fileSizeMB = file.size / (1024 * 1024);

      if (fileType !== "video/mp4") {
        toast({
          variant: "destructive",
          title: "Trailer Upload Error",
          description: "Only MP4 files are supported.",
        });
        return;
      }

      if (fileSizeMB > 114) {
        toast({
          variant: "destructive",
          title: "Trailer Upload Error",
          description: "File size must be less than 114 MB.",
        });
        return;
      }

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
        <div className="text-sm font-semibold text-gray-900">Course Thumbnail</div>
        <div className="flex items-start justify-between gap-3">
          {thumbnail ? (
            <Image
              src={thumbnail as string}
              width={400}
              height={400}
              alt="Course Thumbnail"
              className="w-[10rem] h-[10rem] min-h-[10rem] min-w-[10rem] max-h-[10rem] max-w-[10rem] shadow-lg"
            />
          ) : (
            <div className="bg-gray-50 py-5 px-8">
              <Image src="/AddCourse/Image.png" width={200} height={200} alt="Placeholder Thumbnail" />
            </div>
          )}
          <div className="flex flex-col gap-3">
            <div className="text-xs">
              Upload your course thumbnail here. Important guidelines: 1200x800 pixels or 12:8 ratio. Supported formats: .jpg, .jpeg, or .png.
            </div>
            <label className="bg-customBg text-customText hover:text-texthover2 hover:bg-hoverbutton2 font-semibold py-2 px-4 flex items-center text-sm cursor-pointer w-[10rem] justify-center gap-2">
              Upload image
              <Image src="/AddCourse/UploadSimple.png" width={20} height={20} alt="Upload Icon" />
              <input type="file" name="filepicture" className="hidden" onChange={handleThumbnailChange} />
            </label>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 w-[25rem]">
        <div className="text-sm font-semibold text-gray-900">Course Trailer</div>
        <div className="flex items-start justify-between gap-3">
          {videoFrame ? (
            <Image
              src={videoFrame}
              width={400}
              height={400}
              alt="Trailer Frame"
              className="w-[10rem] h-[10rem] min-h-[10rem] min-w-[10rem] max-h-[10rem] max-w-[10rem] shadow-lg "
            />
          ) : (
            <div className="bg-gray-50 py-5 px-8">
              <Image src="/AddCourse/PlayCircle2.png" width={200} height={200} alt="Placeholder Trailer" />
            </div>
          )}
          <div className="flex flex-col gap-3">
            <div className="text-xs">
              Upload your course trailer here. Important guidelines: 1200x800 pixels or 12:8 ratio. Supported formats: .mp4.
            </div>
            <label className="bg-customBg text-customText hover:text-texthover2 hover:bg-hoverbutton2 font-semibold py-2 px-4 flex items-center text-sm cursor-pointer w-[10rem] justify-center gap-2">
              Upload video
              <Image src="/AddCourse/UploadSimple.png" width={20} height={20} alt="Upload Icon" />
              <input type="file" name="filevid" className="hidden" onChange={handleVideoChange} />
            </label>
            <video ref={videoRef} crossOrigin="anonymous" className="hidden" />
            </div>
        </div>
      </div>
    </div>
  );
}
