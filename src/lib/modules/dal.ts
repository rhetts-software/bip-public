"use server";
import "server-only";
import supabase from "./supabase.client";
import { cache } from "react";
import { createClient } from "./supabase.server";
import { equal } from "assert";
import { redirect } from "next/navigation";
import { verify } from "crypto";
import { Tables } from "./supabase.types";
import { User } from "@supabase/supabase-js";
import { Bucket, UserType } from "./types";
import { censorInput } from "./utils";
import {
  AddAnnouncementFormSchema,
  AddAnnouncementFormState,
  AddDocumentFormSchema,
  AddDocumentFormState,
  AddCensorSchema,
  CommentFormSchema,
  CommentFormState,
  EditProfileFormSchema,
  EditProfileFormState,
  AddFAQFormSchema,
  AddFAQFormState,
  AddPostFormState,
  AddCensorFormState,
  AddPostFormSchema,
  EditPostFormSchema,
  EditPostFormState,
  ReportPostFormState,
  ReportPostFormSchema,
  EditAnnouncementFormSchema,
  EditAnnouncementFormState,
  EditDocumentFormState,
  EditDocumentFormSchema,
  EditFAQFormSchema,
  AddCustomPostFormState,
  AddCustomPostFormSchema,
} from "./forms";
import z from "zod/v4";
import { tree } from "next/dist/build/templates/app-page";
import { revalidatePath } from "next/cache";

//Write your database queries here. Always call verifySession and check for user session before confirming the query.

/*EXAMPLE SYNTAX
 *
 *export async function getForumPOsts() {
 *  if (await verifySession()) {
 *   //query here
 *  }
 *}
 */
const bucket = "documents"; // only for document uploads
export const verifySession = cache(async () => {
  const supabase = await createClient();
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error || !session) {
    return null;
  }

  return session;
});

export async function checkUserRole() {
  const supabase = await createClient();
  if (await verifySession()) {
    const { data, error } = await supabase
      .from("user_roles")
      .select("role")
      .filter("user_id", "eq", (await getUser())?.id)
      .maybeSingle();
    if (!error && data) {
      switch (data.role) {
        case "admin":
          return UserType.ADMIN;
        case "official":
          return UserType.OFFICIAL;
        case "constituent":
          return UserType.CONSTITUENT;
        default:
          return UserType.CONSTITUENT;
      }
    }
  }
  return UserType.CONSTITUENT;
}
export async function getUser() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (!error && data) {
    return data.user;
  }
  return null;
}
export async function getNavigation() {
  const supabase = await createClient();
  if (await verifySession()) {
    const { data, error } = await supabase
      .from("navigation_links")
      .select(
        `
        *
        `
      )
      .order("position", { ascending: true });
    if (!error) {
      return data;
    }
  }
  return [];
}

export async function getProfile(): Promise<Tables<"profiles"> | null> {
  const supabase = await createClient();
  if (await verifySession()) {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .filter("user_id", "eq", (await getUser())?.id)
      .maybeSingle();
    if (!error && data) {
      return data;
    }
  }
  return null;
}
export async function getUserAndBasicProfile(): Promise<
  | {
      user: User;
      profile: {
        avatar: string;
        first_name: string;
        middle_name: string;
        last_name: string;
      };
    }
  | null
  | undefined
> {
  const supabase = await createClient();
  const user = await getUser();
  if (user) {
    const { data, error } = await supabase
      .from("profiles")
      .select(
        `
        avatar,
        first_name,
        middle_name,
        last_name
        `
      )
      .filter("user_id", "eq", user.id)
      .maybeSingle();
    if (!error && data) {
      return { user: user, profile: data };
    }
  }
}
export async function getUserAndFullProfile(): Promise<
  | {
      user: User;
      profile: any;
    }
  | null
  | undefined
