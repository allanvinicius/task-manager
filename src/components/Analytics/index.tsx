"use client";

import { Container } from "@/components/Container";
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

export function Analytics() {
  const { tasks } = useTasks();

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.status === "Concluída"
  ).length;

  const pendingTasks = totalTasks - completedTasks;

  const data = [
    {
      concluidas: completedTasks,
      pendentes: pendingTasks,
    },
  ];

  return (
    <section className="w-full flex flex-col p-8">
      <Container>
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
                  <Tooltip cursor={false} />
                  <Legend />

                  <Bar dataKey="concluidas" name="Concluídas" fill="#4CAF50" />

                  <Bar dataKey="pendentes" name="Pendentes" fill="#FF9800" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
