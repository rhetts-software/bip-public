"use client";
import {
  getUsers,
  grantVerification,
  revokeVerification,
} from "@/lib/modules/dal";
import { useEffect, useState } from "react";

import Loading from "../../loading";
import UserList from "@/lib/components/UserList";

export default function ConstituentsPage() {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    getUsers("constituent").then((users) => {
      setData(users);
      setLoading(false);
    });
  }, []);

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

  if (isLoading) return <Loading />;

  return (
    <div className="w-full p-6 h-full">
      <UserList
        title={"Constituents"}
        description={"Manage constituents' verification status"}
        items={data}
      ></UserList>
    </div>
  );
}
