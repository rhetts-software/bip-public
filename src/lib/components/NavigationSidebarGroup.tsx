import NavigationSidebarEntry from "./NavigationSidebarEntry";

interface NavigationSidebarGroupProps {
  links: any[];
  collapsed: boolean;
  title: string;
  currentPath: string;
}
export default function NavigationSidebarGroup({
  links,
  collapsed,
  title,
  currentPath,
}: NavigationSidebarGroupProps) {
  return (
    <div className="py-4 flex flex-col gap-1">
      <span
        className={`transition-all duration-200 ${
          !collapsed ? "opacity-100" : "opacity-0"
        } px-2 font-bold  uppercase tracking-widest`}
      >
        {title}
      </span>
      {links.map((link) => {
        return (
          <NavigationSidebarEntry
            key={link.id}
            icon={link.icon}
            href={link.href}
            text={link.label}
            showText={!collapsed}
            currentPath={currentPath}
          ></NavigationSidebarEntry>
        );
      })}
    </div>
  );
}
