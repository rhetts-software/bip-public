import ChangePasswordForm from "@/lib/components/ChangePasswordForm";

export default function PasswordChangePage() {
  return (
    <>
      <span className="dark:text-white tracking-widest uppercase font-extrabold">
        Change Password
      </span>
      <ChangePasswordForm></ChangePasswordForm>
    </>
  );
}
