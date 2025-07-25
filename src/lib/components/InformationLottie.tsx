"use client";

import animationData from "../../../public/lottie/information.json";
import { useLottie } from "lottie-react";

export default function InformationLottie() {
  const defaultOptions = {
    animationData: animationData,
    loop: true,
  };

  const { View } = useLottie(defaultOptions);

  return (
    <>
      <div className="">
        <div className="w-full">{View}</div>
      </div>
    </>
  );
}
