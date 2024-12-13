"use client";
import addComment from "@/api/course/addComment";
import fetchCourseComments from "@/api/course/fetchCourseComments";
import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { z } from "zod";
import Comment from "./comment";
import useCurrentUser from "@/queries/useCurrentUser";
import Image from "next/image";

import { useComments } from "@/queries/useComments";
import { UpdateCourserating } from "@/api/course/updateCourseRating";
import StarsRating from "@/components/starRating";
import existingComment from "@/api/course/existingComment";

const commentSchema = z.object({
  content: z.string().min(1, "Comment cannot be empty"),
});

export default function Comments({ id }: { id: string }) {
  const { data: user } = useCurrentUser();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [rating, setrating] = useState<number>(0);
  const [visibleCount, setVisibleCount] = useState(4); // Show 5 comments initially
  

  const { data: comments } = useComments(id);

  const handleShowMore = () => {
    setVisibleCount(visibleCount + 4); // Show all comments
  };

  const validRatings =
    comments?.filter((comment) => comment.rating !== null) || [];
  let totalRating = validRatings.reduce(
    (sum, comment) => sum + (comment.rating ?? 0),
    0
  );

  const addCommentMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const content = String(formData.get("content"));
      const validation = commentSchema.safeParse({ content });
      if (!validation.success) {
        throw new Error("Validation failed");
      }
      const oldComment = await existingComment(id);
      let updatedValidRatingsCount = validRatings.length ;

      if (oldComment) {
        totalRating -= oldComment?.rating || 0;
        totalRating += rating;
      }
      else {
        updatedValidRatingsCount = validRatings.length + 1;
        totalRating += rating;

      }
      const avgrating =
        updatedValidRatingsCount > 0
          ? totalRating / updatedValidRatingsCount
          : 0;
      await addComment(content, id, rating);
      await UpdateCourserating(id, avgrating, updatedValidRatingsCount);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses", id] });
      queryClient.invalidateQueries({ queryKey: ["comments", id] });

      toast({
        variant: "success",
        title: "Success",
        description: "Comment added successfully",
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Failed to add comment",
        description: "Don't leave the comment empty",
      });
    },
  });

  return (
    <div className="flex flex-col gap-5">
      <div className="text-xl font-bold text-gray-900">Students Feedback</div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          addCommentMutation.mutate(formData);
        }}
        className="flex flex-col gap-2"
      >
        <div className="flex items-center gap-2">
          <Image
            src={user?.pic || "/noAvatar.jpg"}
            alt="User Avatar"
            width={30}
            height={30}
            className="rounded-full  min-h-[2rem] max-h-[2rem] min-w-[2rem] max-w-[2rem]"
          />
          <div className="text-sm text-gray-700">Rate The Course</div>
          <StarsRating rating={rating} setrating={setrating} />
        </div>
        <input
          className="w-full border-gray-100 border-[1px] px-4 py-2 focus:outline-none text-xs"
          placeholder="Comment..."
          name="content"
        />
        <button
          className="text-xs bg-customBg text-customText hover:text-texthover2 hover:bg-hoverbutton2 w-[15%] px-2 py-1 ml-auto"
          type="submit"
        >
          Comment
        </button>
      </form>
      <div className="flex flex-col gap-3">
        {comments && comments.length > 0 ? (
          comments
            .slice(0, visibleCount)
            .map((comment) => <Comment comment={comment} key={comment.id} />)
        ) : (
          <p>No comments available</p>
        )}
        {comments && comments.length > visibleCount && (
          <button
            onClick={handleShowMore}
            className="text-customText text-sm mt-2"
          >
            See More
          </button>
        )}
      </div>
    </div>
  );
}
