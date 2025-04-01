import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET - Listar todas as tarefas
export async function GET() {
  const tasks = await prisma.task.findMany();
  return NextResponse.json(tasks);
}

// POST - Criar uma nova tarefa
export async function POST(req: Request) {
  const data = await req.json();
  const task = await prisma.task.create({ data });
  return NextResponse.json(task);
}
