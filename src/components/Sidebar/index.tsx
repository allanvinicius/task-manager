import { ChartNoAxesCombined, ChartNoAxesGantt, Pencil } from "lucide-react";
import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white/5 text-white h-screen p-6 fixed">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <nav className="flex flex-col gap-4">
        <Link
          href="/"
          className="flex items-center gap-4 p-2 hover:bg-white/20 rounded-md"
        >
          <Pencil className="size-5" />
          Criar Tarefas
        </Link>

        <Link
          href="/tasks"
          className="flex items-center gap-4 p-2 hover:bg-white/20 rounded"
        >
          <ChartNoAxesGantt className="size-5" />
          Gerenciar Tarefas
        </Link>

        <Link
          href="/analytics"
          className="flex items-center gap-4 p-2 hover:bg-white/20 rounded"
        >
          <ChartNoAxesCombined className="size-5" />
          Analytics
        </Link>
      </nav>
    </aside>
  );
}
