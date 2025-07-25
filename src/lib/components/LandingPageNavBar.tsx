import Link from "next/link";
import PrimaryLinkButton from "./PrimaryButton";
import SecondaryLinkButton from "./SecondaryButton";
import BarangaySeal from "./BarangaySeal";

export default function LandingPageNavBar({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="fixed text-lg pointer-events-none flex w-screen py-4 px-12 z-50  dark:text-white text-black justify-between">
        <div className="dark:bg-black/20 bg-white/20 pointer-events-auto flex items-center justify-center py-2 px-4 border-emerald-400/35 border-2 backdrop-blur-xl rounded-3xl">
          <Link href={"/"} className="font-bold">
            <BarangaySeal></BarangaySeal>
          </Link>
        </div>
        <div className="gap-4 pointer-events-auto font-bold items-center justify-center flex dark:bg-black/20 bg-white/20 border-2 border-blue-400/35 py-2 px-8 backdrop-blur-xl rounded-3xl">
          <Link
            href="/#"
            className="hover:text-emerald-400 px-2 transition-all duration-300"
          >
            Home
          </Link>
          <Link
            href="/#about"
            className="hover:text-emerald-400 px-2 transition-all duration-300"
          >
            About
          </Link>
          <Link
            href="/#contact"
            className="hover:text-emerald-400 px-2 transition-all duration-300"
          >
            Contact Us
          </Link>
          <SecondaryLinkButton
            text="Sign In"
            fontSize={14}
            href="/signin"
          ></SecondaryLinkButton>
          <PrimaryLinkButton
            text="Sign Up"
            fontSize={14}
            href="/signup"
          ></PrimaryLinkButton>
        </div>
      </div>
      {children}
    </>
  );
}
