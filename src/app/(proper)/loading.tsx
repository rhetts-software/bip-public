"use client";
import animationData from "../../../public/lottie/loading.json";
import { useLottie } from "lottie-react";
export default function Loading() {
  const defaultOptions = {
    animationData: animationData,
    loop: true,
  };

  const { View } = useLottie(defaultOptions);
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-64 h-64">{View}</div>
    </div>
  );
}
