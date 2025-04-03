import { SidebarProps } from "@/types";
import { ChartNoAxesColumn, ChartNoAxesGantt, Pencil } from "lucide-react";

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  return (
    <aside className="fixed z-10 w-full max-w-64 h-screen bg-white/5 text-white p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <nav className="flex flex-col gap-4">
        <button
          onClick={() => setActiveTab("create")}
          className={`flex items-center gap-4 p-2 cursor-pointer rounded-md transition-all ${
            activeTab === "create"
              ? "bg-white text-black"
              : "hover:bg-white hover:text-black"
          }`}
        >
          <Pencil className="size-4" />
          Criar Tarefas
        </button>

        <button
          onClick={() => setActiveTab("tasks")}
          className={`flex items-center gap-4 p-2 cursor-pointer rounded-md transition-all ${
            activeTab === "tasks"
              ? "bg-white text-black"
              : "hover:bg-white hover:text-black"
          }`}
        >
          <ChartNoAxesGantt className="size-4" />
          Gerenciar Tarefas
        </button>

        <button
          onClick={() => setActiveTab("analytics")}
          className={`flex items-center gap-4 p-2 cursor-pointer rounded-md transition-all ${
            activeTab === "analytics"
              ? "bg-white text-black"
              : "hover:bg-white hover:text-black"
          }`}
        >
          <ChartNoAxesColumn className="size-4" />
          Analytics
        </button>
      </nav>
    </aside>
  );
}
