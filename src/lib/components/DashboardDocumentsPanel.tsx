"use client";
import Loading from "@/app/(proper)/loading";
import { useEffect, useState, useCallback } from "react";
import { getDocuments } from "../modules/dal";
import DashboardDocumentItem from "./DashboardDocumentItem";
import AddItemDialog from "./AddItemDialog";
import ViewAddButtons from "./ViewAddButtons";
import PanelTitle from "./PanelTitle";
import { motion } from "motion/react";

export default function DashboardDocumentsPanel() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<any[]>([]);
  const [addDialogShown, setAddDialogShown] = useState(false);

  const loadData = useCallback(async () => {
    setLoading(true);
    getDocuments().then((result) => {
      setData(result || []);
      console.log("Documents loaded:", result);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <div className="relative flex flex-col h-full">
      <div className="flex w-full dark:bg-slate-900 border-b dark:border-slate-800 p-4 justify-between items-center gap-x-4">
        <PanelTitle>Documents</PanelTitle>
        <ViewAddButtons
          onAdd={() => setAddDialogShown(true)}
          viewHref="/app/documents"
        />
      </div>

      <div className="flex-col h-full flex overflow-y-auto scrollbar">
        <AddItemDialog
          onCancel={() => setAddDialogShown(false)}
          onSuccess={() => {
            loadData();
            setAddDialogShown(false);
          }}
          type="document"
          shown={addDialogShown}
        />

        {isLoading && (
          <div className="flex items-center justify-center absolute w-full h-full z-50">
            <Loading />
          </div>
        )}

        <motion.div layout className="p-4 w-full h-full flex-col flex gap-4">
          {data.map((item) => (
            <motion.div layoutId={item.id} key={item.id}>
              <DashboardDocumentItem
                onReloadRequested={loadData}
                id={item.id}
                name={item.name}
                displayName={item.display_name}
                size={item.size}
                bucket={item.bucket}
                filePath={item.publicUrl}
                createdAt={item.uploaded_at}
                updatedAt={item.updated_at}
                publicUrl={item.publicUrl}
                category={item.category}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
