"use client";
import Loading from "@/app/(proper)/loading";
import { useEffect, useState } from "react";
import { getFAQs } from "../modules/dal";

import DashboardFAQItem from "./DashboardFAQsItem";
import AddItemDialog from "./AddItemDialog";
import PanelTitle from "./PanelTitle";
import ViewAddButtons from "./ViewAddButtons";
import { motion } from "motion/react";

export default function DashboardFAQsPanel() {
  const [isLoading, setLoading] = useState(true);
  const [addDialogShown, setAddDialogShown] = useState(false);
  const [data, setData] = useState<any[]>([]);

  const loadData = () => {
    setLoading(true);
    getFAQs().then((result) => {
      setData(result);
      setLoading(false);
    });
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="relative flex flex-col h-full">
      <div className="flex w-full dark:bg-slate-900 border-b dark:border-slate-800 p-4 justify-between items-center gap-x-4">
        <PanelTitle>FAQs</PanelTitle>
        <ViewAddButtons
          onAdd={() => setAddDialogShown(true)}
          viewHref="/app/faqs"
        />
      </div>

      <div className="flex-col h-full flex overflow-y-auto scrollbar">
        <AddItemDialog
          onCancel={() => setAddDialogShown(false)}
          onSuccess={() => {
            loadData();
            setAddDialogShown(false);
          }}
          type="faq"
          shown={addDialogShown}
        />

        {isLoading && (
          <div className="flex items-center justify-center absolute w-full h-full z-50">
            <Loading />
          </div>
        )}

        <motion.div layout className="p-4 w-full h-full flex-col flex gap-4">
          {data.map((category: any) =>
            category.entries.map((faq: any) => (
              <motion.div layoutId={faq.id} key={faq.id}>
                <DashboardFAQItem
                  onReloadRequested={loadData}
                  id={faq.id}
                  question={faq.question}
                  answer={faq.answer}
                  categoryName={category.name}
                  icon={category.icon}
                />
              </motion.div>
            ))
          )}
        </motion.div>
      </div>
    </div>
  );
}
