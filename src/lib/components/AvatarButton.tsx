"use client";

import Image from "next/image";
import { TbPencil } from "react-icons/tb";
import { useRef, useState } from "react";
import { uploadAsUser } from "../modules/dal";
import animationData from "../../../public/lottie/loadingCircle.json";
import { useLottie } from "lottie-react";

export default function AvatarButton({
  currentAvatar,
  onUpload,
}: {
  currentAvatar?: string | null;
  onUpload?: (url: string) => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [isUploading, setUploading] = useState(false);

  const defaultOptions = {
    animationData: animationData,
    loop: true,
  };

  const { View } = useLottie(defaultOptions);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploading(true);
    const file = e.target.files?.[0];
    if (!file) return;
    const result = await uploadAsUser(file, "avatars");

    setUploading(false);
    onUpload?.(result.url);
  };

  return (
    <>
      <button
        onClick={() => fileRef.current?.click()}
        className={`${
          isUploading ? "pointer-events-none" : ""
        } relative cursor-pointer group rounded-full flex items-center justify-center w-fit h-fit aspect-square overflow-hidden border bg-white`}
      >
        <div className="absolute w-full h-full bg-black/70 text-white group-hover:opacity-100 flex items-center justify-center opacity-0 transition-all duration-300">
          <TbPencil size={32} />
        </div>
        <Image
          className={`${
            isUploading ? "blur-sm" : ""
          } transition-all duration-300 `}
          src={currentAvatar || "/default_user.svg"}
          width={96}
          height={96}
          alt="User avatar"
        />
        <div
          className={`w-full h-full p-6 absolute bg-black/70 ${
            isUploading ? "opacity-100" : "opacity-0"
          }`}
        >
          {View}
        </div>
      </button>

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
    </>
  );
}
