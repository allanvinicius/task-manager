import { prisma } from "@/lib/prisma";
import { Status, Priority } from "@prisma/client";

// Criar uma nova tarefa
export async function createTask(data: {
  title: string;
  description?: string;
  status: Status;
  priority: Priority;
}) {
  return await prisma.task.create({ data });
}

// Listar todas as tarefas
export async function getTasks() {
  return await prisma.task.findMany();
}

// Atualizar uma tarefa
export async function updateTask(
  id: string,
  data: Partial<{
    title: string;
    description?: string;
    status: Status;
    priority: Priority;
    favorite: boolean;
  }>
) {
  return await prisma.task.update({ where: { id }, data });
}

// Deletar uma tarefa
export async function deleteTask(id: string) {
  return await prisma.task.delete({ where: { id } });
}

// Duplicar uma tarefa
export async function duplicateTask(id: string) {
  const task = await prisma.task.findUnique({ where: { id } });
  if (!task) throw new Error("Tarefa não encontrada");

  return await prisma.task.create({
    data: {
      title: `${task.title} (Cópia)`,
      description: task.description,
      status: task.status,
      priority: task.priority,
      favorite: task.favorite,
    },
  });
}

// Marcar tarefa como favorita
export async function toggleFavorite(id: string) {
  const task = await prisma.task.findUnique({ where: { id } });
  if (!task) throw new Error("Tarefa não encontrada");

  return await prisma.task.update({
    where: { id },
    data: { favorite: !task.favorite },
  });
}
