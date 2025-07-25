import Link from "next/link";

export interface SecondaryLinkButtonProps {
  text: string | undefined;
  fontSize: number | undefined;
  href: string | undefined;
}
export default function SecondaryLinkButton({
  text = "",
  fontSize = 12,
  href = "/",
}: SecondaryLinkButtonProps) {
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
      className="flex border dark:hover:border-brand-blue-500 dark:border-brand-green-500 border-brand-green-400 hover:border-brand-blue-400 ease-in-out duration-300 transition-all font-bold  "
    >
      <span>{text}</span>
    </Link>
  );
}
