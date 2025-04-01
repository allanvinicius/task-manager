"use client";

import { useTasks } from "@/context/task-context";
import { TaskList } from "./task-list";

export function TaskPage() {
  const { tasks, toggleFavorite, duplicateTask } = useTasks();

  return (
    <section className="flex flex-col w-full">
      <h1 className="text-2xl font-bold">Gerenciamento de Tarefas</h1>

      <TaskList
        tasks={tasks}
        onToggleFavorite={toggleFavorite}
        onDuplicate={duplicateTask}
      />
    </section>
  );
}
