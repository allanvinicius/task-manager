"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useTasks } from "@/context/task-context";
import { BadgeCheck, Copy, Flag, Star } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { TaskStatus, TaskPriority, Task } from "@/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function TaskList() {
  const { tasks, updateTask, deleteTask, toggleFavorite, duplicateTask } =
    useTasks();

  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  function handleUpdate() {
    if (selectedTask) {
      updateTask(selectedTask.id, {
        title: selectedTask.title,
        status: selectedTask.status,
        priority: selectedTask.priority,
        favorite: false,
      });
    }
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-center">Favorito</TableHead>
          <TableHead>Título</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Prioridade</TableHead>
          <TableHead className="text-center">Ações</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {tasks.map(({ id, favorite, title, status, priority }) => (
          <TableRow key={id}>
            <TableCell className="text-center">
              <button
                className="cursor-pointer"
                onClick={() => toggleFavorite(id)}
              >
                <Star
                  className={`w-5 h-5 ${
                    favorite ? "text-yellow-500" : "text-gray-400"
                  }`}
                />
              </button>
            </TableCell>

            <TableCell>{title}</TableCell>
            <TableCell>{status}</TableCell>
            <TableCell>{priority}</TableCell>

            <TableCell className="flex items-center justify-center gap-5">
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="default"
                    onClick={() =>
                      setSelectedTask({ id, title, status, priority, favorite })
                    }
                  >
                    Editar
                  </Button>
                </DialogTrigger>

                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Editar Tarefa</DialogTitle>
                  </DialogHeader>

                  {selectedTask && (
                    <div className="flex flex-col gap-4">
                      <Input
                        value={selectedTask.title}
                        onChange={(e) =>
                          setSelectedTask((prev) =>
                            prev ? { ...prev, title: e.target.value } : prev
                          )
                        }
                        placeholder="Título da tarefa"
                      />

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1 text-sm">
                            <BadgeCheck className="size-3" />
                            Status
                          </span>

                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost">
                                {selectedTask.status}
                              </Button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent>
                              {["A Fazer", "Em Andamento", "Concluída"].map(
                                (option) => (
                                  <DropdownMenuItem
                                    key={option}
                                    onClick={() =>
                                      setSelectedTask((prev) =>
                                        prev
                                          ? {
                                              ...prev,
                                              status: option as TaskStatus,
                                            }
                                          : prev
                                      )
                                    }
                                  >
                                    {option}
                                  </DropdownMenuItem>
                                )
                              )}
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
                              <Button variant="ghost">
                                {selectedTask.priority}
                              </Button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent>
                              {["Baixa", "Média", "Alta"].map((option) => (
                                <DropdownMenuItem
                                  key={option}
                                  onClick={() =>
                                    setSelectedTask((prev) =>
                                      prev
                                        ? {
                                            ...prev,
                                            priority: option as TaskPriority,
                                          }
                                        : prev
                                    )
                                  }
                                >
                                  {option}
                                </DropdownMenuItem>
                              ))}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>

                      <DialogClose asChild>
                        <Button onClick={handleUpdate}>Salvar</Button>
                      </DialogClose>
                    </div>
                  )}
                </DialogContent>
              </Dialog>

              <Button variant="destructive" onClick={() => deleteTask(id)}>
                Excluir
              </Button>

              <button
                className="cursor-pointer"
                onClick={() => duplicateTask(id)}
              >
                <Copy className="w-5 h-5 text-white" />
              </button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
