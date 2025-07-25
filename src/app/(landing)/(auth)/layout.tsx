export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-screen flex items-center min-h-screen justify-center p-36">
      <div className="w-[40%] p-12 bg-slate-50 dark:bg-brand-blue-950 py-8 px-4 sm:px-6 lg:px-8 rounded-2xl flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}
