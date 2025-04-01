"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface TaskChartProps {
  tasks: { status: string }[];
}

export default function TaskChart({ tasks }: TaskChartProps) {
  const statusCounts = {
    "A Fazer": 0,
    "Em Andamento": 0,
    Concluída: 0,
  };

  tasks.forEach((task) => {
    if (statusCounts[task.status] !== undefined) {
      statusCounts[task.status]++;
    }
  });

  const data = Object.keys(statusCounts).map((key) => ({
    name: key,
    count: statusCounts[key as keyof typeof statusCounts],
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#4CAF50" barSize={50} />
      </BarChart>
    </ResponsiveContainer>
  );
}
