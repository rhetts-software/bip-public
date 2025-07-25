import Link from "next/link";
import { TbPassword, TbStatusChange } from "react-icons/tb";
import PanelTitle from "./PanelTitle";

export default function AccountManagement() {
  return (
    <div className="flex flex-col gap-8 border p-4 rounded-2xl border-slate-400  dark:border-slate-700  dark:bg-slate-800/20 bg-slate-200/20">
      <PanelTitle>Account Management</PanelTitle>

      <div className="flex w-full flex-col gap-12 py-6 dark:text-white text-black items-center justify-center">
        <Link
          href={"/app/account/change/password"}
          className="flex transition-all duration-200 dark:bg-slate-800 dark:border-slate-700 dark:hover:bg-slate-700/50 border py-4 px-6 rounded-2xl gap-4 items-center justify-center cursor-pointer"
        >
          <TbPassword size={24}></TbPassword>
          <span className="font-bold text-xl">Change Password</span>
        </Link>
        <Link
          href={"/app/account/change/password"}
          className="flex transition-all duration-200 dark:bg-slate-800 dark:border-slate-700 dark:hover:bg-slate-700/50 border py-4 px-6 rounded-2xl gap-4 items-center justify-center cursor-pointer"
        >
          <TbStatusChange size={24}></TbStatusChange>
          <span className="font-bold text-xl">Request Position Change</span>
        </Link>
      </div>
    </div>
  );
}