> {
  const supabase = await createClient();
  const user = await getUser();
  if (user) {
    const { data, error } = await supabase
      .from("profiles")
      .select(
        `
        *,
        role:user_roles(
        *
        )
        `
      )
      .filter("user_id", "eq", user.id)
      .maybeSingle();
    if (!error && data) {
      return { user: user, profile: data };
    }
  }
}
export async function uploadAsUser(file: File, bucket: Bucket, metadata?: {}) {
  const supabase = await createClient();
  const user = (await supabase.auth.getUser()).data.user;
  if (!user) throw new Error("Not logged in");

  const ext = file.name.split(".").pop();
  const fileName = `${crypto.randomUUID()}.${ext}`;
  const filePath = `${fileName}`;

  const { error } = await supabase.storage.from(bucket).upload(filePath, file, {
    metadata: {
      user_id: user.id,
      ...metadata,
    },
  });

  if (error) throw error;

  const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);

  return {
    url: data.publicUrl,
    name: file.name,
    size: file.size,
    uploadedAt: new Date(),
    userId: user.id,
  };
}
export async function modifyUserProfile(
  state: EditProfileFormState,
  formData: FormData
) {
  const raw = Object.fromEntries(formData.entries());

  const validatedFields = EditProfileFormSchema.safeParse({
    firstName: formData.get("firstName"),
    middleName: formData.get("middleName"),
    lastName: formData.get("lastName"),
    address: formData.get("address"),
    birthPlace: formData.get("birthPlace"),
    birthDate: formData.get("birthDate"),
  });

  if (!validatedFields.success) {
    return { errors: z.treeifyError(validatedFields.error), values: raw };
  }
  const user = await getUser();
  if (user) {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("profiles")
      .update({
        first_name: validatedFields.data.firstName,
        middle_name: validatedFields.data.middleName,
        last_name: validatedFields.data.lastName,
        address: validatedFields.data.address,
        birth_place: validatedFields.data.birthPlace,
        birth_date: validatedFields.data.birthDate,
      })
      .eq(`user_id`, user.id);

    if (!error) {
      return { success: true, values: raw };
    }
  }
}
export async function getForumPostHistory() {
  const supabase = await createClient();
  const user = await getUser();
  if (user) {
    const { data, error } = await supabase
      .from("forum_posts")
      .select(
        `
        *,
        profile:profiles(
          first_name,
          middle_name,
          last_name,
          avatar
        )
        `
      )
      .filter("user_id", "eq", user.id)
      .order("created_at", { ascending: false });
    if (!error) {
      return data;
    }
  }
  return [];
}
export async function grantVerification(userId: string) {
  const user = await getUser();
  const supabase = await createClient();
  if (user) {
    const { error } = await supabase
      .from("user_roles")
      .update({ verified: true })
      .eq("user_id", userId);
    if (!error) {
      return true;
    }
  }
  return false;
}
export async function revokeVerification(userId: string) {
  const user = await getUser();
  const supabase = await createClient();
  if (user) {
    const { error } = await supabase
      .from("user_roles")
      .update({ verified: false })
      .eq("user_id", userId);
    if (!error) {
      return true;
    }
  }
  return false;
}
export async function getPost(postId: string) {
  const supabase = await createClient();
  if (await verifySession()) {
    const { data, error } = await supabase
      .from("forum_posts_summary")
      .select(
        `
        *
        `
      )
      .filter("id", "eq", postId)
      .maybeSingle();
    if (!error && data) {
      return data;
    }
  }

  return null;
}
export async function getAnnouncement(announcementId: string) {
  const supabase = await createClient();
  if (await verifySession()) {
    const { data, error } = await supabase
      .from("announcements")
      .select(
        `
        *,
        profile:profiles(
          first_name,
          middle_name,
          last_name,
          avatar
        )
        `
      )
      .filter("id", "eq", announcementId)
      .maybeSingle();
    if (!error && data) {
      return data;
    }
  }

  return null;
}

