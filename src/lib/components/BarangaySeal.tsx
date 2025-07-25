import Image from "next/image";
export default function BarangaySeal() {
  return (
    <div className="flex items-center justify-center w-full  gap-4">
      <Image
        src={"/logos/seal.png"}
        width={36}
        height={36}
        alt="seal"
        className="rounded-full "
      ></Image>
      <span className="text-xl font-serif dark:text-white/80 text-black/80 font-extrabold text-nowrap">
        Barangay Government of Bagtas
      </span>
    </div>
  );
}
