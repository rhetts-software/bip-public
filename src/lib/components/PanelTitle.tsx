export default function PanelTitle({
  children,
  id,
}: {
  children?: string;
  id?: string;
}) {
  return (
    <span
      id={children ? children.replace(" ", "") : id ?? ""}
      className="text-xl tracking-widest uppercase font-extrabold text-black dark:text-white text-nowrap"
    >
      {children ? children : "Panel Title"}
    </span>
  );
}
