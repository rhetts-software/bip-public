import Link from "next/link";

export interface PrimaryLinkButtonProps {
  text: string | undefined;
  fontSize: number | undefined;
  href: string | undefined;
}
export default function PrimaryLinkButton({
  text = "",
  fontSize = 12,
  href = "/",
}: PrimaryLinkButtonProps) {
  return (
    <Link
      href={href}
      style={{
        fontSize: fontSize,
        paddingLeft: fontSize * 1.2,
        paddingRight: fontSize * 1.2,
        paddingTop: fontSize * 0.6,
        paddingBottom: fontSize * 0.6,
        borderRadius: fontSize * 0.8,
      }}
      className="flex dark:text-white text-black bg-linear-60 ease-in-out duration-300 transition-all bg-size-[200%] bg-position-[0] hover:bg-position-[100%] font-bold dark:from-brand-green-500 from-brand-green-300 dark:to-brand-blue-500 to-brand-blue-300  "
    >
      <span>{text}</span>
    </Link>
  );
}
