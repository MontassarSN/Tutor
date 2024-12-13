// components/StarRating.tsx

import React from 'react';

interface StarRatingProps {
    rating: number; 
    maxRating?: number;
    size?: string;
}
export default function StarsRatingStatic({ rating, maxRating = 5, size = "text-2xl" } : StarRatingProps) {
    const roundedRating = Math.round(rating);
    return (
        <div className="flex">
            {Array.from({ length: maxRating }, (_, i) => (
                <span key={i} className={`${size} text-customText text-center`}>
                    {roundedRating > i ? "★" : "☆"}
                </span>
            ))}
        </div>
    );
};


