import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-black text-white h-screen p-6 fixed">
      <h1 className="text-2xl font-bold mb-6">Task Manager</h1>

      <nav className="flex flex-col gap-4">
        <Link href="/" className="p-2 hover:bg-white/20 rounded">
          Criar tarefas
        </Link>

        <Link href="/tasks" className="p-2 hover:bg-white/20 rounded">
          Gerenciar Tarefas
        </Link>

        <Link href="/dashboard" className="p-2 hover:bg-white/20 rounded">
          Dashboard
        </Link>
      </nav>
    </aside>
  );
}
