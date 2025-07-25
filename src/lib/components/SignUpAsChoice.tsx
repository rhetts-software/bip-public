import { useEffect, useState } from "react";
import { UserType } from "../modules/types";
import { Sign } from "crypto";
interface SignUpAsChoice {
  value: UserType;
  onValueChanged: (value: UserType) => void | undefined;
}

export default function SignUpAsChoice({
  onValueChanged,
  value,
}: SignUpAsChoice) {
  return (
    <div className="flex gap-2 pt-4 dark:text-white ">
      <button
        onClick={() => {
          if (onValueChanged) onValueChanged(UserType.CONSTITUENT);
        }}
        className={`${
          value == UserType.CONSTITUENT
            ? "bg-brand-green-500 border-brand-green-500 text-white"
            : ""
        } text-xl font-bold  border transition-all duration-300 cursor-pointer hover:border-brand-green-500 py-2 px-4 rounded-2xl`}
      >
        Constituent
      </button>
      <button
        onClick={() => {
          if (onValueChanged) onValueChanged(UserType.OFFICIAL);
        }}
        className={`${
          value == UserType.OFFICIAL
            ? "bg-brand-blue-500 border-brand-blue-500 text-white"
            : ""
        } text-xl font-bold border transition-all duration-300 cursor-pointer hover:border-brand-blue-500 py-2 px-4 rounded-2xl`}
      >
        Official
      </button>
    </div>
  );
}
