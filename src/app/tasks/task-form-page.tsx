"use client";

import { Task } from "@prisma/client";
import { useState } from "react";
import { TaskForm } from "./task-form";

export function TaskFormPage() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleTaskSubmit(newTask: Omit<Task, "id">) {
    const taskWithId = { ...newTask, id: String(Date.now()) };
    setTasks((prev) => [...prev, taskWithId]);
  }

  return <TaskForm onSubmit={handleTaskSubmit} />;
}
