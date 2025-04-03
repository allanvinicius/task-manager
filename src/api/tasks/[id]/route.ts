// app/api/tasks/[id]/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const data = await req.json();
  const updatedTask = await prisma.task.update({
    where: { id: params.id },
    data,
  });
  return NextResponse.json(updatedTask);
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  await prisma.task.delete({ where: { id: params.id } });
  return NextResponse.json({ message: "Tarefa deletada com sucesso" });
}

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const task = await prisma.task.findUnique({ where: { id: params.id } });
  if (!task) return NextResponse.error();

  const duplicatedTask = await prisma.task.create({
    data: {
      title: `${task.title} (Cópia)`,
      description: task.description,
      status: task.status,
      priority: task.priority,
    },
  });

  return NextResponse.json(duplicatedTask);
}
