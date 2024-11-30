"use client";

import { useRef, useState } from "react";
import AppIcon from "./AppIcon";
import { twMerge } from "tailwind-merge";

export default function RatingInput({
  max = 10,
  min = 1,
  className = "",
  name = "rating-input",
  value = undefined,
  id = "rating-input",
  colorMap = {
    1: "bg-[#D93D3D]",
    2: "bg-[#C84E3E]",
    3: "bg-[#B66040]",
    4: "bg-[#A57141]",
    5: "bg-[#938342]",
    6: "bg-[#829444]",
    7: "bg-[#70A645]",
    8: "bg-[#5FB746]",
    9: "bg-[#4DC948]",
    10: "bg-[#3BD949]",
  },
  ratingInWords = {
    1: "Very Bad",
    2: "Bad",
    3: "Poor",
    4: "Fair",
    5: "Average",
    6: "Good",
    7: "Very Good",
    8: "Great",
    9: "Excellent",
    10: "Perfect",
  },
  onChange = () => {},
}: {
  max?: number;
  min?: number;
  className?: string;
  name?: string;
  id?: string;
  value?: number;
  colorMap?: Record<number, string>;
  ratingInWords?: Record<number, string>;
  onChange?: (value: number) => void;
}) {
  const [rating, setRating] = useState<number | undefined>(value);
  const hiddenInput = useRef(null);
  return (
    <>
      <input
        ref={hiddenInput}
        name={name}
        id={id}
        type="hidden"
        defaultValue={value}
      />
      <div className={` grid grid-cols-10 gap-1 ${className}`}>
        {Array.from({ length: max }, (_, i) => i + min).map((i) => (
          <div
            key={i}
            className="flex flex-col items-center justify-start text-center font-bold"
          >
            <button
              type="button"
              onClick={() => {
                setRating(i);
                onChange(i);
                if (
                  hiddenInput.current &&
                  (hiddenInput.current as HTMLInputElement).value
                )
                  (hiddenInput.current as HTMLInputElement).value = String(i);
              }}
              className={twMerge(
                "block  text-white bg-gray-500 rounded-full p-1 sm:p-2",
                rating && rating >= i ? colorMap[i] : ""
              )}
            >
              <AppIcon
                name="star"
                className="w-full max-w-8 h-full text-white"
              />
            </button>
            <div className="text-xs w-full text-center text-wrap text-gray-500 md:block hidden">
              {ratingInWords[i]}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
