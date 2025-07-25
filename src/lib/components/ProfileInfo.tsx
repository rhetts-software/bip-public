import { TbCheck, TbX } from "react-icons/tb";
import { calculateAge } from "../modules/utils";

interface ProfileInfoProps {
  firstName: string;
  middleName?: string | undefined | null;
  lastName: string;
  position: string;
  birthDate: string;
  birthPlace: string;
  address: string;
  email: string;
  verified: boolean;
}
export default function ProfileInfo({
  firstName,
  middleName,
  lastName,
  birthDate,
  birthPlace,
  email,
  address,
  position,
  verified,
}: ProfileInfoProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col">
        <span className="text-2xl font-bold ">
          {[lastName + ",", firstName, middleName].join(" ")}
        </span>
        <div className="flex gap-2">
          <span className="text-md uppercase tracking-wider  opacity-50">
            {position}
          </span>
          {verified ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
              <TbCheck className="w-3 h-3" />
              Verified
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400">
              <TbX className="w-3 h-3" />
              Pending
            </span>
          )}
        </div>
      </div>
      <div className="flex-col flex opacity-50 ">
        <span>{email}</span>
        <span>{calculateAge(birthDate)} years old</span>
        <span>
          Born on{" "}
          {new Date(birthDate).toLocaleString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}{" "}
          in {birthPlace}
        </span>
        <span>Lives in {address}</span>
      </div>
    </div>
  );
}
