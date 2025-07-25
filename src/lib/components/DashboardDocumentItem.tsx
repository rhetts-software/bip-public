import Link from "next/link";
import {
  dateToUserFriendlyString,
  sizeToUserFriendlyString,
} from "../modules/utils";

import Image from "next/image";
import DocumentOptions from "./DocumentOptions";
import { useState } from "react";
import { encodeSafeBase64 } from "../modules/utils";
import { useRouter } from "next/navigation";

interface DashboardDocumentItemProps {
  name: string;
  size: number;
  createdAt: string;
  updatedAt: string;
  publicUrl: string;
  id: string;
  bucket: string;
  filePath: string;
  category: string;
  displayName?: string;
  onReloadRequested?: () => any;
}
export default function DashboardDocumentItem({
  name,
  size,
  id,
  bucket,
  filePath,
  createdAt,
  updatedAt,
  publicUrl,
  displayName,
  category,
  onReloadRequested,
}: DashboardDocumentItemProps) {
  const [markedForDelete, setMarkedForDelete] = useState(false);

  return (
    <div
      className={`${
        markedForDelete ? "opacity-30" : ""
      } border dark:text-white hover:dark:bg-slate-700/50 transition-all duration-200 dark:bg-slate-800 px-8 py-6 rounded-xl flex flex-col gap-4 dark:border-slate-700 `}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-center gap-2">
          <Link
            href={`/app/documents/${encodeSafeBase64(name)}`}
            className="hover:underline text-xl font-bold truncate max-w-[200px]"
          >
            {displayName}
          </Link>
          <span className="opacity-30">
            {dateToUserFriendlyString(new Date(createdAt))}
          </span>
        </div>
        <DocumentOptions
          onReloadRequested={onReloadRequested}
          onDeleteRequested={() => {
            setMarkedForDelete(true);
          }}
          bucket={bucket}
          filePath={filePath}
          id={id}
          name={name}
          category={category}
        ></DocumentOptions>
      </div>
      <div className="*:border gap-2 flex *:rounded-lg *:dark:bg-slate-700 *:dark:border-slate-600 *:py-1 *:px-2">
        <span className="capitalize text-nowrap truncat">{category}</span>
        <span className="truncate text-nowrap  max-w-40">{name}</span>
        <span className="text-nowrap truncate">
          {sizeToUserFriendlyString(size)}
        </span>
      </div>
    </div>
  );
}
