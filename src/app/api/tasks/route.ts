import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Status, Priority } from "@prisma/client";

console.log(Status)

export async function GET() {
  const tasks = await prisma.task.findMany();
  return NextResponse.json(tasks);
}

export async function POST(req: Request) {
  const data = await req.json();

  const newTask = await prisma.task.create({
    data: {
      title: data.title,
      status: Status.TO_DO,
      priority: Priority.LOW,
    },
  });

  return NextResponse.json(newTask);
}

export async function PUT(req: Request) {
  const { id, status, priority, subtasks, ...data } = await req.json();

  const updatedTask = await prisma.task.update({
    where: { id },
    data: {
      ...data,
      status,
      priority,
      subtasks: subtasks
        ? {
            deleteMany: {},
            create: subtasks.map(
              (subtask: { title: string; completed: boolean }) => ({
                title: subtask.title,
                completed: subtask.completed,
              })
            ),
          }
        : undefined,
    },
  });

  return NextResponse.json(updatedTask);
}

export async function DELETE(req: Request) {
  const { id } = await req.json();
  await prisma.task.delete({ where: { id } });
  return NextResponse.json({ message: "Tarefa deletada" });
}
