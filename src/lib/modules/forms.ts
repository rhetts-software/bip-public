import z from "zod/v4";
import { UserType } from "./types";

const MAXIMUM_FILE_SIZE_BYTES = 25000000;
const MINIMUM_FILE_SIZE_BYTES = 1;

export const ReportPostFormSchema = z.object({
  id: z.string().min(1),
  category: z.string().trim().min(1, { message: "This field is required" }),
  reason: z.string().trim().min(1, { message: "This field is required" }),
});
export const EditPostFormSchema = z.object({
  id: z.string().min(1),
  title: z
    .string()
    .trim()
    .min(1, { message: "This field is required" })
    .max(100, { message: "Must be at most 100 characters long" }),
  content: z.string().trim().min(1, { message: "This field is required" }),
});
export const AddPostFormSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, { message: "This field is required" })
    .max(100, { message: "Must be at most 100 characters long" }),
  content: z.string().trim().min(1, { message: "This field is required" }),
});
export const AddCustomPostFormSchema = z.object({
  createdAt: z.string(),
  title: z
    .string()
    .trim()
    .min(1, { message: "This field is required" })
    .max(100, { message: "Must be at most 100 characters long" }),
  content: z.string().trim().min(1, { message: "This field is required" }),
});
export const AddFAQFormSchema = z.object({
  question: z
    .string()
    .trim()
    .min(1, { message: "This field is required" })
    .max(100, { message: "Must be at most 100 characters long" }),
  answer: z.string().trim().min(1, { message: "This field is required" }),
  category: z.string(),
});
export const EditFAQFormSchema = z.object({
  id: z.string().min(1),
  question: z
    .string()
    .trim()
    .min(1, { message: "This field is required" })
    .max(100, { message: "Must be at most 100 characters long" }),
  answer: z.string().min(1, { message: "This field is required" }).trim(),
  category: z.string(),
});
export const AddDocumentFormSchema = z.object({
  display_name: z
    .string()
    .trim()
    .max(100, { message: "Must be at most 100 characters long" }),
  file: z
    .file()
    .refine(
      (file) => file?.size >= MINIMUM_FILE_SIZE_BYTES,
      `File is too small.`
    )
    .refine(
      (file) => file?.size <= MAXIMUM_FILE_SIZE_BYTES,
      `File is too large (>25mb).`
    ),
  category: z.string().min(1, "Category is required"),
  tags: z.array(z.string()).optional(),
});

export const AddCensorSchema = z.object({
  word: z
    .string()
    .trim()
    .min(1, { message: "Word is required" })
    .max(100, { message: "Must be at most 100 characters long" }),
  category: z
    .string()
    .trim()
    .min(1, { message: "Category is required" }),
  severity: z
    .number()
    .min(1, { message: "Severity must be at least 1" })
    .max(5, { message: "Severity must be at most 5" }),
  added_by: z
    .string()
    .trim()
    .min(1, { message: "Added by is required" }),
});

