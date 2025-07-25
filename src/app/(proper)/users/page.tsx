"use client";
import { getAllUsers } from "@/lib/modules/dal";
import { useEffect, useState } from "react";

import Loading from "../loading";
import UserList from "@/lib/components/UserList";

export default function UsersPage() {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    getAllUsers().then((users) => {
      setData(users);
      setLoading(false);
    });
  }, []);

  if (isLoading) return <Loading />;

  return (
    <div className="w-full p-6 h-full">
      <UserList
        title={"All Users"}
        description={"Manage user verification status"}
        items={data}
      ></UserList>
    </div>
  );
}
