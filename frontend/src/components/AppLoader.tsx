"use client";

import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

export default function AppLoader({
  messages,
  expectedCompletionTime = 10000,
  className = "",
  wrapperClassName = "",
}: {
  messages?: string[];
  expectedCompletionTime?: number;
  className?: string;
  wrapperClassName?: string;
}) {
  const [state, setState] = useState<{
    currentMessage: string;
    progress: number;
    callbackRan: boolean;
  }>({
    currentMessage: "",
    progress: 0,
    callbackRan: false,
  });
  const waitTime =
    messages && messages.length > 0
      ? Math.ceil(expectedCompletionTime / messages.length)
      : 3000;
  useEffect(() => {
    const interval = setInterval(() => {
      if (!messages || messages.length < 2) {
        clearInterval(interval);
        return;
      }
      const currentTime = new Date().getTime();
      const timeElapsed = currentTime - state.progress;
      if (timeElapsed >= waitTime) {
        const currentMessageIndex = messages.indexOf(state.currentMessage);
        if (currentMessageIndex < messages.length - 1) {
          setState({
            ...state,
            currentMessage: messages[currentMessageIndex + 1],
            progress: currentTime,
          });
          return;
        }
        clearInterval(interval);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [expectedCompletionTime, messages, state.progress, waitTime, state]);
  return (
    <div
      className={twMerge(
        "grid w-full h-full place-items-center place-content-center",
        wrapperClassName
      )}
    >
      <div className={`${className} app-loader`}></div>
      {messages && messages.length > 0 && (
        <p className="px-4 text-sm text-gray-700">
          {!state.currentMessage || state.currentMessage.length < 1
            ? messages[0]
            : state.currentMessage}
        </p>
      )}
    </div>
  );
}