export const EditDocumentFormSchema = z.object({
  id: z.string().min(1),
  display_name: z
    .string()
    .trim()
    .min(1, { message: "This field is required" })
    .max(100, { message: "Must be at most 100 characters long" }),
  category: z.string(),
});
export const EditAnnouncementFormSchema = z.object({
  id: z.string().min(1),
  title: z
    .string()
    .trim()
    .min(1, { message: "This field is required" })
    .max(100, { message: "Must be at most 100 characters long" }),
  content: z.string().trim().min(1, { message: "This field is required" }),
  banner: z
    .file()
    .optional()
    .refine(
      (file) => (file?.size ? file.size : 0) <= MAXIMUM_FILE_SIZE_BYTES,
      `File is too large (>25mb).`
    ),
  expiry: z
    .string()
    .transform((val) => (val === "" ? undefined : val))
    .optional()
    .refine(
      (val) => {
        if (val === undefined) return true;
        const date = new Date(val);
        return !isNaN(date.getTime()) && date.getTime() > Date.now();
      },
      { message: "Expiry must be a valid future date" }
    ),
  priority: z.coerce.number(),
  pinned: z.boolean(),
});
export const AddAnnouncementFormSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, { message: "This field is required" })
    .max(100, { message: "Must be at most 100 characters long" }),
  content: z.string().trim().min(1, { message: "This field is required" }),
  banner: z
    .file()
    .optional()
    .refine(
      (file) => (file?.size ? file.size : 0) <= MAXIMUM_FILE_SIZE_BYTES,
      `File is too large (>25mb).`
    ),
  expiry: z
    .string()
    .transform((val) => (val === "" ? undefined : val))
    .optional()
    .refine(
      (val) => {
        if (val === undefined) return true;
        const date = new Date(val);
        return !isNaN(date.getTime()) && date.getTime() > Date.now();
      },
      { message: "Expiry must be a valid future date" }
    ),
  scheduleAt: z
    .string()
    .transform((val) => (val === "" || val === null ? undefined : val))
    .optional()
    .refine(
      (val) => {
        if (val === undefined || null) return true;
        const date = new Date(val);
        return !isNaN(date.getTime()) && date.getTime() > Date.now();
      },
      { message: "Scheduled time must be a valid future date" }
    ),
  priority: z.coerce.number(),
  pinned: z.boolean(),
});

export type ReportPostFormState =
  | {
      success?: boolean;
      errors?: {
        properties?: {
          id?: { errors?: string[] };
          category?: { errors?: string[] };
          reason?: { errors?: string[] };
        };
      };
      values?: {
        [k: string]: FormDataEntryValue;
      };
    }
  | undefined;

export type AddFAQFormState =
  | {
      success?: boolean;
      errors?: {
        properties?: {
          question?: { errors?: string[] };
          answer?: { errors?: string[] };
          category?: { errors?: string[] };
        };
      };
      values?: {
        [k: string]: FormDataEntryValue;
      };
    }
  | undefined;
export type EditFAQFormState =
  | {
      success?: boolean;
      errors?: {
        properties?: {
          id?: { errors?: string[] };
          question?: { errors?: string[] };
          answer?: { errors?: string[] };
          category?: { errors?: string[] };
        };
      };
      values?: {
        [k: string]: FormDataEntryValue;
      };
    }
  | undefined;

export type AddDocumentFormState =
  | {
      success?: boolean;
      errors?: {
        properties?: {
          display_name?: { errors?: string[] };
          file?: { errors?: string[] };
          category?: { errors?: string[] };
        };
      };
      values?: {
        [k: string]: FormDataEntryValue;
      };
    }
  | undefined;

export type AddCensorFormState =
  | {
      success?: boolean;
      errors?: {
        properties?: {
          word?: { errors?: string[] };
          category?: { errors?: string[] };
          severity?: { errors?: string[] };
          added_by?: { errors?: string[] };
        };
      };
      values?: {
        [k: string]: FormDataEntryValue;
      };
    }
  | undefined;


export type EditDocumentFormState =
  | {
      success?: boolean;
      errors?: {
        properties?: {
          id?: { errors?: string[] };
          display_name?: { errors?: string[] };

          category?: { errors?: string[] };
        };
      };
      values?: {
        [k: string]: FormDataEntryValue;
      };
    }
  | undefined;

export type AddAnnouncementFormState =
  | {
      success?: boolean;
      errors?: {
        properties?: {
          title?: { errors?: string[] };
          content?: { errors?: string[] };
          banner?: { errors?: string[] };
          expiry?: { errors?: string[] };
          priority?: { errors?: string[] };
          pinned?: { errors?: string[] };
          scheduleAt?: { errors?: string[] };
        };
      };
      values?: {
        [k: string]: FormDataEntryValue;
      };
    }
  | undefined;
