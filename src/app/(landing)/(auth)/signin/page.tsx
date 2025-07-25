"use client";
import SignInForm from "@/lib/components/SignInForm";

export default function SignInPage() {
  return (
    <div className="flex flex-col  w-full justify-center items-center">
      <span className="font-medium text-3xl dark:text-white">Sign In</span>

      <div className="border-t-2 border-gray-300 dark:border-white w-full flex-col mt-8 flex items-center justify-center">
        <SignInForm></SignInForm>
      </div>
    </div>
  );
}
