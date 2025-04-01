"use client";

import { useTasks } from "@/context/task-context";
import { TaskList } from "./task-list";
import { ContainerGrid } from "@/components/Container";

export function TaskPage() {
  const { tasks, toggleFavorite, duplicateTask } = useTasks();

  return (
    <section className="flex flex-col w-full">
      <ContainerGrid>
        <TaskList
          tasks={tasks}
          onToggleFavorite={toggleFavorite}
          onDuplicate={duplicateTask}
        />
      </ContainerGrid>
    </section>
  );
}
