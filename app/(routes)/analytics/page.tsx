import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { CompaniesChart } from "./components/CompaniesChart";

const PageAnalytics = async () => {
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

  const events = await db.event.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="p-4 bg-background shadow-md rounded-lg">
      <h2 className="mb-4 text-2xl">Analytics page</h2>
      <div>
        <CompaniesChart
          companies={companies}
          events={events}
        />
      </div>
    </div>
  );
};

export default PageAnalytics;
