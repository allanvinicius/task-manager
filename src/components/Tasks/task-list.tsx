"use client";

import { Fragment, useState } from "react";
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
import {
  BadgeCheck,
  ChevronDown,
  Copy,
  Flag,
  Star,
  Trash2,
} from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { TaskStatus, TaskPriority, Task } from "@/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function TaskList() {
  const {
    tasks,
    updateTask,
    deleteTask,
    toggleFavorite,
    duplicateTask,
    expandedTaskId,
    setExpandedTaskId,
  } = useTasks();

  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [newSubtask, setNewSubtask] = useState("");

  function handleUpdate() {
    if (selectedTask) {
      updateTask(selectedTask);
    }
  }

  async function addSubtask(subtaskId: string, title: string) {
    const res = await fetch(`/api/tasks/${subtaskId}/subtasks`, {
      method: "POST",
      body: JSON.stringify({ title }),
    });

    if (!res.ok) throw new Error("Erro ao adicionar subtarefa");

    const updatedTask = await res.json();

    setSelectedTask(updatedTask);
    setNewSubtask("");
  }

  async function toggleSubtaskCompletion(subtaskId: string) {
    const res = await fetch(`/api/tasks/${subtaskId}/subtasks/${subtaskId}/toggle`, {
      method: "PATCH",
    });

    if (!res.ok) throw new Error("Erro ao alternar subtarefa");

    const updatedTask = await res.json();

    setSelectedTask(updatedTask);
  }

  async function updateSubtaskTitle(subtaskId: string, title: string) {
    const res = await fetch(`/api/tasks/${subtaskId}/subtasks/${subtaskId}`, {
      method: "PATCH",
      body: JSON.stringify({ title }),
    });

    if (!res.ok) throw new Error("Erro ao atualizar subtarefa");

    const updatedTask = await res.json();
    setSelectedTask(updatedTask);
  }

  async function deleteSubtask(subtaskId: string) {
    const res = await fetch(`/api/tasks/${subtaskId}/subtasks/${subtaskId}`, {
      method: "DELETE",
    });

    if (!res.ok) throw new Error("Erro ao deletar subtarefa");

    const updatedTask = await res.json();

    setSelectedTask(updatedTask);
  }

  async function duplicateSubtask(subtaskId: string) {
    const res = await fetch(`/api/tasks/${subtaskId}/subtasks/${subtaskId}/duplicate`, {
      method: "POST",
    });

    if (!res.ok) throw new Error("Erro ao duplicar subtarefa");

    const updatedTask = await res.json();
    setSelectedTask(updatedTask);
  }

  return (
    <section className="w-full flex min-[1920px]:p-8 min-[1440px]:p-8 min-[768px]:p-4 min-[425px]:pt-[70px] min-[425px]:pl-5 min-[425px]:pr-5 min-[390px]:pt-[70px] min-[390px]:pl-5 min-[390px]:pr-5 min-[375px]:pt-[70px] min-[375px]:pl-5 min-[375px]:pr-5">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">Favorito</TableHead>
            <TableHead>Título</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Prioridade</TableHead>
            <TableHead>Subtarefa(s)</TableHead>
            <TableHead className="text-center">Ações</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {tasks.map(({ id, favorite, title, status, priority, subtasks }) => (
            <Fragment key={id}>
              <TableRow>
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

                <TableCell>
                  {subtasks && subtasks.length > 0
                    ? `${
                        subtasks.filter((subtask) => !subtask.completed).length
                      }/${subtasks.length}`
                    : "Nenhuma"}
                </TableCell>

                <TableCell className="flex items-center justify-center gap-5">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="default"
                        onClick={() =>
                          setSelectedTask({
                            id,
                            title,
                            status,
                            priority,
                            favorite,
                            subtasks: subtasks || [],
                          })
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
                        <div className="flex flex-col gap-4 mt-3">
                          <Input
                            value={selectedTask.title}
                            onChange={(e) =>
                              setSelectedTask({
                                ...selectedTask,
                                title: e.target.value,
                              })
                            }
                            placeholder="Título da tarefa"
                          />

                          <div className="flex items-center justify-between min-[1920px]:flex-row min-[1440px]:flex-row min-[1024px]:flex-row min-[768px]:flex-row min-[480px]:flex-row min-[425px]:flex-col min-[390px]:flex-col min-[375px]:flex-col">
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
                                                priority:
                                                  option as TaskPriority,
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

                          <div className="flex gap-2 min-[1920px]:flex-row min-[1440px]:flex-row min-[768px]:flex-row min-[480px]:flex-row min-[425px]:flex-row min-[390px]:flex-col min-[375px]:flex-col">
                            <Input
                              value={newSubtask}
                              onChange={(e) => setNewSubtask(e.target.value)}
                              placeholder="Adicionar subtarefa"
                            />

                            <Button
                              onClick={() =>
                                addSubtask(selectedTask.id, newSubtask)
                              }
                            >
                              Adicionar
                            </Button>
                          </div>

                          <div className="flex flex-col gap-2">
                            {selectedTask.subtasks?.map((subtask) => (
                              <div
                                key={subtask.id}
                                className="flex items-center justify-between gap-2 p-3 bg-white/5"
                              >
                                <div className="flex items-center gap-2">
                                  <input
                                    type="checkbox"
                                    checked={subtask.completed}
                                    onChange={() =>
                                      toggleSubtaskCompletion(subtask.id)
                                    }
                                  />

                                  <input
                                    value={subtask.title}
                                    onChange={(e) =>
                                      updateSubtaskTitle(
                                        subtask.id,
                                        e.target.value
                                      )
                                    }
                                    className={
                                      subtask.completed
                                        ? "line-through text-sm text-white/20"
                                        : "text-sm"
                                    }
                                  />
                                </div>

                                <div className="flex items-center gap-4">
                                  <button
                                    onClick={() => deleteSubtask(subtask.id)}
                                  >
                                    <Trash2 className="size-4 text-red-500 hover:text-red-700 cursor-pointer" />
                                  </button>

                                  <button
                                    className="cursor-pointer"
                                    onClick={() => duplicateSubtask(subtask.id)}
                                  >
                                    <Copy className="size-4 text-white" />
                                  </button>
                                </div>
                              </div>
                            ))}
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

                  {subtasks && subtasks?.length > 0 && (
                    <button
                      className="cursor-pointer"
                      onClick={() =>
                        setExpandedTaskId(expandedTaskId === id ? null : id)
                      }
                    >
                      <ChevronDown
                        className={`w-5 h-5 transition-transform ${
                          expandedTaskId === id ? "rotate-180" : "rotate-0"
                        }`}
                      />
                    </button>
                  )}
                </TableCell>
              </TableRow>

              {expandedTaskId === id && subtasks && subtasks.length > 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="p-2 text-center">
                    <div className="flex flex-col gap-2">
                      {selectedTask?.subtasks?.map((subtask, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between gap-2 p-2"
                        >
                          <div className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={subtask.completed}
                              onChange={() =>
                                toggleSubtaskCompletion(String(index))
                              }
                            />

                            <input
                              value={subtask.title}
                              onChange={(e) =>
                                updateSubtaskTitle(
                                  String(index),
                                  e.target.value
                                )
                              }
                              className={
                                subtask.completed
                                  ? "line-through text-sm text-white/20"
                                  : "text-sm"
                              }
                            />
                          </div>

                          <div className="flex items-center gap-4">
                            <button
                              onClick={() => deleteSubtask(String(index))}
                            >
                              <Trash2 className="size-4 text-red-500 hover:text-red-700 cursor-pointer" />
                            </button>

                            <button
                              className="cursor-pointer"
                              onClick={() => duplicateSubtask(String(index))}
                            >
                              <Copy className="size-4 text-white" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </Fragment>
          ))}
        </TableBody>
      </Table>
    </section>
  );
}
