import { TbCheck, TbUser, TbX } from "react-icons/tb";
import PanelTitle from "./PanelTitle";
import { dateToUserFriendlyString } from "../modules/utils";
import { grantVerification, revokeVerification } from "../modules/dal";

interface UserListProps {
  title: string;
  description: string;
  items: any[];
}
export default function UserList({ title, description, items }: UserListProps) {
  const handleVerificationToggle = async (
    userId: string,
    isVerified: boolean
  ) => {
    const action = isVerified ? revokeVerification : grantVerification;
    const result = await action(userId);
    if (result) {
      window.location.reload();
    }
  };
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
      <div className="p-6 border-b border-slate-200 dark:border-slate-700">
        <PanelTitle>{title}</PanelTitle>
        <p className="text-slate-600 dark:text-slate-400 mt-1">{description}</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 dark:bg-slate-800/50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
                Position
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
                Birth Date
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
                Address
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
                Last Sign In
              </th>
              <th className="px-6 py-4 text-center text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-center text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
            {items.map((item, index) => (
              <tr
                key={item.user_id}
                className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center">
                      <TbUser className="w-5 h-5 text-slate-500 dark:text-slate-400" />
                    </div>
                    <div>
                      <div className="font-medium text-slate-900 dark:text-white">
                        {[
                          item.profile.first_name,
                          item.profile.middle_name,
                          item.profile.last_name,
                        ]
                          .filter(Boolean)
                          .join(" ")}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-slate-600 dark:text-slate-300 capitalize">
                  {item.profile.position}
                </td>
                <td className="px-6 py-4 text-slate-600 dark:text-slate-300">
                  {new Date(item.profile.birth_date).toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )}
                </td>
                <td className="px-6 py-4 text-slate-600 dark:text-slate-300 max-w-xs truncate">
                  {item.profile.address}
                </td>
                <td className="px-6 py-4 text-slate-600 opacity-50 dark:text-slate-300 max-w-xs truncate">
                  {item.profile.last_sign_in_at
                    ? new Date(item.profile.last_sign_in_at).toLocaleTimeString(
                        "en-US",
                        {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )
                    : "Never"}
                </td>
                <td className="px-6 py-4 text-center">
                  {item.verified ? (
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
                </td>
                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() =>
                      handleVerificationToggle(item.user_id, item.verified)
                    }
                    className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                      item.verified
                        ? "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600 focus:ring-slate-500"
                        : "bg-blue-600 text-white hover:bg-blue-700 dark:bg-green-600 dark:hover:bg-green-700 focus:ring-blue-500 dark:focus:ring-green-500"
                    }`}
                  >
                    {item.verified ? "Revoke" : "Verify"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {items.length === 0 && (
        <div className="text-center py-12">
          <TbUser className="w-12 h-12 text-slate-400 mx-auto mb-4" />
          <p className="text-slate-500 dark:text-slate-400">No users found</p>
        </div>
      )}
    </div>
  );
}
