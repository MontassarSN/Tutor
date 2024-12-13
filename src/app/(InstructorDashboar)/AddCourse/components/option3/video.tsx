"use client";
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { useLecturesContext } from "./context/LecturesContext";
import { uploadFiles } from "@/hooks/useFileUpload";

interface VideoProps {
  lectureId: string;
  videoUrl: string | null;
}

export default function Video({ lectureId, videoUrl }: VideoProps) {
  const { setNewLectures } = useLecturesContext();
  const [videoFrame, setVideoFrame] = useState<string | null>(null);
  const [videoDuration, setVideoDuration] = useState<string | null>(null);
  const [videoName, setVideoName] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  useEffect(() => {
    if (videoUrl) {
      generateVideoFrame(videoUrl);
    }
  }, [videoUrl]);

  const generateVideoFrame = (url: string) => {
    const videoElement = document.createElement("video");
    videoElement.crossOrigin = "anonymous";
    videoElement.src = url;

    videoElement.onloadedmetadata = () => {
      videoElement.currentTime = 1;
      setVideoDuration(formatDuration(videoElement.duration));
      setVideoName(url.split("/").pop() || "Unknown");
    };

    videoElement.onseeked = () => {
      const canvas = document.createElement("canvas");
      canvas.width = videoElement.videoWidth;
      canvas.height = videoElement.videoHeight;
      const ctx = canvas.getContext("2d");
      ctx?.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
      try {
        const generatedFrame = canvas.toDataURL("image/png");
        setVideoFrame(generatedFrame);
      } catch (error) {
        console.error("Failed to generate video frame:", error);
      }
    };
  };

  const formatDuration = (duration: number) => {
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleCancel = () => {
    setNewLectures((prevLectures) =>
      prevLectures.map((lecture) =>
        lecture.id === lectureId
          ? { ...lecture, video_url: videoUrl || "" }
          : lecture
      )
    );
    setIsDialogOpen(false);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const urls = await uploadFiles(formData); // Your file upload function  
    const videoUrl = urls["filevid"];
    if (videoUrl) {
      setNewLectures((prevLectures) =>
        prevLectures.map((lecture) =>
          lecture.id === lectureId ? { ...lecture, video_url: videoUrl } : lecture
        )
      );
    } 
    setIsDialogOpen(false);
  };
  

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log("🚀 ~ handleFileUpload ~ file.name:", file?.name)
      setVideoName(file.name);
      const url = URL.createObjectURL(file);
      setVideoFrame(null);
      setNewLectures((prevLectures) =>
        prevLectures.map((lecture) =>
          lecture.id === lectureId ? { ...lecture, video_url: url } : lecture
        )
      );
      generateVideoFrame(url);
    }
  };
  

  return (
    <Dialog  open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger  asChild>
        <div className="text-gray-700 text-sm px-2 py-1 cursor-pointer">
          Video
        </div>
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>Lecture Video</DialogTitle>
        </DialogHeader>
        <form className="flex flex-col gap-3 w-[30rem]"  onSubmit={async (e)=> await handleSubmit(e)}>
          <div className="flex gap-2 h-[10rem]  border border-gray-300">
            {videoFrame ? (
              <div className="flex gap-1">
                <Image
                  src={videoFrame}
                  className="h-[10rem] w-auto"
                  width={150}
                  height={150}
                  alt="Video Thumbnail"
                />
                <div className="flex flex-col w-[20rem] ">
                  <div className="flex items-center text-xs gap-2">
                    <div className="text-green-500">File Uploaded</div>
                    <div className="text-gray-700 font-bold text-lg mt-[-4px]">.</div>
                    <div className="text-gray-700">{videoDuration}</div>
                  </div>
                  <div className="text-sm text-gray-900">{videoName}</div>

                </div>
              </div>
            ) : (

                  <div className="text-gray-500 text-xs text-center m-auto">No video uploaded</div>
 
            )}
            <label
              className={` absolute bottom-[5rem] left-[12rem] ${
                videoFrame ? "rounded cursor-pointer" : "w-[35%] flex justify-center items-center px-4 py-2 rounded cursor-pointer bg-gray-300"
              }`}
            >
              <input
                type="file"
                accept="video/*"
                onChange={handleFileUpload}
                className="hidden"
                name="filevid"
              />
              <span className={`text-sm font-semibold ${videoFrame ? "text-blue-500" : "text-gray-900"}`}>
                {videoFrame ? "Replace Video" : "Upload Video"}
              </span>
            </label>
          </div>

          <DialogFooter>
            <button
              className="bg-customBg text-customText hover:text-texthover2 hover:bg-hoverbutton2 font-semibold py-2 px-4"
              type="submit"
            >
              Save Changes
            </button>
            <button
              type="button"
              className="bg-gray-100 text-gray-600 py-2 px-3"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