export async function postComment(state: CommentFormState, formData: FormData) {
  const validatedFields = CommentFormSchema.safeParse({
    content: formData.get("content"),
  });

  if (!validatedFields.success) {
    return {
      errors: z.treeifyError(validatedFields.error),
      values: Object.fromEntries(formData.entries()),
    };
  }
  const user = await getUser();
  if (user) {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("forum_comments")
      .insert({
        content: await censorInput(validatedFields.data.content),
        user_id: user.id,
        post_id: formData.get("postId"),
      })
      .select(
        `
        *,
        profile:profiles(
          first_name,
          middle_name,
          last_name,
          avatar
        )
        `
      )
      .single();

    if (!error && data) {
      return {
        success: true,
        values: Object.fromEntries(formData.entries()),
        posted: {
          ...data,
          first_name: data.profile.first_name,
          middle_name: data.profile.middle_name,
          last_name: data.profile.last_name,
          avatar: data.profile.avatar,
        },
      };
    }
  }
}
export async function postReply(state: CommentFormState, formData: FormData) {
  const validatedFields = CommentFormSchema.safeParse({
    content: formData.get("content"),
  });

  if (!validatedFields.success) {
    return {
      errors: z.treeifyError(validatedFields.error),
      values: Object.fromEntries(formData.entries()),
    };
  }
  const user = await getUser();
  if (user) {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("forum_comments")
      .insert({
        content: validatedFields.data.content,
        user_id: user.id,
        post_id: formData.get("postId"),
        parent_id: formData.get("commentId"),
      })
      .select(
        `
        *,
        profile:profiles(
          first_name,
          middle_name,
          last_name,
          avatar
        )
        `
      )
      .single();

    if (!error && data) {
      return {
        success: true,
        values: Object.fromEntries(formData.entries()),
        posted: {
          ...data,
          first_name: data.profile.first_name,
          middle_name: data.profile.middle_name,
          last_name: data.profile.last_name,
          avatar: data.profile.avatar,
        },
      };
    }
  }
}

export default async function getPostComments(postId: string) {
  const supabase = await createClient();
  if (await verifySession()) {
    const { data, error } = await supabase
      .from("forum_comments_summary")
      .select(
        `
        *
        `
      )
      .filter("post_id", "eq", postId)
      .is("parent_id", null)
      .order("created_at", { ascending: false });

    if (!error && data) {
      return data;
    }
  }
  return [];
}
export async function getReplies(postId: string, commentId: string) {
  const supabase = await createClient();
  if (await verifySession()) {
    const { data, error } = await supabase
      .from("forum_comments_summary")
      .select(
        `
        *
        `
      )
      .filter("post_id", "eq", postId)
      .eq("parent_id", commentId)
      .order("created_at", { ascending: false });
    console.log(error, data);
    if (!error && data) {
      return data;
    }
  }
  return [];
}

export async function getAllUsers() {
  const supabase = await createClient();
  const role = await checkUserRole();
  if (role == UserType.OFFICIAL || role == UserType.ADMIN) {
    const { data, error } = await supabase
      .from("user_roles")
      .select(
        `
      user_id,
      role,
      verified,
      profile:profiles(
        avatar,
        first_name,
        middle_name,
        last_name,
        birth_place,
        birth_date,
        address,
        position,
        last_sign_in_at
      )
      `
      )

      .order("user_id", { ascending: true })
      .neq("role", "admin")
      .neq("user_id", (await getUser())?.id);

    if (!error) {
      return data;
    }
  }
  return [];
}
export async function getUsers(userType: string) {
  const supabase = await createClient();
  if (await verifySession()) {
    const { data, error } = await supabase
      .from("user_roles")
      .select(
        `
      user_id,
      role,
      verified,
      profile:profiles(
        avatar,
        first_name,
        middle_name,
        last_name,
        birth_place,
        birth_date,
        address,
        position,
        last_sign_in_at
      )
      `
      )
      .filter("role", "eq", userType)
      .order("user_id", { ascending: true })
      .neq("role", "admin")
      .neq("user_id", (await getUser())?.id);
    if (!error) {
      return data;
    }
  }
  return [];
}
export async function getAnnouncements() {
  const supabase = await createClient();
  if (await verifySession()) {
    const { data, error } = await supabase
      .from("announcements")
      .select(
        `
      *,
      profile:profiles(
      first_name,
      middle_name,
      last_name,
      avatar
      )
      `
      )
      .order("created_at", { ascending: false });
    if (!error && data) {
      return data;
    }
  }
  return [];
}
export async function getAudit() {
  const supabase = await createClient();
  if (await verifySession()) {
    const { data, error } = await supabase
      .from("audit")
      .select(
        `
      *,
      profile:profiles(
      avatar,
      first_name,
      middle_name,
      last_name
      )
      `
      )
      .order("created_at", { ascending: false });
    if (!error && data) {
      return data;
    }
  }
  return [];
}

