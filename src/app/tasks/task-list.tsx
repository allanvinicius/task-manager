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

import { Copy, Star } from "lucide-react";

export function TaskList() {
  const { tasks, updateTask, deleteTask, toggleFavorite, duplicateTask } =
    useTasks();

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
              <Button variant="default" onClick={() => updateTask(id)}>
                Editar
              </Button>

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
