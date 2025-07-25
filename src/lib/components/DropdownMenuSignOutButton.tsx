import Link from "next/link";
import supabase from "../modules/supabase.client";
import { TbLogout2 } from "react-icons/tb";
import { useRouter } from "next/navigation";

export default function DropdownMenuSignOutButton() {
  const router = useRouter();
  return (
    <button
      className="hover:bg-black/3 dark:hover:bg-white/3  cursor-pointer flex gap-2 py-3 pr-6 px-4 text-lg rounded-xl w-full"
      onClick={async () => {
        await supabase.auth.signOut();
        router.push("/signin");
      }}
    >
      <TbLogout2 size={24}></TbLogout2>
      <span>Sign out</span>
    </button>
  );
}