export async function fetchAnnouncements() {
  const supabase = await createClient();
  const now = new Date().toISOString();
  const { data, error } = await supabase
    .from("announcements")
    .select("*")
    .or(`scheduled_at.is.null,scheduled_at.lte.${now}`)
    .or(`expiry_date.is.null,expiry_date.gte.${now}`)
    .order("pinned", { ascending: false })
    .order("priority", { ascending: false })
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data || [];
}

export async function fetchForumPosts(showArchived = false) {
  const supabase = await createClient();
  const expirySeconds = await getSystemSettingValue("1");
  const { data, error } = await supabase
    .from("forum_posts_summary")
    .select("*, profile:profiles(first_name, middle_name, last_name, avatar)")
    .order("created_at", { ascending: false });
  if (error) throw error;
  if (showArchived) {
    return (
      data.map((post) => {
        return {
          ...post,
          archived:
            new Date(post.created_at) <
            new Date(Date.now() - expirySeconds * 1000),
        };
      }) || []
    );
  } else {
    return (
      data.filter((post) => {
        return !(
          new Date(post.created_at) <
          new Date(Date.now() - expirySeconds * 1000)
        );
      }) || []
    );
  }
}

export async function getFAQs() {
  const supabase = await createClient();
  if (await verifySession()) {
    const { data, error } = await supabase.from("faq_categories").select(`
        *,
        entries:faq_entries(
        *
        )
        `);

    if (!error && data) {
      return data;
    }
  }
  return [];
}
export async function getFAQCategories() {
  const supabase = await createClient();
  if (await verifySession()) {
    const { data, error } = await supabase
      .from("faq_categories")
      .select(`name, id`);
    if (!error && data) {
      return data;
    }
  }
  return [];
}

export const getDocuments = async () => {
  const supabase = await createClient();

  if (await verifySession()) {
    const { data, error } = await supabase
      .from("uploads")
      .select("*")
      .order("uploaded_at", { ascending: false });
    if (!error) {
      return data;
    }
  }
  return [];
};

export async function addAnnouncement(
  state: AddAnnouncementFormState,
  formData: FormData
) {
  const raw = Object.fromEntries(formData.entries());

  const validatedFields = AddAnnouncementFormSchema.safeParse({
    title: formData.get("title"),
    content: formData.get("content"),
    banner: formData.get("banner"),
    expiry: formData.get("expiry"),
    priority: formData.get("priority"),
    pinned: formData.get("pinned") == "on" ? true : false,
    scheduleAt: formData.get("scheduleAt") ? formData.get("scheduleAt") : "",
  });

  if (!validatedFields.success) {
    console.log(validatedFields);
    return { errors: z.treeifyError(validatedFields.error), values: raw };
  }
  const supabase = await createClient();

  if (await verifySession()) {
    const { data, error } = await supabase
      .from("announcements")
      .insert({
        title: validatedFields.data.title,
        content: validatedFields.data.content,
        priority: validatedFields.data.priority,
        expiry_date: validatedFields.data.expiry
          ? new Date(validatedFields.data.expiry)
          : null,
        posted_by: (await getUser())?.id,
        pinned: validatedFields.data.pinned,
        scheduled_at: validatedFields.data.scheduleAt
          ? new Date(validatedFields.data.scheduleAt)
          : null,
      })
      .select("id")
      .single();

    if (
      !error &&
      validatedFields.data.banner?.size &&
      validatedFields.data.banner.size > 0
    ) {
      //upload banner image
      await uploadAsUser(validatedFields.data.banner, "banners", {
        row_id: data.id,
      });
    }

    if (!error) {
      return { success: true };
    }
  }
}

