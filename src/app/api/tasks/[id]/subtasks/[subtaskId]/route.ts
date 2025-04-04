import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { title } = await req.json();

  const updated = await prisma.subtask.update({
    where: { id },
    data: { title },
  });

  const task = await prisma.task.findUnique({
    where: { id: updated.taskId },
    include: { subtasks: true },
  });

  return NextResponse.json(task);
}

// DELETE: Delete subtask
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  // Encontra a subtask antes de deletar para pegar o taskId
  const subtask = await prisma.subtask.findUnique({
    where: { id },
  });

  if (!subtask) {
    return NextResponse.json(
      { error: "Subtarefa não encontrada" },
      { status: 404 }
    );
  }

  // Deleta a subtarefa
  await prisma.subtask.delete({
    where: { id },
  });

  // Retorna a task atualizada
  const updatedTask = await prisma.task.findUnique({
    where: { id: subtask.taskId },
    include: { subtasks: true },
  });

  return NextResponse.json(updatedTask);
}
