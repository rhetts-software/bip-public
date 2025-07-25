"use client";
import { useLottie } from "lottie-react";
import animationData from "../../../public/lottie/loadingCircle.json";
export default function OperationIndicator({
  show = false,
}: {
  show?: boolean;
}) {
  const defaultOptions = {
    animationData: animationData,
    loop: true,
  };

  const { View } = useLottie(defaultOptions);

  return <div className="flex absolute w-12 h-12 bottom-4 right-4">{View}</div>;
}
