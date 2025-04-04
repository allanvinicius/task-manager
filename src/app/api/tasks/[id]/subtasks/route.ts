import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// POST: Add a subtask to a task
export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { title } = await req.json();

  const task = await prisma.task.update({
    where: { id },
    data: {
      subtasks: {
        create: {
          title,
          completed: false,
        },
      },
    },
    include: { subtasks: true },
  });

  return NextResponse.json(task);
}
