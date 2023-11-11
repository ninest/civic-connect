"use client";

import { Star } from "lucide-react";
import { useState } from "react";

export function Rating() {
  const [rating, setRating] = useState(0);

  return (
    <div className="flex items-center gap-2">
      {[...Array(5)].map((_, i) => {
        const rated = rating > i;

        if (rated)
          return (
            <Star
              className="text-yellow-600 fill-yellow-600"
              key={i}
              onClick={() => {
                setRating(i + 1);
              }}
            />
          );
        else
          return (
            <Star
              key={i}
              onClick={() => {
                setRating(i + 1);
              }}
            />
          );
      })}
    </div>
  );
}
