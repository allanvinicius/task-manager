"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { TaskStatus, TaskPriority } from "@/types";
import { ContainerGrid } from "@/components/container";
import { useTasks } from "@/context/task-context";

export function TaskForm() {
  const { addTask } = useTasks();
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState<TaskStatus>("A Fazer");
  const [priority, setPriority] = useState<TaskPriority>("Média");

  const isTitleEmpty = title.trim() === "";

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isTitleEmpty) return;
    addTask({ title, status, priority, favorite: false });

    setTitle("");
    setStatus("A Fazer");
    setPriority("Média");
  }

  return (
    <section className="w-full flex p-8">
      <ContainerGrid>
        <form
          onSubmit={handleSubmit}
          className="flex items-center flex-col space-y-4"
        >
          <div className="w-full flex items-center gap-6">
            <Input
              value={title}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setTitle(e.target.value)
              }
              placeholder="Título da tarefa"
            />

            <div className="flex items-center gap-4">
              <Select
                options={[
                  { value: "A Fazer", label: "A Fazer" },
                  { value: "Em Andamento", label: "Em Andamento" },
                  { value: "Concluída", label: "Concluída" },
                ]}
                value={status}
                onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                  setStatus(e.target.value as TaskStatus)
                }
                disabled={isTitleEmpty}
              />

              <Select
                options={[
                  { value: "Baixa", label: "Baixa" },
                  { value: "Média", label: "Média" },
                  { value: "Alta", label: "Alta" },
                ]}
                value={priority}
                onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                  setPriority(e.target.value as TaskPriority)
                }
                disabled={isTitleEmpty}
              />
            </div>
          </div>

          <Button
            className="w-full cursor-pointer"
            type="submit"
            disabled={isTitleEmpty}
          >
            Salvar
          </Button>
        </form>
      </ContainerGrid>
    </section>
  );
}
