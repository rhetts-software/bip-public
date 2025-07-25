import { TbEdit, TbTrash } from "react-icons/tb";
import Options from "./Options";
import { useState } from "react";
import EditAnnouncementDialog from "./EditAnnouncementDialog";
import { deleteAnnouncement } from "../modules/dal";
interface AnnouncementOptionsProps {
  id: string;
  title: string;
  content: string;
  priority: number;
  pinned: boolean;
  expiry?: string;
  scheduledAt?: string;
  onReloadRequested?: () => any;
  onDeleteRequested?: () => any;
}

export default function AnnouncementOptions({
  id,
  title,
  content,
  priority,
  pinned,
  expiry,
  scheduledAt,
  onReloadRequested,
  onDeleteRequested,
}: AnnouncementOptionsProps) {
  const [editDialogShown, setEditDialogShown] = useState(false);
  return (
    <>
      <EditAnnouncementDialog
        onCancel={() => {
          setEditDialogShown(false);
        }}
        onSuccess={() => {
          onReloadRequested?.();
          setEditDialogShown(false);
        }}
        shown={editDialogShown}
        id={id}
        title={title}
        content={content}
        priority={priority}
        pinned={pinned}
        expiry={expiry}
      ></EditAnnouncementDialog>
      <Options>
        <button
          onClick={() => {
            setEditDialogShown(true);
          }}
          className="hover:bg-black/3 dark:hover:bg-white/3 w-full cursor-pointer pr-3 flex items-center  gap-2 text-nowrap rounded-lg p-2 transition-all duration-100"
        >
          <TbEdit size={18}></TbEdit>
          <span className="text-lg">Edit</span>
        </button>
        <button
          onClick={async () => {
            onDeleteRequested?.();
            await deleteAnnouncement(id);
            onReloadRequested?.();
          }}
          className="dark:hover:bg-red-800 hover:bg-red-500 text-white cursor-pointer w-full bg-red-600 dark:bg-red-900 pr-3 flex items-center justify-center gap-2 text-nowrap rounded-lg p-2 transition-all duration-100"
        >
          <TbTrash size={18}></TbTrash>
          <span className="text-lg">Delete</span>
        </button>
      </Options>
    </>
  );
}
