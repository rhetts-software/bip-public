"use client";
import SignUpAsChoice from "@/lib/components/SignUpAsChoice";
import SignUpForm from "@/lib/components/SignUpForm";
import { UserType } from "@/lib/modules/types";

import { useState } from "react";

export default function SignUp() {
  const [choice, setChoice] = useState(UserType.CONSTITUENT);
  return (
    <div className="flex flex-col w-full justify-center items-center bg-slate-50 dark:bg-brand-blue-950 py-8 px-4 sm:px-6 lg:px-8">
      <span className="font-serif font-bold text-3xl dark:text-white">Sign Up</span>
      <span className="font-serif text-xl dark:text-white">as</span>
      <SignUpAsChoice
        value={choice}
        onValueChanged={(value) => {
          setChoice(value);
        }}
      ></SignUpAsChoice>
      <div className="border-t-2  dark:border-white w-full flex-col mt-8 flex items-center justify-center">
        <SignUpForm choice={choice}></SignUpForm>
      </div>
    </div>
  );
}