export type EditAnnouncementFormState =
  | {
      success?: boolean;
      errors?: {
        properties?: {
          id?: { errors?: string[] };
          title?: { errors?: string[] };
          content?: { errors?: string[] };
          banner?: { errors?: string[] };
          expiry?: { errors?: string[] };
          priority?: { errors?: string[] };
          pinned?: { errors?: string[] };
        };
      };
      values?: {
        [k: string]: FormDataEntryValue;
      };
    }
  | undefined;
export type AddPostFormState =
  | {
      posted?: any;
      success?: boolean;
      errors?: {
        properties?: {
          title?: { errors?: string[] };
          content?: { errors?: string[] };
        };
      };
      values?: {
        [k: string]: FormDataEntryValue;
      };
    }
  | undefined;
export type AddCustomPostFormState =
  | {
      posted?: any;
      success?: boolean;
      errors?: {
        properties?: {
          createdAt?: { errors?: string[] };
          title?: { errors?: string[] };
          content?: { errors?: string[] };
        };
      };
      values?: {
        [k: string]: FormDataEntryValue;
      };
    }
  | undefined;
export type EditPostFormState =
  | {
      posted?: any;
      success?: boolean;
      errors?: {
        properties?: {
          id?: { errors?: string[] };
          title?: { errors?: string[] };
          content?: { errors?: string[] };
        };
      };
      values?: {
        [k: string]: FormDataEntryValue;
      };
    }
  | undefined;

export const CommentFormSchema = z.object({
  content: z
    .string()
    .trim()
    .min(1, { message: "This field is required" })
    .max(500, { message: "Must be at most 500 characters long" }),
});

export type CommentFormState =
  | {
      success?: boolean | undefined;
      errors?:
        | {
            properties?: {
              content?: {
                errors?: string[];
              };
            };
          }
        | undefined;
      values?: {
        [k: string]: FormDataEntryValue;
      };
      posted?:
        | {
            content: string;
            created_at: string;
            id: number;
            post_id: string;
            user_id: string;
            profile: {
              first_name: string;
              middle_name?: string | null | undefined;
              last_name: string;
              avatar?: string | null | undefined;
            };
          }
        | undefined;
    }
  | undefined;

export const ChangeEmailFormSchema = z.object({
  newEmail: z
    .email({ message: "Must be a valid email" })
    .min(1, { message: "This field is required" }),
});
export type ChangeEmailFormState =
  | {
      success?: boolean | undefined;
      errors?:
        | {
            properties?: {
              newEmail?: {
                errors?: string[];
              };
            };
          }
        | undefined;
    }
  | undefined;
export const ChangePasswordFormSchema = z.object({
  oldPassword: z.string().min(1, { message: "This field is required" }).trim(),
  passwordGroup: z
    .object({
      newPassword: z
        .string()
        .min(8, { message: "Be at least 8 characters long" })
        .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
        .regex(/[0-9]/, { message: "Contain at least one number." })
        .regex(/[^a-zA-Z0-9]/, {
          message: "Contain at least one special character.",
        })
        .trim(),
      confirmPassword: z
        .string()
        .min(1, { message: "This field is required" })
        .trim(),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
      message: "Passwords do not match",
    }),
});
export type ChangePasswordFormState =
  | {
      authError?: string | undefined;
      success?: boolean | undefined;
      errors?:
        | {
            properties?: {
              oldPassword?: {
                errors?: string[];
              };
              passwordGroup?:
                | {
                    errors?: string[];
                  }
                | undefined;
              newPassword?:
                | {
                    errors?: string[];
                  }
                | undefined;
              confirmPassword?:
                | {
                    errors?: string[];
                  }
                | undefined;
            };
          }
        | undefined;
    }
  | undefined;