export async function addCensorWord(
  state: AddCensorFormState,
  formData: FormData
) {
  const raw = Object.fromEntries(formData.entries());

  // Get current user
  const user = await getUser();

  // Parse and coerce severity to number
  const validatedFields = AddCensorSchema.safeParse({
    word: formData.get("word"),
    category: formData.get("category"),
    severity: Number(formData.get("severity")),
    added_by: user?.id, // Use current user id
  });

  if (!validatedFields.success) {
    return {
      errors: {
        properties: z.treeifyError(validatedFields.error).properties,
      },
      values: raw,
    };
  }

  const supabase = await createClient();

  if (!(await verifySession())) {
    return {
      errors: { properties: { word: { errors: ["Not authenticated"] } } },
      values: raw,
    };
  }

  const { error } = await supabase.from("censor_words").insert({
    word: validatedFields.data.word,
    category: validatedFields.data.category,
    severity: validatedFields.data.severity,
    added_by: validatedFields.data.added_by,
    created_at: new Date().toISOString(),
  });

  if (error) {
    return {
      errors: {
        properties: {
          word: { errors: [error.message] },
        },
      },
      values: raw,
    };
  }

  return { success: true, values: {} };
}

export async function addDocument(
  state: AddDocumentFormState,
  formData: FormData
) {
  const raw = Object.fromEntries(formData.entries());

  const validatedFields = AddDocumentFormSchema.safeParse({
    file: formData.get("file"),
    display_name: formData.get("display_name"),
    category: formData.get("category"),
    tags: formData.getAll("tags"),
  });

  if (!validatedFields.success) {
    return {
      errors: z.treeifyError(validatedFields.error),
      values: raw,
    };
  }

  const supabase = await createClient();

  const file = validatedFields.data.file as File;
  const filePath = `${file.name}`;
  const bucket = "documents";

  if (await verifySession()) {
    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        metadata: {
          display_name: validatedFields.data.display_name,
        },
      });

    if (uploadError) {
      return { success: false, error: "File upload failed." };
    }
  }

  return { success: true };
}
export async function editDocument(
  state: EditDocumentFormState,
  formData: FormData
) {
  const raw = Object.fromEntries(formData.entries());

  const validatedFields = EditDocumentFormSchema.safeParse({
    id: formData.get("id"),
    display_name: formData.get("display_name"),
    category: formData.get("category"),
    tags: formData.getAll("tags"),
  });

  if (!validatedFields.success) {
    return { errors: z.treeifyError(validatedFields.error), values: raw };
  }

  const supabase = await createClient();
  if (await verifySession()) {
    const { error } = await supabase
      .from("uploads")
      .update({
        display_name: validatedFields.data.display_name,
        category: validatedFields.data.category,
      })
      .eq("id", validatedFields.data.id);

    if (error) {
      return { success: false, error: "Updating metadata failed." };
    }
  }

  return { success: true, values: raw };
}

export async function addForumPost(_state: any, formData: FormData) {
  const validatedFields = AddPostFormSchema.safeParse({
    title: await censorInput(String(formData.get("title") ?? "")),
    content: await censorInput(String(formData.get("content") ?? "")),
  });

  if (!validatedFields.success) {
    const flat = validatedFields.error.flatten().fieldErrors;

    return {
      errors: {
        title: { _errors: flat.title || [] },
        content: { _errors: flat.content || [] },
      },
    };
  }

  const supabase = await createClient();
  if (!(await verifySession())) return { error: "Not authenticated" };

  const { data, error } = await supabase
    .from("forum_posts")
    .insert({
      user_id: (await getUser())?.id,
      title: validatedFields.data.title,
      content: validatedFields.data.content,
    })
    .select(
      `
      *,
      profile:profiles(
      *
      )
      `
    )
    .single();

  if (error) {
    return { error: error.message };
  }
  return { posted: data };
}
export async function editForumPost(
  state: EditPostFormState,
  formData: FormData
) {
  const validatedFields = EditPostFormSchema.safeParse({
    id: formData.get("id"),
    title: formData.get("title"),
    content: formData.get("content"),
  });

  if (!validatedFields.success) {
    return { errors: z.treeifyError(validatedFields.error) };
  }

  const supabase = await createClient();
  if (!(await verifySession())) return { error: "Not authenticated" };

  const { data, error } = await supabase
    .from("forum_posts")
    .update({
      title: validatedFields.data.title,
      content: validatedFields.data.content,
    })
    .eq(`id`, validatedFields.data.id)
    .select(
      `
      *,
      profile:profiles(
      *
      )
      `
    )
    .single();

  if (error) {
    return { error: error.message };
  }
  return { posted: data };
}

