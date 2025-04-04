import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const task = await prisma.task.findUnique({ where: { id: params.id } });

  if (!task) {
    return NextResponse.json(
      { error: "Tarefa não encontrada" },
      { status: 404 }
    );
  }

  const duplicatedTask = await prisma.task.create({
    data: {
      title: `${task.title} (Cópia)`,
      description: task.description,
      status: task.status,
      priority: task.priority,
      favorite: task.favorite,
    },
  });

  return NextResponse.json(duplicatedTask);
}
