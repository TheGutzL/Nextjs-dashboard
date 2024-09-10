import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function DELETE(req:NextResponse, {params}: {params: {eventId: string}}) {
  try {
    const { userId } = auth();
    const {eventId } = params;

    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const deletedEvent = await db.event.delete({
      where: {
        id: eventId
      }
    });

    return NextResponse.json(deletedEvent);
  } catch (error) {
    console.log(`[EVENT]`, error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}