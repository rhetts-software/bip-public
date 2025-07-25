import { useState } from "react";
import { dateToUserFriendlyString } from "../modules/utils";
import FAQOptions from "./FAQOptions";
import ResolvableIcon from "./ResolvableIcon";

interface DashboardFAQItemProps {
  id: string;
  question: string;
  answer: string;
  icon?: string; // icon component name from the category
  categoryName: string;
  onReloadRequested?: () => any;
}

export default function DashboardFAQItem({
  question,
  id,
  answer,
  icon,
  categoryName,
  onReloadRequested,
}: DashboardFAQItemProps) {
  const [markedForDelete, setMarkedForDelete] = useState(false);
  return (
    <div
      className={`${
        markedForDelete ? "opacity-30" : ""
      } border dark:text-white hover:dark:bg-slate-700/50 transition-all duration-200 dark:bg-slate-800 px-8 py-6 rounded-xl flex flex-col gap-4 dark:border-slate-700`}
    >
      <div className="flex justify-between">
        <div className="flex justify-center gap-2 flex-col">
          <span className="font-semibold text-sm flex gap-2">
            {icon && <ResolvableIcon icon={icon} size={16} />} {categoryName}
          </span>
          <span className="text-lg font-bold">{question}</span>
        </div>
        <FAQOptions
          onDeleteRequested={() => {
            setMarkedForDelete(true);
          }}
          onReloadRequested={onReloadRequested}
          id={id}
          question={question}
          answer={answer}
          category={categoryName}
        ></FAQOptions>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-sm text-slate-300">{answer}</p>
      </div>
    </div>
  );
}
