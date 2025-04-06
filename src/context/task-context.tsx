"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Task, TaskContextProps } from "@/types";

const TaskContext = createContext<TaskContextProps | undefined>(undefined);

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [expandedTaskId, setExpandedTaskId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTasks() {
      const res = await fetch("/api/tasks");
      const data = await res.json();
      setTasks(data);
    }

    fetchTasks();
  }, []);

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

  async function toggleFavorite(id: string) {
    const res = await fetch(`/api/tasks/${id}/favorite`, {
      method: "PATCH",
    });

    if (!res.ok) {
      throw new Error("Erro ao atualizar favorito");
    }

    const updatedTask = await res.json();

    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === id ? updatedTask : task))
    );
  }

  async function duplicateTask(id: string) {
    const res = await fetch(`/api/tasks/${id}/duplicate`, {
      method: "POST",
    });

    if (!res.ok) {
      throw new Error("Erro ao duplicar tarefa");
    }

    const duplicatedTask = await res.json();

    setTasks((prevTasks) => [...prevTasks, duplicatedTask]);
  }

  async function addSubtask(subtaskId: string, title: string) {
    const res = await fetch(`/api/tasks/${subtaskId}/subtasks`, {
      method: "POST",
      body: JSON.stringify({ title }),
    });

    if (!res.ok) throw new Error("Erro ao adicionar subtarefa");

    const updatedTask = await res.json();

    setTasks((prev) =>
      prev.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  }

  async function toggleSubtaskCompletion(subtaskId: string) {
    const res = await fetch(
      `/api/tasks/${subtaskId}/subtasks/${subtaskId}/toggle`,
      {
        method: "PATCH",
      }
    );

    if (!res.ok) throw new Error("Erro ao alternar subtarefa");

    const updatedTask = await res.json();

    setTasks((prev) =>
      prev.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  }

  async function updateSubtaskTitle(subtaskId: string, title: string) {
    const res = await fetch(`/api/tasks/${subtaskId}/subtasks/${subtaskId}`, {
      method: "PATCH",
      body: JSON.stringify({ title }),
    });

    if (!res.ok) throw new Error("Erro ao atualizar subtarefa");

    const updatedTask = await res.json();

    setTasks((prev) =>
      prev.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  }

  async function deleteSubtask(subtaskId: string) {
    const res = await fetch(`/api/tasks/${subtaskId}/subtasks/${subtaskId}`, {
      method: "DELETE",
    });

    if (!res.ok) throw new Error("Erro ao deletar subtarefa");

    const updatedTask = await res.json();

    setTasks((prev) =>
      prev.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  }

  async function duplicateSubtask(subtaskId: string) {
    const res = await fetch(
      `/api/tasks/${subtaskId}/subtasks/${subtaskId}/duplicate`,
      {
        method: "POST",
      }
    );

    if (!res.ok) throw new Error("Erro ao duplicar subtarefa");

    const updatedTask = await res.json();

    setTasks((prev) =>
      prev.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
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
        addSubtask,
        deleteSubtask,
        toggleSubtaskCompletion,
        updateSubtaskTitle,
        duplicateSubtask,
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
