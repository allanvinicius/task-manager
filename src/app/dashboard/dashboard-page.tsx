"use client";

import { ContainerGrid } from "@/components/Container";
import { useTasks } from "@/context/task-context";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
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
    <section className="flex flex-col w-full p-8">
      <ContainerGrid>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-white/5 shadow rounded-lg text-center">
            <h2 className="text-xl font-semibold">Total de Tarefas</h2>
            <p className="text-3xl font-bold">{totalTasks}</p>
          </div>

          <div className="p-4 bg-white/5 shadow rounded-lg text-center">
            <h2 className="text-xl font-semibold">Concluídas</h2>
            <p className="text-3xl font-bold text-green-500">
              {completedTasks}
            </p>
          </div>

          <div className="p-4 bg-white/5 shadow rounded-lg text-center">
            <h2 className="text-xl font-semibold">Pendentes</h2>
            <p className="text-3xl font-bold text-orange-500">{pendingTasks}</p>
          </div>
        </div>

        <div className="mt-8 bg-white/5 shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">
            Distribuição das Tarefas
          </h2>

          <div className="w-full flex justify-center">
            <div className="w-full h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <XAxis dataKey="name" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#4CAF50" name="Tarefas">
                    {data.map((entry, index) => (
                      <rect key={`bar-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </ContainerGrid>
    </section>
  );
}
