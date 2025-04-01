"use client";

import { useTasks } from "@/context/task-context";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export function DashboardPage() {
  const { tasks } = useTasks();

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(
    (task) => task.status === "Concluída"
  ).length;
  const pendingTasks = totalTasks - completedTasks;

  const data = [
    { name: "Concluídas", value: completedTasks, color: "#4CAF50" },
    { name: "Pendentes", value: pendingTasks, color: "#FF9800" },
  ];

  return (
    <section className="flex flex-col w-full">
      <h1 className="text-3xl font-bold mb-6">📊 Dashboard de Tarefas</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-4 bg-white shadow rounded-lg text-center">
          <h2 className="text-xl font-semibold">Total de Tarefas</h2>
          <p className="text-3xl font-bold">{totalTasks}</p>
        </div>

        <div className="p-4 bg-white shadow rounded-lg text-center">
          <h2 className="text-xl font-semibold">Concluídas</h2>
          <p className="text-3xl font-bold text-green-500">{completedTasks}</p>
        </div>

        <div className="p-4 bg-white shadow rounded-lg text-center">
          <h2 className="text-xl font-semibold">Pendentes</h2>
          <p className="text-3xl font-bold text-orange-500">{pendingTasks}</p>
        </div>
      </div>

      <div className="mt-8 bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Distribuição das Tarefas</h2>

        <div className="w-full flex justify-center">
          <div className="w-80 h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  label
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
}
