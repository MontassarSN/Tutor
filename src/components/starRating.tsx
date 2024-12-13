"use client";
import React, { useState } from "react";
import Star from "./Star";

export default function StarsRating({
  rating,
  setrating,
}: {
  rating: number;
  setrating: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [hover, setHover] = useState<number>(0);

  function handleRating(rating: number) {
    setrating(rating);
  }

  return (
    <div>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          full={hover ? hover >= i + 1 : rating >= i + 1}
          onClick={() => handleRating(i + 1)}
          onMouseEnter={() => setHover(i + 1)}
          onMouseLeave={() => setHover(0)}
        />
      ))}
    </div>
  );
}
