import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(
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

  const updatedTask = await prisma.task.update({
    where: { id: params.id },
    data: { favorite: !task.favorite },
  });

  return NextResponse.json(updatedTask);
}
