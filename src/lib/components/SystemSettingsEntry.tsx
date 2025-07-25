import { useState } from "react";
import { secondsToString } from "../modules/utils";
import { AnimatePresence, motion } from "motion/react";
import { updateSystemSetting } from "../modules/dal";
import PendingSubmitFormButton from "./PendingSubmitFormButton";

type Hint = {
  type: string;
  inputProcessing?: (value: string) => string;
  tooltipProcessing?: (value: string) => string;
};

const hints: { [id: string]: Hint } = {
  postExpiry: {
    type: "number",
    inputProcessing: (value: string) => {
      let candidateValue = Number.parseInt(value);
      if (Number.isNaN(candidateValue)) {
        candidateValue = 0;
      }
      return candidateValue.toString();
    },
    tooltipProcessing: (value: string) => {
      let number = Number.parseInt(value);
      return secondsToString(number);
    },
  },
};

export default function SystemSettingsEntry({
  title,
  value,
  description,
  settingKey,
  id,
}: {
  settingKey: string;
  id: string;
  title: string;
  value: string;
  description: string;
}) {
  const [defaultValue, setDefaultValue] = useState(value);
  const [currentValue, setValue] = useState(value);
  const [pending, setPending] = useState(false);
  return (
    <div className="flex">
      <div className="flex flex-1/2 flex-col gap-4">
        <span className="font-bold text-xl">{title}</span>
        <span className="text-lg opacity-50">{description}</span>
      </div>
      <div className="flex gap-2 flex-col flex-1/2 items-center justify-center">
        <div className="flex gap-4">
          <input
            value={currentValue}
            onChange={(e) => {
              setValue(
                hints[settingKey]?.inputProcessing
                  ? hints[settingKey].inputProcessing(e.target.value)
                  : e.target.value
              );
            }}
            type="text"
            className="bg-slate-100 dark:bg-slate-800 dark:border-slate-700 font-bold text-xl px-4 py-2 rounded-xl border border-slate-300"
          ></input>
          <AnimatePresence>
            {defaultValue != currentValue && (
              <motion.div
                initial={{ opacity: 0, translateX: -10 }}
                animate={{ opacity: 1, translateX: 0 }}
                exit={{ opacity: 0, translateX: -10 }}
                className="flex gap-2"
              >
                <button
                  onClick={() => {
                    setPending(true);
                    updateSystemSetting(id, currentValue).then((result) => {
                      setPending(false);
                      if (result) {
                        setDefaultValue(currentValue);
                      }
                    });
                  }}
                  disabled={pending}
                  className="flex items-center gap-2 duration-200 dark:bg-brand-green-600 cursor-pointer bg-brand-blue-500 text-white border-brand-blue-700  dark:text-white px-4 rounded-lg font-bold border dark:border-brand-green-400 hover:bg-brand-blue-600 dark:hover:bg-brand-green-500"
                >
                  <PendingSubmitFormButton
                    pending={pending}
                    text="Update"
                    loadingText="Updating"
                  ></PendingSubmitFormButton>
                </button>
                <button
                  className="transition-all duration-200 dark:bg-slate-700 cursor-pointer bg-slate-400 text-white border-slate-600  dark:text-white px-4 rounded-lg font-bold border dark:border-slate-500 hover:bg-slate-500 dark:hover:bg-slate-600"
                  onClick={() => setValue(value)}
                >
                  Discard
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <span className="opacity-50">
          Posts will expire in{" "}
          {hints[settingKey]?.tooltipProcessing
            ? hints[settingKey].tooltipProcessing(currentValue)
            : ""}
        </span>
      </div>
    </div>
  );
}
