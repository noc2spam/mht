"use client";

import RatingInput from "./RatingInput";
import SliderInput from "./SliderInput";
import RadioInput from "./RadioInput";
import Select from "./Select";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
type LogFormData = {
  mood_rating: number | undefined;
  anxiety_level: number | undefined;
  sleep_hours: number | undefined;
  sleep_quality: number | undefined;
  disturbances: "yes" | "no";
  activity_type: "none" | "light" | "moderate" | "heavy";
  activity_duration: number | undefined;
  socialized_for: number | undefined;
};
const initialState: LogFormData = {
  mood_rating: undefined,
  anxiety_level: undefined,
  sleep_hours: 0,
  sleep_quality: 0,
  disturbances: "no",
  activity_type: "none",
  activity_duration: 0,
  socialized_for: 0,
};

export default function ActivityPopup() {
  const [shown, setShown] = useState(false);
  const [visibleIndex, setVisibleIndex] = useState(0);
  const [formData, setFormData] = useState<LogFormData>(initialState);
  async function submitForm() {
    setShown(false);
    setFormData(initialState);
    setVisibleIndex(0);
    await fetch("/api/log", {
      method: "POST",
      body: JSON.stringify(formData),
    });
  }
  function possibleToGoNext(index: number, data: typeof formData) {
    switch (index) {
      case 0:
        return data.mood_rating !== undefined;
      case 1:
        return data.anxiety_level !== undefined;
      case 2:
        return (
          (data.sleep_hours !== undefined && data.sleep_hours < 1) ||
          (data.sleep_hours &&
            data.sleep_hours >= 1 &&
            data.sleep_quality !== undefined &&
            data.disturbances !== undefined)
        );
      case 3:
        return (
          data.activity_type === "none" ||
          (data.activity_type !== undefined &&
            data.activity_duration !== undefined)
        );
      case 4:
        return typeof data.socialized_for !== undefined;
      default:
        return true;
    }
  }
  return (
    <>
      <button onClick={() => setShown(true)} type="button">
        Create log
      </button>
      {shown && (
        <form
          className="fixed w-full h-full z-40 top-0 left-0 bg-gray-800/30 grid place-items-center"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShown(false);
            }
          }}
        >
          <div className="relative w-[850px] max-w-[80vw] h-[600px] bg-white p-6 border border-gray-100 rounded-xl text-gray-800 flex flex-col items-start justify-between">
            <div>
              <h2 className="text-2xl font-semibold">Create a new log</h2>
              <p className="text-gray-500">Step {visibleIndex + 1} of 5</p>
              <button
                onClick={() => setShown(false)}
                className="absolute top-2 right-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="w-full">
              {visibleIndex === 0 && (
                <div>
                  <label htmlFor="mood_rating">How is your mood today?</label>
                  <RatingInput
                    name="mood_rating"
                    id="mood_rating"
                    value={formData.mood_rating}
                    onChange={(rating: number) => {
                      setFormData((prev) => ({
                        ...prev,
                        mood_rating: Number(rating),
                      }));
                    }}
                  />
                </div>
              )}
              {visibleIndex === 1 && (
                <div>
                  <label htmlFor="anxiety_level">
                    What is your anxiety level today?
                  </label>

                  <RatingInput
                    name="anxiety_level"
                    id="anxiety_level"
                    value={formData.anxiety_level}
                    ratingInWords={{
                      0: "Extremely Anxious",
                      1: "Very Anxious",
                      2: "Anxious",
                      3: "Moderately Anxious",
                      4: "Slightly Anxious",
                      5: "Neutral",
                      6: "Slightly Relaxed",
                      7: "Moderately Relaxed",
                      8: "Relaxed",
                      9: "Very Relaxed",
                      10: "Extremely Relaxed",
                    }}
                    onChange={(rating: number) => {
                      setFormData((prev) => ({
                        ...prev,
                        anxiety_level: Number(rating),
                      }));
                    }}
                  />
                </div>
              )}
              {visibleIndex === 2 && (
                <div>
                  <div>
                    <label htmlFor="sleep_hours">
                      How many hours did you sleep last night?
                    </label>
                    <SliderInput
                      name="sleep_hours"
                      id="sleep_hours"
                      min={0}
                      max={24}
                      value={formData.sleep_hours}
                      suffix="hours"
                      onChange={(value: number) => {
                        setFormData((prev) => ({
                          ...prev,
                          sleep_hours: value,
                        }));
                      }}
                    />
                  </div>
                  {formData &&
                  formData.sleep_hours &&
                  formData.sleep_hours > 0 ? (
                    <div>
                      <label htmlFor="sleep_hours">
                        How satisfied are you with the quality of your sleep?
                      </label>
                      <RatingInput
                        value={formData.sleep_quality}
                        name="sleep_quality"
                        id="sleep_quality"
                        ratingInWords={{
                          1: "Very Dissatisfied",
                          2: "Dissatisfied",
                          3: "Slightly Dissatisfied",
                          4: "Dissatisfied",
                          5: "Neutral",
                          6: "Almost Satisfied",
                          7: "Satisfied",
                          8: "Fairly Satisfied",
                          9: "Very Satisfied",
                          10: "Perfect sleep",
                        }}
                        onChange={(rating: number) => {
                          setFormData((prev) => ({
                            ...prev,
                            sleep_quality: Number(rating),
                          }));
                        }}
                      />
                    </div>
                  ) : undefined}
                  {formData &&
                  formData.sleep_hours &&
                  formData.sleep_hours > 0 ? (
                    <div>
                      <label>
                        Did you experience any disturbances during sleep?
                      </label>
                      <RadioInput
                        name="disturbances"
                        defaultValue={formData.disturbances}
                        options={[
                          { value: "yes", label: "Yes" },
                          { value: "no", label: "No" },
                        ]}
                        onChange={(value) => {
                          setFormData((prev) => ({
                            ...prev,
                            disturbances: value.target.value as "yes" | "no",
                          }));
                        }}
                      />
                    </div>
                  ) : undefined}
                </div>
              )}
              {visibleIndex === 3 && (
                <div>
                  <label htmlFor="">
                    Did you do any physical activity today?
                  </label>
                  <Select
                    name="activity_type"
                    id="activity_type"
                    options={[
                      { value: "none", label: "None" },
                      { value: "light", label: "Light" },
                      { value: "moderate", label: "Moderate" },
                      { value: "heavy", label: "Heavy" },
                    ]}
                    onChange={(e) => {
                      setFormData((prev) => ({
                        ...prev,
                        activity_type: e.target.value as
                          | "none"
                          | "light"
                          | "moderate"
                          | "heavy",
                      }));
                    }}
                  />
                  {formData.activity_type !== "none" && (
                    <>
                      <label htmlFor="activity_duration">
                        How many hours?
                        <SliderInput
                          name="activity_duration"
                          id="activity_duration"
                          min={0}
                          max={24}
                          suffix="hours"
                          onChange={(value: number) => {
                            setFormData((prev) => ({
                              ...prev,
                              activity_duration: value,
                            }));
                          }}
                        />
                      </label>
                    </>
                  )}
                </div>
              )}
              {visibleIndex === 4 && (
                <div>
                  <label htmlFor="">
                    How many hours did you spend with your friends?
                  </label>
                  <SliderInput
                    name="socialized_for"
                    id="socialized_for"
                    min={0}
                    max={24}
                    suffix="hours"
                    onChange={(value: number) => {
                      setFormData((prev) => ({
                        ...prev,
                        socialized_for: value,
                      }));
                    }}
                  />
                </div>
              )}
            </div>
            <div className="flex justify-between mt-4 gap-4">
              <button
                type="button"
                onClick={() => {
                  if (visibleIndex > 0) {
                    setVisibleIndex((prev) => prev - 1);
                  }
                }}
                className={twMerge(
                  "bg-gray-100 px-4 py-2 rounded-lg",
                  visibleIndex === 0 && "opacity-50 cursor-not-allowed"
                )}
              >
                Previous
              </button>
              <button
                type="button"
                onClick={() => {
                  if (visibleIndex < 4) {
                    if (possibleToGoNext(visibleIndex, formData)) {
                      setVisibleIndex((prev) => prev + 1);
                    }
                    return;
                  }
                  submitForm();
                }}
                className={twMerge("bg-gray-100 px-4 py-2 rounded-lg")}
              >
                {visibleIndex === 4 ? "Finish" : "Next"}
              </button>
            </div>
          </div>
        </form>
      )}
    </>
  );
}
