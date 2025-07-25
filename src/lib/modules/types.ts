import { User } from "@supabase/supabase-js";
import { z } from "zod";

export enum UserType {
  "CONSTITUENT",
  "OFFICIAL",
  "ADMIN",
}
export type Bucket = "documents" | "avatars" | "user_uploads" | "banners";

export type AuditObject = {
  post: { title: string; id: string } | undefined;
  comment:
    | { content: string; post_id: string; id: string; post_title: string }
    | undefined;
};
export type AddForm = "announcement" | "document" | "faq" | "unknown";
export interface SystemSettingsGroupType {
  title: string;
  settings: {
    id: string;
    key: string;
    title: string;
    value: string;
    description: string;
  }[];
}
export type ReactionType = "like" | "dislike";
