"use client";
import { useState, useEffect } from "react";
import supabase from "@/lib/modules/supabase.client";
import DocumentItem from "./DocumentItem";

interface DocumentListProps {
  documents: any[];
}

export default function DocumentList({ documents }: DocumentListProps) {
  if (documents.length === 0) {
    return null; // Let the parent handle empty states
  }

  return (
    <div className="space-y-4">
      {documents.map((doc, index) => (
        <DocumentItem key={doc.id || index} doc={doc} />
      ))}
    </div>
  );
}