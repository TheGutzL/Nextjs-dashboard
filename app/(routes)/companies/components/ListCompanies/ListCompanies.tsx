import { redirect } from "next/navigation";

import { auth } from "@clerk/nextjs/server";

import { db } from "@/lib/db";

import { DataTable } from "./data-table";
import { columns } from "./columns";

const ListCompanies = async () => {
  const { userId } = auth();

  if (!userId) return redirect("/");

  const companies = await db.company.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  console.log(companies);

  return (
    <DataTable
      columns={columns}
      data={companies}
    />
  );
};

export default ListCompanies;
