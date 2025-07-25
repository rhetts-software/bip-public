"use server";
import { z } from "zod/v4";
import {
  ChangeEmailFormSchema,
  ChangeEmailFormState,
  ChangePasswordFormSchema,
  ChangePasswordFormState,
  SignUpFormSchema,
  SignUpFormState,
} from "./forms";
import { SignInFormSchema, SignInFormState } from "./forms";
import { redirect } from "next/navigation";
import { createClient } from "./supabase.server";
import { UserType } from "./types";
import { getUser } from "./dal";

export async function signIn(state: SignInFormState, formData: FormData) {
  const raw = Object.fromEntries(formData.entries());

  const validatedFields = SignInFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return { errors: z.treeifyError(validatedFields.error), values: raw };
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email: validatedFields.data.email,
    password: validatedFields.data.password,
  });

  if (error) {
    return {
      errors: {
        properties: {
          email: { errors: [] },
          password: { errors: [error.message] },
        },
      },
      values: raw,
    };
  }

  if (data.user) {
    redirect("/app");
  }

  return { success: true, values: raw };
}

export async function signUp(state: SignUpFormState, formData: FormData) {
  const raw = Object.fromEntries(formData.entries());
  const validatedFields = SignUpFormSchema.safeParse({
    position: formData.get("position")
      ? formData.get("position")
      : "constituent",
    userType: formData.get("userType"),
    firstName: formData.get("firstName"),
    middleName: formData.get("middleName") ? formData.get("middleName") : "",
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    birthDate: formData.get("birthDate"),
    birthPlace: formData.get("birthPlace"),
    address: formData.get("address"),
    passwordGroup: {
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    },
    tosAccepted: formData.get("tosAccepted"),
  });

  if (!validatedFields.success) {
    return { errors: z.treeifyError(validatedFields.error), values: raw };
  }
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email: validatedFields.data.email,
    password: validatedFields.data.passwordGroup.password,
    options: {
      data: {
        firstName: validatedFields.data.firstName,
        middleName: validatedFields.data.middleName,
        lastName: validatedFields.data.lastName,
        birthDate: validatedFields.data.birthDate,
        birthPlace: validatedFields.data.birthPlace,
        address: validatedFields.data.address,
        userType: validatedFields.data.userType,
        position: validatedFields.data.position,
      },
    },
  });
  if (error) {
    return {
      success: false,
      values: raw,
    };
  }
  if (data) {
    redirect("/verification");
  }

  return { success: true, values: raw };
}

export async function changePassword(
  state: ChangePasswordFormState,
  formData: FormData
) {
  const validatedFields = ChangePasswordFormSchema.safeParse({
    oldPassword: formData.get("oldPassword"),
    passwordGroup: {
      newPassword: formData.get("newPassword"),
      confirmPassword: formData.get("confirmPassword"),
    },
  });
  if (!validatedFields.success) {
    return { errors: z.treeifyError(validatedFields.error) };
  }
  const supabase = await createClient();
  const user = await getUser();
  if (user && user.email) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: user.email,
      password: validatedFields.data.oldPassword,
    });
    if (!error) {
      const { error } = await supabase.auth.updateUser({
        password: validatedFields.data.passwordGroup.newPassword,
      });
      if (!error) {
        await supabase.auth.signOut();
        redirect("/signin");
      }
    } else {
      return { success: false, authError: error.message };
    }
  }
}
export async function changeEmail(
  state: ChangeEmailFormState,
  formData: FormData
) {
  const validatedFields = ChangeEmailFormSchema.safeParse({
    newEmail: formData.get("newEmail"),
  });
  if (!validatedFields.success) {
    return { errors: z.treeifyError(validatedFields.error) };
  }
  const supabase = await createClient();
  if (await getUser()) {
    const { data, error } = await supabase.auth.updateUser({
      email: validatedFields.data.newEmail,
    });
  }

  return { success: true };
}
