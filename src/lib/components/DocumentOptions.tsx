import { TbEdit, TbTrash } from "react-icons/tb";
import Options from "./Options";
import { useState } from "react";
import { deleteDocument } from "../modules/dal";
import EditDocumentDialog from "./EditDocumentDialog";
interface DocumentOptionsProps {
  id: string;
  name: string;
  filePath: string;
  category: string;
  bucket: string;
  onReloadRequested?: () => any;
  onDeleteRequested?: () => any;
}

export default function DocumentOptions({
  id,
  name,
  filePath,
  category,
  bucket,
  onReloadRequested,
  onDeleteRequested,
}: DocumentOptionsProps) {
  const [editDialogShown, setEditDialogShown] = useState(false);
  return (
    <>
      <EditDocumentDialog
        onCancel={() => {
          setEditDialogShown(false);
        }}
        onSuccess={() => {
          onReloadRequested?.();
          setEditDialogShown(false);
        }}
        shown={editDialogShown}
        id={id}
        name={name}
        category={category}
      ></EditDocumentDialog>
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
            await deleteDocument(bucket, filePath, id);
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
