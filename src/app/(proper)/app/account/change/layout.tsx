export default function ChangeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start justify-center h-full w-full">
      <div className="dark:border-neutral-800 border-neutral-400  dark:bg-slate-800/20 bg-slate-200/20 border rounded-2xl p-12">
        {children}
      </div>
    </div>
  );
}
