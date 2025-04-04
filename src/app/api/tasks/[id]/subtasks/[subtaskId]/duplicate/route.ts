import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// POST: Duplicate subtask
export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const subtask = await prisma.subtask.findUnique({
    where: { id: id },
  });

  if (!subtask) {
    return NextResponse.json(
      { error: "Subtarefa não encontrada" },
      { status: 404 }
    );
  }

  await prisma.subtask.create({
    data: {
      title: `${subtask.title} (Cópia)`,
      completed: false,
      taskId: subtask.taskId,
    },
  });

  const task = await prisma.task.findUnique({
    where: { id: subtask.taskId },
    include: { subtasks: true },
  });

  return NextResponse.json(task);
}
