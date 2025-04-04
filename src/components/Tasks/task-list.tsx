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
import { Container } from "../Container";

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

  function addSubtask() {
    if (!newSubtask.trim()) return;

    setSelectedTask((currentTask) =>
      currentTask
        ? {
            ...currentTask,
            subtasks: [
              ...(currentTask.subtasks || []),
              { id: crypto.randomUUID(), title: newSubtask, completed: false },
            ],
          }
        : currentTask
    );

    setNewSubtask("");
    handleUpdate();
  }

  function toggleSubtaskCompletion(subtaskIndex: number) {
    setSelectedTask((currentTask) =>
      currentTask
        ? {
            ...currentTask,
            subtasks: currentTask.subtasks?.map((subtask, index) =>
              index === subtaskIndex
                ? { ...subtask, completed: !subtask.completed }
                : subtask
            ),
          }
        : currentTask
    );

    handleUpdate();
  }

  function updateSubtaskTitle(subtaskIndex: number, newTitle: string) {
    setSelectedTask((currentTask) =>
      currentTask
        ? {
            ...currentTask,
            subtasks: currentTask.subtasks?.map((subtask, index) =>
              index === subtaskIndex ? { ...subtask, title: newTitle } : subtask
            ),
          }
        : currentTask
    );

    handleUpdate();
  }

  function deleteSubtask(subtaskIndex: number) {
    setSelectedTask((currentTask) =>
      currentTask
        ? {
            ...currentTask,
            subtasks: currentTask.subtasks?.filter(
              (_, index) => index !== subtaskIndex
            ),
          }
        : currentTask
    );

    handleUpdate();
  }

  function duplicateSubtask(index: number) {
    setSelectedTask((prev) =>
      prev
        ? {
            ...prev,
            subtasks: [
              ...(prev.subtasks ?? []),
              {
                ...prev.subtasks![index],
                title: `${prev.subtasks![index].title} (Cópia)`,
              },
            ],
          }
        : prev
    );

    handleUpdate();
  }

  return (
    <section className="w-full flex p-8">
      <Container>
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
            {tasks.map(
              ({ id, favorite, title, status, priority, subtasks }) => (
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
                            subtasks.filter((subtask) => !subtask.completed)
                              .length
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
                                      {[
                                        "A Fazer",
                                        "Em Andamento",
                                        "Concluída",
                                      ].map((option) => (
                                        <DropdownMenuItem
                                          key={option}
                                          onClick={() =>
                                            setSelectedTask((prev) =>
                                              prev
                                                ? {
                                                    ...prev,
                                                    status:
                                                      option as TaskStatus,
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
                                      {["Baixa", "Média", "Alta"].map(
                                        (option) => (
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
                                        )
                                      )}
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </div>
                              </div>

                              <div className="flex gap-2">
                                <Input
                                  value={newSubtask}
                                  onChange={(e) =>
                                    setNewSubtask(e.target.value)
                                  }
                                  placeholder="Adicionar subtarefa"
                                />

                                <Button onClick={addSubtask}>Adicionar</Button>
                              </div>

                              <div className="flex flex-col gap-2">
                                {selectedTask.subtasks?.map(
                                  (subtask, index) => (
                                    <div
                                      key={index}
                                      className="flex items-center justify-between gap-2 p-3 bg-white/5"
                                    >
                                      <div className="flex items-center gap-2">
                                        <input
                                          type="checkbox"
                                          checked={subtask.completed}
                                          onChange={() =>
                                            toggleSubtaskCompletion(index)
                                          }
                                        />

                                        <input
                                          value={subtask.title}
                                          onChange={(e) =>
                                            updateSubtaskTitle(
                                              index,
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
                                          onClick={() => deleteSubtask(index)}
                                        >
                                          <Trash2 className="size-4 text-red-500 hover:text-red-700 cursor-pointer" />
                                        </button>

                                        <button
                                          className="cursor-pointer"
                                          onClick={() =>
                                            duplicateSubtask(index)
                                          }
                                        >
                                          <Copy className="size-4 text-white" />
                                        </button>
                                      </div>
                                    </div>
                                  )
                                )}
                              </div>

                              <DialogClose asChild>
                                <Button onClick={handleUpdate}>Salvar</Button>
                              </DialogClose>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>

                      <Button
                        variant="destructive"
                        onClick={() => deleteTask(id)}
                      >
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
                                    toggleSubtaskCompletion(index)
                                  }
                                />

                                <input
                                  value={subtask.title}
                                  onChange={(e) =>
                                    updateSubtaskTitle(index, e.target.value)
                                  }
                                  className={
                                    subtask.completed
                                      ? "line-through text-sm text-white/20"
                                      : "text-sm"
                                  }
                                />
                              </div>

                              <div className="flex items-center gap-4">
                                <button onClick={() => deleteSubtask(index)}>
                                  <Trash2 className="size-4 text-red-500 hover:text-red-700 cursor-pointer" />
                                </button>

                                <button
                                  className="cursor-pointer"
                                  onClick={() => duplicateSubtask(index)}
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
              )
            )}
          </TableBody>
        </Table>
      </Container>
    </section>
  );
}
