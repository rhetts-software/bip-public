import { useState } from "react";
import CreateCustomPostDialog from "../CreateCustomPostDialog.tsx";

export default function CustomPost() {
  const [dialogShown, setDialogShown] = useState(false);
  return (
    <div className="flex gap-4 text-lg items-center">
      <CreateCustomPostDialog
        onCancel={() => {
          setDialogShown(false);
        }}
        onPost={() => {
          setDialogShown(false);
        }}
        shown={dialogShown}
      ></CreateCustomPostDialog>
      <button
        onClick={() => {
          setDialogShown(true);
        }}
        className="transition-all duration-200 dark:bg-slate-700 cursor-pointer bg-slate-400 text-white border-slate-600  dark:text-white px-4 py-2 rounded-lg font-bold border dark:border-slate-500 hover:bg-slate-500 dark:hover:bg-slate-600"
      >
        Create custom post
      </button>
      <span className="opacity-50">
        Create a customized post for testing purposes.
      </span>
    </div>
  );
}
