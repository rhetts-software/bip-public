"use client";
import {
  getUsers,
  grantVerification,
  revokeVerification,
} from "@/lib/modules/dal";
import { useEffect, useState } from "react";

import Loading from "../../loading";
import UserList from "@/lib/components/UserList";

export default function OfficialsPage() {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    getUsers("official").then((users) => {
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
        title={"Officials"}
        description={"Manage barangay officials' verification status"}
        items={data}
      ></UserList>
    </div>
  );
}
