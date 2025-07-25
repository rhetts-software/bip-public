"use client";
import Link from "next/link";
import { useActionState } from "react";
import { changePassword } from "../modules/auth";

export default function ChangePasswordForm() {
  const [state, action, pending] = useActionState(changePassword, undefined);
  return (
    <form
      action={action}
      className="dark:text-white text-black flex flex-col gap-4 p-8"
    >
      <label htmlFor="oldPassword" className="flex text-md flex-col gap-2">
        <span className="font-extrabold  px-1">Old Password</span>
        <input
          id="oldPassword"
          className="border tracking-wide rounded-lg text-xl w-96 p-2 border-slate-300 bg-slate-100 dark:border-slate-700 dark:bg-slate-800"
          type="password"
          name="oldPassword"
        />
        {state?.errors?.properties?.oldPassword?.errors && (
          <span className="text-red-500 px-1">
            {state.errors.properties.oldPassword.errors}
          </span>
        )}
      </label>
      <label htmlFor="newPassword" className="flex text-md flex-col gap-2">
        <span className="font-extrabold  px-1">New Password</span>
        <input
          id="newPassword"
          className="border tracking-wide rounded-lg text-xl w-96 p-2 border-slate-300 bg-slate-100 dark:border-slate-700 dark:bg-slate-800"
          type="password"
          name="newPassword"
        />
        {state?.errors?.properties?.passwordGroup?.properties?.newPassword
          ?.errors && (
          <div className="px-1 flex flex-col gap-2">
            <span className="text-red-500">
              Your password must meet the following requirements:
            </span>
            <div className="flex flex-col px-4">
              {state.errors.properties.passwordGroup.properties.newPassword.errors.map(
                (error, index) => {
                  return (
                    <span key={index} className="text-red-500">
                      {error}
                    </span>
                  );
                }
              )}
            </div>
          </div>
        )}
      </label>
      <label htmlFor="confirmPassword" className="flex text-md flex-col gap-2">
        <span className="font-extrabold  px-1">Confirm Password</span>
        <input
          id="confirmPassword"
          className="border tracking-wide rounded-lg text-xl w-96 p-2 border-slate-300 bg-slate-100 dark:border-slate-700 dark:bg-slate-800"
          type="password"
          name="confirmPassword"
        />
        {state?.errors?.properties?.passwordGroup?.properties?.confirmPassword
          ?.errors && (
          <span className="text-red-500 px-1">
            {
              state.errors.properties.passwordGroup.properties.confirmPassword
                .errors
            }
          </span>
        )}
        {state?.errors?.properties?.passwordGroup?.errors && (
          <span className="text-red-500 px-1">
            {state.errors.properties.passwordGroup.errors}
          </span>
        )}
        {state?.authError && (
          <span className="text-red-500 px-1">{state.authError}</span>
        )}
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
