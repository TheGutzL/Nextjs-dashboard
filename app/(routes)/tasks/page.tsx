import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Calendar } from "./components/Calendar";

const TaskPage = async () => {
  const { userId } = auth();

  if (!userId) return redirect("/");

  const companies = await db.company.findMany({
    where: { userId },
    orderBy: {
      createdAt: "desc",
    },
  });

  const events = await db.event.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  console.log(events);

  return (
    <div>
      <Calendar companies={companies} events={events} />
    </div>
  );
};

export default TaskPage;
