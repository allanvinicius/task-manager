import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// PATCH: Toggle completed state of a subtask
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const current = await prisma.subtask.findUnique({
    where: { id },
  });

  if (!current) {
    return NextResponse.json(
      { error: "Subtarefa não encontrada" },
      { status: 404 }
    );
  }

  const updated = await prisma.subtask.update({
    where: { id: id },
    data: { completed: !current.completed },
  });

  const task = await prisma.task.findUnique({
    where: { id: updated.taskId },
    include: { subtasks: true },
  });

  return NextResponse.json(task);
}
