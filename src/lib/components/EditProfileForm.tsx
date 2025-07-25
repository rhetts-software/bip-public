"use client";
import { useActionState, useEffect } from "react";
import { modifyUserProfile } from "../modules/dal";
import { EditProfileFormState } from "../modules/forms";

interface EditProfileFormProps {
  firstName: string;
  middleName?: string | undefined | null;
  lastName: string;
  birthPlace: string;
  address: string;
  birthDate: string;
  onSuccess?: () => void;
  state: EditProfileFormState;
  pending: boolean;
  action: (payload: FormData) => void;
}
export default function EditProfileForm({
  firstName,
  middleName = "",
  lastName,
  birthPlace,
  address,
  birthDate,
  onSuccess,
  action,
  pending,
  state,
}: EditProfileFormProps) {
  return (
    <form action={action} id="editProfileForm" className="flex flex-col gap-4">
      <label htmlFor="firstName" className="flex text-sm flex-col gap-2">
        <span className="font-extrabold  px-1">First Name</span>
        <input
          id="firstName"
          className="border tracking-wide rounded-lg text-xl w-64 p-2 border-slate-300 bg-slate-100 dark:border-slate-700 dark:bg-slate-800"
          type="text"
          name="firstName"
          defaultValue={firstName}
        />
        {state?.errors?.properties?.firstName?.errors && (
          <span className="text-red-500 px-1">
            {state.errors.properties.firstName.errors}
          </span>
        )}
      </label>
      <label htmlFor="middleName" className="flex text-sm flex-col gap-2">
        <span className="font-extrabold px-1">Middle Name</span>
        <input
          id="middleName"
          className="border tracking-wide rounded-lg text-xl w-64 p-2 border-slate-300 bg-slate-100 dark:border-slate-700 dark:bg-slate-800"
          type="text"
          name="middleName"
          defaultValue={middleName ? middleName : ""}
        />
      </label>
      <label htmlFor="lastName" className="flex  text-sm flex-col gap-2">
        <span className="font-extrabold px-1">Last Name</span>
        <input
          id="lastName"
          className="border tracking-wide rounded-lg text-xl w-64 p-2 border-slate-300 bg-slate-100 dark:border-slate-700 dark:bg-slate-800"
          type="text"
          name="lastName"
          defaultValue={lastName}
        />
        {state?.errors?.properties?.lastName?.errors && (
          <span className="text-red-500 px-1">
            {state.errors.properties.lastName.errors}
          </span>
        )}
      </label>
      <label htmlFor="birthDate" className="flex text-sm flex-col gap-2">
        <span className="font-extrabold px-1">Birth Date</span>
        <input
          id="birthDate"
          className="border tracking-wide rounded-lg text-xl w-64 p-2 border-slate-300 bg-slate-100 dark:border-slate-700 dark:bg-slate-800"
          type="date"
          name="birthDate"
          defaultValue={birthDate}
        />
        {state?.errors?.properties?.birthDate?.errors && (
          <span className="text-red-500 px-1  ">
            {state.errors.properties.birthDate.errors}
          </span>
        )}
      </label>
      <label htmlFor="birthPlace" className="flex text-sm flex-col gap-2">
        <span className="font-extrabold px-1">Birth Place</span>
        <input
          id="birthPlace"
          className="border tracking-wide rounded-lg text-xl w-64 p-2 border-slate-300 bg-slate-100 dark:border-slate-700 dark:bg-slate-800"
          type="text"
          name="birthPlace"
          defaultValue={birthPlace}
        />
        {state?.errors?.properties?.birthPlace?.errors && (
          <span className="text-red-500 px-1  ">
            {state.errors.properties.birthPlace.errors}
          </span>
        )}
      </label>
      <label htmlFor="address" className="flex text-sm flex-col gap-2">
        <span className="font-extrabold px-1">Address</span>
        <input
          id="address"
          className="border tracking-wide rounded-lg text-xl w-64 p-2 border-slate-300 bg-slate-100 dark:border-slate-700 dark:bg-slate-800"
          type="text"
          name="address"
          defaultValue={address}
        />
        {state?.errors?.properties?.address?.errors && (
          <span className="text-red-500 px-1  ">
            {state.errors.properties.address.errors}
          </span>
        )}
      </label>
    </form>
  );
}
