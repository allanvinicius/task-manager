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
import { TaskListProps } from "@/types";
import { Copy, Star } from "lucide-react";

export function TaskList({
  tasks,
  onEdit,
  onDelete,
  onToggleFavorite,
  onDuplicate,
}: TaskListProps) {
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
        {tasks.map((task) => (
          <TableRow key={task.id}>
            <TableCell className="text-center">
              <button onClick={() => onToggleFavorite(task.id)}>
                <Star
                  className={`w-5 h-5 ${
                    task.favorite ? "text-yellow-500" : "text-gray-400"
                  }`}
                />
              </button>
            </TableCell>

            <TableCell>{task.title}</TableCell>
            <TableCell>{task.status}</TableCell>
            <TableCell>{task.priority}</TableCell>

            <TableCell className="flex gap-2">
              <Button onClick={() => onEdit(task.id)}>Editar</Button>

              <Button onClick={() => onDelete(task.id)} variant="outline">
                Excluir
              </Button>

              <button onClick={() => onDuplicate(task.id)}>
                <Copy className="w-5 h-5 text-gray-500 hover:text-black" />
              </button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
