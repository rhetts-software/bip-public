import Link from "next/link";

interface DropdownMenuItemProps {
  href: string;
  text?: string;
  icon?: Readonly<React.ReactNode>;
}

export default function DropdownMenuItem({
  href,
  text,
  icon,
}: DropdownMenuItemProps) {
  return (
    <Link
      className="hover:bg-black/3 dark:hover:bg-white/3  text-nowrap flex gap-2 py-3 pr-6 px-4 text-lg rounded-xl w-full"
      href={href}
    >
      {icon}
      <span>{text}</span>
    </Link>
  );
}
