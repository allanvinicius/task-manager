"use client";

import { createContext, useContext, useState } from "react";
import { Task, TaskContextProps } from "@/types";

const TaskContext = createContext<TaskContextProps | undefined>(undefined);

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [expandedTaskId, setExpandedTaskId] = useState<string | null>(null);

  async function addTask(task: Omit<Task, "id">) {
    const res = await fetch("/api/tasks", {
      method: "POST",
      body: JSON.stringify(task),
      headers: { "Content-Type": "application/json" },
    });

    const newTask = await res.json();

    setTasks((prev) => [...prev, newTask]);
  }

  async function updateTask(updatedTask: Task) {
    const res = await fetch("/api/tasks", {
      method: "PUT",
      body: JSON.stringify(updatedTask),
      headers: { "Content-Type": "application/json" },
    });

    const task = await res.json();
    setTasks((prev) =>
      prev.map((taskUpdate) => (taskUpdate.id === task.id ? task : taskUpdate))
    );
  }

  async function deleteTask(id: string) {
    await fetch("/api/tasks", {
      method: "DELETE",
      body: JSON.stringify({ id }),
      headers: { "Content-Type": "application/json" },
    });
    
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }

  function toggleFavorite(id: string) {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, favorite: !task.favorite } : task
      )
    );
  }

  function duplicateTask(id: string) {
    setTasks((prevTasks) => {
      const taskToDuplicate = prevTasks.find((task) => task.id === id);
      if (!taskToDuplicate) return prevTasks;

      const newTask = {
        ...taskToDuplicate,
        id: crypto.randomUUID(),
        title: `${taskToDuplicate.title} (Cópia)`,
      };

      return [...prevTasks, newTask];
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
        expandedTaskId,
        setExpandedTaskId,
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
