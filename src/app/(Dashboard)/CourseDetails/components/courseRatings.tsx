"use client";
import StarsRatingStatic from '@/components/starsRatingStatic';
import { useComments } from '@/queries/useComments';
import React from 'react';
import CourseRatingline from './courseRatingline';

export default function CourseRatings({ id }: { id: string }) {
    const { data: comments } = useComments(id);
    
    // Filter out comments with valid ratings
    const validRatings = comments?.filter((comment) => comment.rating !== null) || [];
    
    // Calculate the total rating
    let totalRating = validRatings.reduce(
        (sum, comment) => sum + (comment.rating ?? 0),
        0
    );
    
    // Calculate the average rating
    const validRatingsCount = validRatings.length;
    const avgrating = validRatingsCount > 0 ? totalRating / validRatingsCount : 0;
    
    // Calculate the counts for each rating
    const ratingCounts = comments?.reduce(
        (acc, comment) => {
            const rating = comment.rating; 
            if (rating !== null && rating !== undefined && rating >= 0 && rating <= 5) {
                acc[`count${rating}` as keyof typeof acc] += 1;
            }
            return acc;
        },
        {
            count0: 0,
            count1: 0,
            count2: 0,
            count3: 0,
            count4: 0,
            count5: 0,
        }
    );

    // Calculate the total number of comments
    const totalComments = comments?.length || 0;

    // Function to format the percentage value
    const formatPercentage = (count: number) => {
        const percentage = totalComments > 0 ? (count / totalComments) * 100 : 0;
        if (percentage < 1) {
            return "<1";
        }
        return Math.round(percentage).toString();
    };

    // Calculate the percentage for each rating
    const ratingPercentages = {
        count5: formatPercentage(ratingCounts?.count5 ?? 0),
        count4: formatPercentage(ratingCounts?.count4 ?? 0),
        count3: formatPercentage(ratingCounts?.count3 ?? 0),
        count2: formatPercentage(ratingCounts?.count2 ?? 0),
        count1: formatPercentage(ratingCounts?.count1 ?? 0),
        count0: formatPercentage(ratingCounts?.count0 ?? 0),
    };

    return (
        <div className="flex flex-col gap-5">
            <div className="text-xl font-bold text-gray-900">Course Rating</div>
            <div className='flex gap-2 items-center'>
                <div className='flex flex-col gap-2 justify-center p-5 border border-1'>
                    <div className='text-4xl font-bold pb-2 text-center'>{avgrating.toFixed(1)}</div>
                    <StarsRatingStatic rating={Math.round(avgrating)} />
                    <div className='text-xs font-semibold text-center'>Course Rating</div>
                </div>
                <div>
                    <CourseRatingline rating={5} percentage={ratingPercentages.count5} />
                    <CourseRatingline rating={4} percentage={ratingPercentages.count4} />
                    <CourseRatingline rating={3} percentage={ratingPercentages.count3} />
                    <CourseRatingline rating={2} percentage={ratingPercentages.count2} />
                    <CourseRatingline rating={1} percentage={ratingPercentages.count1} />
                </div>
            </div>
        </div>
    );
}
