import { ChartNoAxesColumn, ChartNoAxesGantt, Pencil } from "lucide-react";
import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="fixed z-10 w-full max-w-64 h-screen bg-white/5 text-white p-6 mr-8">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <nav className="flex flex-col gap-4">
        <Link
          href="/"
          className="flex items-center gap-4 p-2 rounded-md hover:bg-white hover:text-black transition-all"
        >
          <Pencil className="size-4" />
          Criar Tarefas
        </Link>

        <Link
          href="/tasks"
          className="flex items-center gap-4 p-2 rounded-md hover:bg-white hover:text-black transition-all"
        >
          <ChartNoAxesGantt className="size-4" />
          Gerenciar Tarefas
        </Link>

        <Link
          href="/analytics"
          className="flex items-center gap-4 p-2 rounded-md hover:bg-white hover:text-black transition-all"
        >
          <ChartNoAxesColumn className="size-4" />
          Analytics
        </Link>
      </nav>
    </aside>
  );
}
