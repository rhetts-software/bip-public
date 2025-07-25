import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ContactsComponentProps {
  icon: Readonly<React.ReactNode>;
  title: string;
  children: React.ReactNode;
}
export default function ContactsComponent({
  icon,
  title,
  children,
}: ContactsComponentProps) {
  return (
    <div className="flex flex-col gap-6 items-center justify-center">
      {icon}
      <span className="text-3xl font-bold text-center">{title}</span>
      <span className="opacity-70">{children}</span>
    </div>
  );
}
