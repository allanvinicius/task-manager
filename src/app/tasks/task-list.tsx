import { Button } from "@/components/ui/button";
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
    <table className="w-full border-collapse">
      <thead>
        <tr>
          <th className="border p-2">Favorito</th>
          <th className="border p-2">Título</th>
          <th className="border p-2">Status</th>
          <th className="border p-2">Prioridade</th>
          <th className="border p-2">Ações</th>
        </tr>
      </thead>

      <tbody>
        {tasks.map((task) => (
          <tr key={task.id}>
            <td className="border p-2 text-center">
              <button onClick={() => onToggleFavorite(task.id)}>
                <Star
                  className={`w-5 h-5 ${
                    task.favorite ? "text-yellow-500" : "text-gray-400"
                  }`}
                />
              </button>
            </td>

            <td className="border p-2">{task.title}</td>
            <td className="border p-2">{task.status}</td>
            <td className="border p-2">{task.priority}</td>

            <td className="border p-2 flex gap-2">
              <Button onClick={() => onEdit(task.id)}>Editar</Button>

              <Button onClick={() => onDelete(task.id)} variant="outline">
                Excluir
              </Button>

              <button onClick={() => onDuplicate(task.id)}>
                <Copy className="w-5 h-5 text-gray-500 hover:text-black" />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