export async function addFAQ(
  state: AddFAQFormState,
  formData: FormData
): Promise<AddFAQFormState> {
  const raw = Object.fromEntries(formData.entries());

  const validatedFields = AddFAQFormSchema.safeParse({
    question: formData.get("question"),
    answer: formData.get("answer"),
    category: formData.get("category"),
  });

  if (!validatedFields.success) {
    const fieldErrors = z.treeifyError(validatedFields.error);
    return {
      success: false,
      errors: {
        properties: fieldErrors.properties,
      },
      values: raw,
    };
  }

  const supabase = await createClient();
  const user = await getUser();

  const { error } = await supabase.from("faq_entries").insert({
    question: validatedFields.data.question,
    answer: validatedFields.data.answer,
    category_id: validatedFields.data.category,
    //created_by: user?.id,
  });

  if (error) {
    return {
      success: false,
      errors: {
        properties: {
          question: { errors: [] },
          answer: { errors: [] },
          category: { errors: [] },
        },
        // or just leave `properties` undefined
      },
      values: raw,
    };
  }

  return {
    success: true,
    errors: undefined,
    values: {},
  };
}

export async function deleteDocument(
  bucket: string,
  filePath: string,
  rowId: string
) {
  const supabase = await createClient();

  // Delete from storage
  const { error: storageError } = await supabase.storage
    .from(bucket)
    .remove([filePath]);
  if (storageError)
    throw new Error("Failed to delete from storage: " + storageError.message);

  // Delete from database
  const { error: dbError } = await supabase
    .from("uploads")
    .delete()
    .eq("id", rowId);
  if (dbError)
    throw new Error(
      "Failed to delete from database: " + dbError.message + rowId
    );
}
export async function deletePost(postId: string) {
  const supabase = await createClient();
  if (await verifySession()) {
    const { error } = await supabase
      .from("forum_posts")
      .delete()
      .eq("id", postId);
  }
}
export async function reportPost(
  state: ReportPostFormState,
  formData: FormData
) {
  const validatedFields = ReportPostFormSchema.safeParse({
    id: formData.get("id"),
    category: formData.get("category"),
    reason: formData.get("reason"),
  });
  if (!validatedFields.success) {
    return { errors: z.treeifyError(validatedFields.error) };
  }

  const supabase = await createClient();
  if (!(await verifySession())) return { error: "Not authenticated" };

  const { error } = await supabase.from("forum_posts_reports").insert({
    user_id: (await getUser())?.id,
    post_id: validatedFields.data.id,
    category: validatedFields.data.category,
    reason: validatedFields.data.reason,
  });

  if (!error) {
    return { success: true };
  }
}

export async function getReports() {
  const supabase = await createClient();
  if (await verifySession()) {
    const { data, error } = await supabase
      .from("forum_posts_reports")
      .select(
        `
      *,
      profile:profiles(
      avatar,
      first_name,
      middle_name,
      last_name
      ),
      post:forum_posts(
      *
      )
      `
      )
      .order("created_at", { ascending: false });
    if (!error && data) {
      return data;
    }
  }
  return [];
}

export async function deleteAnnouncement(id: string) {
  const supabase = await createClient();
  if (await verifySession()) {
    const { error } = await supabase
      .from("announcements")
      .delete()
      .eq("id", id);
  }
}
export async function editAnnouncement(
  state: EditAnnouncementFormState,
  formData: FormData
) {
  const raw = Object.fromEntries(formData.entries());

  const validatedFields = EditAnnouncementFormSchema.safeParse({
    id: formData.get("id"),
    title: formData.get("title"),
    content: formData.get("content"),
    banner: formData.get("banner"),
    expiry: formData.get("expiry"),
    priority: formData.get("priority"),
    pinned: formData.get("pinned") == "on" ? true : false,
  });

  if (!validatedFields.success) {
    console.log("Validation failed:", validatedFields.error);
    return { errors: z.treeifyError(validatedFields.error), values: raw };
  }
  const supabase = await createClient();
  //update announcement
  const { data, error } = await supabase
    .from("announcements")
    .update({
      title: validatedFields.data.title,
      content: validatedFields.data.content,
      priority: validatedFields.data.priority,
      expiry_date: validatedFields.data.expiry,
      posted_by: (await getUser())?.id,
      pinned: validatedFields.data.pinned,
    })
    .eq("id", validatedFields.data.id)
    .select("id")
    .single();

  if (
    !error &&
    validatedFields.data.banner?.size &&
    validatedFields.data.banner.size > 0
  ) {
    //upload banner image
    await uploadAsUser(validatedFields.data.banner, "banners", {
      row_id: data.id,
      scheduled: false,
    });
  }

  if (!error) {
    return { success: true };
  }
}
// Delete FAQ by id
export async function deleteFAQ(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("faq_entries").delete().eq("id", id);
  if (error) {
    return { error: error.message };
  }
  return { success: true };
}

