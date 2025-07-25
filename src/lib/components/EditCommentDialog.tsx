import Dialog from "./Dialog";

export default function EditCommentDialog({
  shown = false,
}: {
  shown?: boolean;
}) {
  return (
    <Dialog shown={shown} title={"Edit"}>
      <form></form>
    </Dialog>
  );
}
