import { TbEdit, TbTrash } from "react-icons/tb";
import Options from "./Options";
import { useState } from "react";
import EditFAQDialog from "./EditFAQDialog";
import { deleteFAQ } from "../modules/dal";

interface FAQOptionsProps {
  id: string;
  question: string;
  answer: string;
  category: string;
  onReloadRequested?: () => any;
  onDeleteRequested?: () => any;
}

export default function FAQOptions({
  id,
  question,
  answer,
  category,
  onReloadRequested,
  onDeleteRequested,
}: FAQOptionsProps) {
  const [editDialogShown, setEditDialogShown] = useState(false);

  return (
    <>
      <EditFAQDialog
        shown={editDialogShown}
        id={id}
        question={question}
        answer={answer}
        category={category}
        onCancel={() => setEditDialogShown(false)}
        onSuccess={() => {
          onReloadRequested?.();
          setEditDialogShown(false);
        }}
      />
      <Options>
        <button
          onClick={() => setEditDialogShown(true)}
          className="hover:bg-black/3 dark:hover:bg-white/3 w-full cursor-pointer pr-3 flex items-center gap-2 text-nowrap rounded-lg p-2 transition-all duration-100"
        >
          <TbEdit size={18} />
          <span className="text-lg">Edit</span>
        </button>
        <button
          onClick={async () => {
            onDeleteRequested?.();
            await deleteFAQ(id);
            onReloadRequested?.();
          }}
          className="dark:hover:bg-red-800 hover:bg-red-500 text-white cursor-pointer w-full bg-red-600 dark:bg-red-900 pr-3 flex items-center justify-center gap-2 text-nowrap rounded-lg p-2 transition-all duration-100"
        >
          <TbTrash size={18} />
          <span className="text-lg">Delete</span>
        </button>
      </Options>
    </>
  );
}
