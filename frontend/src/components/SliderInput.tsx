import singularize from "@/utils/singularize";
import { useState } from "react";

export default function SliderInput({
  name,
  id,
  min,
  max,
  value = 0,
  suffix = "",
  onChange = () => {},
}: {
  name: string;
  id: string;
  min: number;
  max: number;
  value?: number;
  suffix?: string;
  onChange?: (value: number) => void;
}) {
  const [sliderValue, setSliderValue] = useState(value);
  return (
    <div>
      <input
        type="range"
        step={1}
        name={name}
        id={id}
        min={min}
        max={max}
        defaultValue={sliderValue}
        className="w-full"
        onChange={(e) => {
          setSliderValue(parseInt(e.target.value, 10));
          onChange(parseInt(e.target.value, 10));
        }}
      />
      {typeof sliderValue === "number" && (
        <output htmlFor={id} className="text-center">
          {sliderValue}{" "}
          {!isNaN(sliderValue) && Number(sliderValue) < 2
            ? singularize(suffix)
            : suffix}
        </output>
      )}
    </div>
  );
}
