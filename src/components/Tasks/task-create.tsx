"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TaskStatus, TaskPriority } from "@/types";
import { useTasks } from "@/context/task-context";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { statusLabels, priorityLabels } from "@/utils/labels";

import { BadgeCheck, Flag } from "lucide-react";

export function TaskCreate() {
  const { addTask } = useTasks();
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState<TaskStatus | null>("TO_DO");
  const [priority, setPriority] = useState<TaskPriority | null>("LOW");

  const isTitleEmpty = title.trim() === "";

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isTitleEmpty) return;

    addTask({
      id: crypto.randomUUID(),
      title,
      status: status ?? "TO_DO",
      priority: priority ?? "LOW",
      favorite: false,
    });

    setTitle("");
    setStatus("TO_DO");
    setPriority("LOW");
  }

  return (
    <section className="w-full flex min-[1920px]:p-8 min-[1440px]:p-8 min-[768px]:p-4 min-[425px]:pt-[70px] min-[425px]:pl-5 min-[425px]:pr-5 min-[390px]:pt-[70px] min-[390px]:pl-5 min-[390px]:pr-5 min-[375px]:pt-[70px] min-[375px]:pl-5 min-[375px]:pr-5">
      <form
        onSubmit={handleSubmit}
        className="flex items-center flex-col space-y-4 w-full max-w-full"
      >
        <div className="w-full flex flex-row items-center gap-10 min-[2560px]:flex-row min-[1920px]:flex-row min-[1440px]:flex-row min-[1024px]:flex-row min-[768px]:flex-col min-[768px]:gap-5 min-[480px]:flex-col min-[480px]:gap-3 min-[425px]:flex-col min-[425px]:gap-3 min-[390px]:flex-col min-[390px]:gap-3 min-[375px]:flex-col min-[375px]:gap-3">
          <Input
            value={title}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setTitle(e.target.value)
            }
            placeholder="Título da tarefa"
          />

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1 text-sm">
                <BadgeCheck className="size-3" />
                Status
              </span>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" disabled={isTitleEmpty}>
                    {status ? statusLabels[status] : "Vazio"}
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent>
                  {Object.entries(statusLabels).map(([value, label]) => (
                    <DropdownMenuItem
                      key={value}
                      onClick={() => setStatus(value as TaskStatus)}
                    >
                      {label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1 text-sm">
                <Flag className="size-3" />
                Prioridade
              </span>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" disabled={isTitleEmpty}>
                    {priority ? priorityLabels[priority] : "Vazio"}
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent>
                  {Object.entries(priorityLabels).map(([value, label]) => (
                    <DropdownMenuItem
                      key={value}
                      onClick={() => setPriority(value as TaskPriority)}
                    >
                      {label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
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
    </section>
  );
}
