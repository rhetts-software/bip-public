"use client";
import Link from "next/link";
import { useActionState } from "react";
import { changeEmail } from "../modules/auth";

export default function ChangeEmailForm() {
  const [state, action, pending] = useActionState(changeEmail, undefined);
  return (
    <form
      action={action}
      className="dark:text-white text-black flex flex-col gap-4 p-8"
    >
      <label htmlFor="oldPassword" className="flex text-md flex-col gap-2">
        <span className="font-extrabold  px-1">New E-mail</span>
        <input
          id="newEmail"
          className="border tracking-wide rounded-lg text-xl w-96 p-2 border-slate-300 bg-slate-100 dark:border-slate-700 dark:bg-slate-800"
          type="email"
          name="newEmail"
        />
      </label>

      <div className="flex items-center pt-6 justify-center gap-12">
        <button
          className="transition-all duration-300 dark:bg-brand-green-600 cursor-pointer bg-brand-blue-500 text-white border-brand-blue-700  dark:text-white px-6 py-2 rounded-lg font-bold border dark:border-brand-green-400 hover:bg-brand-blue-600 dark:hover:bg-brand-green-500 text-lg"
          type="submit"
        >
          <span>Change</span>
        </button>
        <Link
          className="text-lg transition-all duration-300 dark:bg-slate-700 cursor-pointer bg-slate-400 text-white border-slate-600  dark:text-white px-6 py-2 rounded-lg font-bold border dark:border-slate-500 hover:bg-slate-500 dark:hover:bg-slate-600"
          href={"/app/account"}
        >
          <span>Cancel</span>
        </Link>
      </div>
    </form>
  );
}