// Edit FAQ using form data and validation
export async function editFAQ(prevState: any, formData: FormData) {
  const raw = Object.fromEntries(formData.entries());
  const validatedFields = EditFAQFormSchema.safeParse({
    id: formData.get("id"),
    question: formData.get("question"),
    answer: formData.get("answer"),
    category: formData.get("category"),
  });

  if (!validatedFields.success) {
    return { errors: z.treeifyError(validatedFields.error), values: raw };
  }

  const { id, question, answer, category } = validatedFields.data;
  const supabase = await createClient();
  if (await verifySession()) {
    const { error } = await supabase
      .from("faq_entries")
      .update({
        question,
        answer,
        category_id: Number(category),
      })
      .eq("id", id);

    if (error) {
      return {
        success: false,

        values: raw,
      };
    }
  }

  return { success: true };
}

export async function getDeletedAnnouncements() {
  const supabase = await createClient();
  if (await verifySession()) {
    const { data, error } = await supabase
      .from("deleted_announcements")
      .select(
        `
        *,
        profile:profiles!deleted_announcements_posted_by_fkey(
          first_name, middle_name, last_name, avatar
        ),
        deleted_profile:profiles!deleted_announcements_deleted_by_fkey(
          first_name, middle_name, last_name, avatar
        )
      `
      )
      .order("deleted_at", { ascending: false });
    if (!error && data) return data;
  }
  return [];
}

export async function getDeletedPosts() {
  const supabase = await createClient();
  if (await verifySession()) {
    const { data, error } = await supabase
      .from("deleted_posts")
      .select(
        `
        *,
        postedBy:profiles!deleted_posts_user_id_fkey(user_id, first_name, middle_name, last_name, avatar),
        deletedBy:profiles!deleted_posts_deleted_by_fkey(user_id, first_name, middle_name, last_name, avatar)
      `
      )
      .order("deleted_at", { ascending: false });
    console.log(data);
    if (!error && data) return data;
  }
  return [];
}

export async function permanentlyDeleteAnnouncement(id: string) {
  const supabase = await createClient();
  if (await verifySession()) {
    await supabase.from("deleted_announcements").delete().eq("id", id);
  }
}

export async function permanentlyDeletePost(id: string) {
  const supabase = await createClient();
  if (await verifySession()) {
    await supabase.from("deleted_posts").delete().eq("id", id);
  }
}

//resoration

export async function restoreAnnouncement(item: any) {
  const supabase = await createClient();
  if (await verifySession()) {
    await supabase.from("announcements").insert({
      id: item.original_id,
      title: item.title,
      content: item.content,
      posted_by: item.posted_by,
      created_at: item.original_created_at,
      expiry_date: item.expiry_date,
      priority: item.priority,
      pinned: item.pinned,
    });
    await supabase.from("deleted_announcements").delete().eq("id", item.id);
  }
}

export async function restorePost(item: any) {
  const supabase = await createClient();
  if (await verifySession()) {
    await supabase.from("forum_posts").insert({
      id: item.id,
      title: item.title,
      content: item.content,
      user_id: item.user_id,
      created_at: item.original_created_at || item.created_at,
    });
    await supabase.from("deleted_posts").delete().eq("id", item.id);
  }
}

// Add or update a reaction
export async function reactToPost(
  post_id: string,
  reaction_type: "like" | "dislike"
) {
  const user = await getUser();
  if (user) {
    return await supabase.from("forum_post_reactions").upsert(
      { post_id: post_id, user_id: user.id, reaction_type: reaction_type },
      {
        onConflict: "post_id, user_id",
      }
    );
  }
}

