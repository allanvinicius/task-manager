'use client';

import { createContext, useContext, useState } from "react";
import { Task, TaskContextProps } from "@/types";

const TaskContext = createContext<TaskContextProps | undefined>(undefined);

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);

  function addTask(task: Omit<Task, "id">) {
    setTasks((prev) => [...prev, { ...task, id: crypto.randomUUID() }]);
  }

  function updateTask(id: string, data: Omit<Task, "id">) {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, ...data } : t)));
  }

  function deleteTask(id: string) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  function toggleFavorite(id: string) {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, favorite: !t.favorite } : t))
    );
  }

  function duplicateTask(id: string) {
    setTasks((prev) => {
      const taskToDuplicate = prev.find((t) => t.id === id);
      if (!taskToDuplicate) return prev;

      const newTask = {
        ...taskToDuplicate,
        id: crypto.randomUUID(),
        title: `${taskToDuplicate.title} (Cópia)`,
      };

      return [...prev, newTask];
    });
  }

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        updateTask,
        deleteTask,
        toggleFavorite,
        duplicateTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TaskContext);
  if (!context) throw new Error("useTasks must be used within a TaskProvider");
  return context;
}
