import { useActionState, useEffect, useState } from "react";
import ProfileInfo from "./ProfileInfo";
import AvatarButton from "./AvatarButton";
import EditProfileForm from "./EditProfileForm";
import PanelTitle from "./PanelTitle";
import PendingSubmitFormButton from "./PendingSubmitFormButton";
import { modifyUserProfile } from "../modules/dal";

interface ProfileInformationProps {
  firstName: string;
  middleName: string;
  lastName: string;
  birthDate: string;
  birthPlace: string;
  address: string;
  position: string;
  email: string;
  avatar: string;
  verified: boolean;
}

export default function ProfileInformation({
  firstName,
  middleName,
  lastName,
  birthDate,
  birthPlace,
  address,
  position,
  email,
  avatar,
  verified,
}: ProfileInformationProps) {
  const [profileEditing, setProfileEditing] = useState(false);
  const [state, action, pending] = useActionState(modifyUserProfile, undefined);
  useEffect(() => {
    if (state?.success) {
      window.location.reload();
    }
  }, [state]);
  return (
    <div className="flex flex-col gap-8 border p-4 rounded-2xl  border-slate-400  dark:border-slate-700 dark:bg-slate-800/20 bg-slate-200/20">
      <div className="flex gap-2">
        <PanelTitle>Profile Information</PanelTitle>
        {profileEditing ? (
          <div className="flex gap-2">
            <button
              onClick={() => {
                setProfileEditing(false);
              }}
              className="transition-all duration-300 dark:bg-slate-700 cursor-pointer bg-slate-400 text-white border-slate-600  dark:text-white px-4 rounded-lg font-bold border dark:border-slate-500 hover:bg-slate-500 dark:hover:bg-slate-600"
            >
              Discard
            </button>
            <button
              type="submit"
              form="editProfileForm"
              className="transition-all flex items-center justify-center duration-300 dark:bg-brand-green-600 cursor-pointer bg-brand-blue-500 text-white border-brand-blue-700  dark:text-white px-4 rounded-lg font-bold border dark:border-brand-green-400 hover:bg-brand-blue-600 dark:hover:bg-brand-green-500"
            >
              <PendingSubmitFormButton
                text="Save"
                loadingText="Saving"
                pending={pending}
              ></PendingSubmitFormButton>
            </button>
          </div>
        ) : (
          <div className="flex">
            <button
              onClick={() => {
                setProfileEditing(true);
              }}
              className="transition-all duration-300 dark:bg-brand-green-600 cursor-pointer bg-brand-blue-500 text-white border-brand-blue-700  dark:text-white px-4 rounded-lg font-bold border dark:border-brand-green-400 hover:bg-brand-blue-600 dark:hover:bg-brand-green-500"
            >
              Edit
            </button>
          </div>
        )}
      </div>
      <div className="dark:text-white flex gap-8 p-2">
        <AvatarButton
          onUpload={(url) => {
            window.location.reload();
          }}
          currentAvatar={avatar}
        ></AvatarButton>
        {profileEditing ? (
          <EditProfileForm
            action={action}
            state={state}
            pending={pending}
            firstName={firstName}
            middleName={middleName}
            lastName={lastName}
            birthPlace={birthPlace}
            address={address}
            birthDate={birthDate}
          ></EditProfileForm>
        ) : (
          <ProfileInfo
            firstName={firstName}
            middleName={middleName}
            lastName={lastName}
            birthDate={birthDate}
            birthPlace={birthPlace}
            address={address}
            position={position}
            verified={verified}
            email={email ? email : "No email"}
          ></ProfileInfo>
        )}
      </div>
    </div>
  );
}