// Remove a reaction
export async function removePostReaction(post_id: string) {
  const user = await getUser();
  if (user) {
    return await supabase
      .from("forum_post_reactions")
      .delete()
      .eq("post_id", post_id)
      .eq("user_id", user.id);
  }
}

// Get current user's reaction for a post
export async function getUserPostReaction(post_id: string) {
  const user = await getUser();
  if (user) {
    const { data, error } = await supabase
      .from("forum_post_reactions")
      .select("reaction_type")
      .eq("post_id", post_id)
      .eq("user_id", user.id)
      .single();

    return data?.reaction_type;
  }
}
export async function reactToComment(
  comment_id: string,
  reaction_type: "like" | "dislike"
) {
  const user = await getUser();
  if (user) {
    return await supabase.from("forum_comment_reactions").upsert(
      {
        comment_id: comment_id,
        user_id: user.id,
        reaction_type: reaction_type,
      },
      {
        onConflict: "comment_id, user_id",
      }
    );
  }
}

// Remove a reaction
export async function removeCommentReaction(comment_id: string) {
  const user = await getUser();
  if (user) {
    return await supabase
      .from("forum_comment_reactions")
      .delete()
      .eq("comment_id", comment_id)
      .eq("user_id", user.id);
  }
}

// Get current user's reaction for a post
export async function getUserCommentReaction(comment_id: string) {
  const user = await getUser();
  if (user) {
    const { data } = await supabase
      .from("forum_comment_reactions")
      .select("reaction_type")
      .eq("comment_id", comment_id)
      .eq("user_id", user.id)
      .single();
    return data?.reaction_type;
  }
}

// export async function addCensorWord(word: string) {
//   const supabase = await createClient();
//   if (await verifySession()) {
//     const { data, error } = await supabase
//       .from("system_settings_categories")
//       .select("title, settings:system_settings(*)")
//       .order("position", { ascending: true });
//     if (!error && data) {
//       return data;
//     }
//   }
//   return [];
// }
export async function updateSystemSetting(id: string, value: string) {
  const supabase = await createClient();
  if (await verifySession()) {
    const { error } = await supabase
      .from("system_settings")
      .update({ value })
      .eq("id", id);
    if (!error) {
      return true;
    }
  }
  return false;
}
export async function getSystemSettingValue(id: string) {
  const supabase = await createClient();
  if (await verifySession()) {
    const { data, error } = await supabase
      .from("system_settings")
      .select("value")
      .eq("id", id)
      .single();
    if (!error && data) {
      return data.value;
    }
  }
  return null;
}
export async function addCustomForumPost(_state: any, formData: FormData) {
  const validatedFields = AddCustomPostFormSchema.safeParse({
    createdAt: formData.get("createdAt"),
    title: await censorInput(String(formData.get("title") ?? "")),
    content: await censorInput(String(formData.get("content") ?? "")),
  });

  if (!validatedFields.success) {
    const flat = validatedFields.error.flatten().fieldErrors;

    return {
      errors: {
        createdAt: { _errors: flat.createdAt || [] },
        title: { _errors: flat.title || [] },
        content: { _errors: flat.content || [] },
      },
    };
  }

  const supabase = await createClient();
  if (!(await verifySession())) return { error: "Not authenticated" };

  const { data, error } = await supabase
    .from("forum_posts")
    .insert({
      user_id: (await getUser())?.id,
      created_at: validatedFields.data.createdAt
        ? new Date(validatedFields.data.createdAt)
        : new Date(),
      title: validatedFields.data.title,
      content: validatedFields.data.content,
    })
    .select(
      `
      *,
      profile:profiles(
      *
      )
      `
    )
    .single();

  if (error) {
    return { error: error.message };
  }
  return { posted: data };
}

export async function getCensored() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("censor_words")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching censored words:", error);
    return [];
  }
  return data || [];
}
export async function getSystemSettings() {
  const supabase = await createClient();
  if (await verifySession()) {
    const { data, error } = await supabase
      .from("system_settings_categories")
      .select("title, settings:system_settings(*)")
      .order("position", { ascending: true });
    if (!error && data) {
      return data;
    }
  }
  return [];
}
export async function reportError(name: string, message: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("errors")
    .insert({ name: name, message: message });
}
