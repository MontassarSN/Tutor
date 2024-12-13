import StarsRatingStatic from '@/components/starsRatingStatic'
import { Progress } from '@/components/ui/progress'
import React from 'react'

export default function CourseRatingline({rating,percentage}:{rating: number,percentage:string}) {
  return (
    <div className='flex gap-2 items-center'>
        <StarsRatingStatic rating={rating} />
        <div className='text-xs text-gray-500'>{rating} star rating</div>
        <Progress value={Number(percentage)} />
        <div className='text-xs '>
            {percentage}%
        </div>
    </div>
  )
}