export const EditProfileFormSchema = z.object({
  firstName: z.string().min(1, { message: "This field is required" }).trim(),
  middleName: z.string().trim().optional(),
  lastName: z.string().min(1, { message: "This field is required" }).trim(),
  birthPlace: z.string().min(1, { message: "This field is required" }).trim(),
  address: z.string().min(1, { message: "This field is required" }),
  birthDate: z.coerce.date().refine(
    (data) => {
      return Date.now() - +data >= 0;
    },
    {
      message: "Invalid date",
    }
  ),
});
export type EditProfileFormState =
  | {
      success?: boolean | undefined;
      errors?:
        | {
            properties?: {
              firstName?: {
                errors?: string[];
              };
              middleName?: {
                errors?: string[];
              };
              lastName?: {
                errors?: string[];
              };
              birthPlace?: {
                errors?: string[];
              };
              address?: {
                errors?: string[];
              };
              birthDate?: {
                errors?: string[];
              };
            };
          }
        | undefined;
      values?: {
        [k: string]: FormDataEntryValue;
      };
    }
  | undefined;
// create a schema for the sign-in form
export const SignInFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: "This field is required" })

    .trim(),
  password: z.string().min(1, { message: "This field is required" }).trim(),
});

export type SignInFormState =
  | {
      success?: boolean | undefined;
      errors?:
        | {
            properties?: {
              email?: {
                errors?: string[];
              };
              password?: {
                errors?: string[];
              };
            };
          }
        | undefined;
      values?: {
        [k: string]: FormDataEntryValue;
      };
    }
  | undefined;

export const SignUpFormSchema = z.object({
  position: z
    .enum(
      [
        "barangayOfficial",
        "baranggayStaff",
        "skOfficial",
        "skStaff",
        "constituent",
      ],
      {
        message: "Invalid position",
      }
    )
    .default("constituent"),
  userType: z.enum(
    [UserType.CONSTITUENT.toString(), UserType.OFFICIAL.toString()],
    {
      message: "Invalid user type",
    }
  ),
  firstName: z.string().min(1, { message: "This field is required" }).trim(),
  middleName: z.string().trim().optional(),
  lastName: z.string().min(1, { message: "This field is required" }).trim(),
  email: z
    .email({ message: "Must be a valid email" })
    .min(1, { message: "This field is required" }),

  birthDate: z.coerce.date().refine(
    (data) => {
      return Date.now() - +data >= 0;
    },
    {
      message: "Invalid date",
    }
  ),
  birthPlace: z.string().min(1, { message: "This field is required" }).trim(),
  address: z.string().min(1, { message: "This field is required" }),
  passwordGroup: z
    .object({
      password: z
        .string()
        .min(8, { message: "Be at least 8 characters long" })
        .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
        .regex(/[0-9]/, { message: "Contain at least one number." })
        .regex(/[^a-zA-Z0-9]/, {
          message: "Contain at least one special character.",
        })
        .trim(),
      confirmPassword: z.string().min(1, { message: "This field is required" }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
    }),
  tosAccepted: z.literal("on", {
    error: "You must check this box before proceeding.",
  }),
});

export type SignUpFormState =
  | {
      success?: boolean | undefined;
      errors?:
        | {
            properties?: {
              position?:
                | {
                    errors?: string[];
                  }
                | undefined;
              userType?:
                | {
                    errors?: string[];
                  }
                | undefined;
              firstName?:
                | {
                    errors?: string[];
                  }
                | undefined;
              middleName?:
                | {
                    errors?: string[];
                  }
                | undefined;
              lastName?:
                | {
                    errors?: string[];
                  }
                | undefined;
              email?:
                | {
                    errors?: string[];
                  }
                | undefined;
              birthDate?:
                | {
                    errors?: string[];
                  }
                | undefined;
              birthPlace?:
                | {
                    errors?: string[];
                  }
                | undefined;
              address?:
                | {
                    errors?: string[];
                  }
                | undefined;
              passwordGroup?:
                | {
                    errors?: string[];
                  }
                | undefined;
              password?:
                | {
                    errors?: string[];
                  }
                | undefined;
              confirmPassword?:
                | {
                    errors?: string[];
                  }
                | undefined;
              tosAccepted?:
                | {
                    errors?: string[];
                  }
                | undefined;
            };
          }
        | undefined;
      values?: {
        [k: string]: FormDataEntryValue;
      };
    }
  | undefined;
