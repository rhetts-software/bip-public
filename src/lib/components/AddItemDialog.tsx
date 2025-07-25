import { AddForm } from "../modules/types";
import AddAnnouncementDialogForm from "./AddAnnouncementDialogForm";
import AddDocumentDialogForm from "./AddDocumentDialogForm";
import AddFAQDialogForm from "./AddFAQDialogForm";
import Dialog from "./Dialog";
import PanelTitle from "./PanelTitle";

interface AddItemDialogProps {
  shown: boolean;
  type: AddForm;
  onSuccess?: () => any;
  onCancel?: () => any;
}

export default function AddItemDialog({
  shown,
  type,
  onCancel,
  onSuccess,
}: AddItemDialogProps) {
  return (
    <Dialog shown={shown} onCancel={onCancel} title="Add">
      {type === "announcement" && (
        <AddAnnouncementDialogForm
          onCancel={onCancel}
          onSuccess={onSuccess}
        />
      )}
      {type === "document" && (
        <AddDocumentDialogForm
          onCancel={onCancel}
          onSuccess={onSuccess}
        />
      )}
      {type === "faq" && (
        <AddFAQDialogForm
          onCancel={onCancel}
          onSuccess={onSuccess}
        />
      )}
    </Dialog>
  );
}
