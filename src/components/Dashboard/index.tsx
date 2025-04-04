"use client";

import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Analytics } from "@/components/Analytics";
import { TaskCreate } from "@/components/Tasks/task-create";
import { TaskList } from "@/components/Tasks/task-list";

export function Dashboard() {
  const [activeTab, setActiveTab] = useState<"create" | "tasks" | "analytics">(
    "create"
  );

  return (
    <>
      <Sidebar setActiveTab={setActiveTab} activeTab={activeTab} />

      {activeTab === "create" && <TaskCreate />}
      {activeTab === "tasks" && <TaskList />}
      {activeTab === "analytics" && <Analytics />}
    </>
  );
}
