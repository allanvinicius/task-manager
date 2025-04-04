"use client";

import { useIsMobile } from "@/hooks/use-mobile";
import { SidebarProps } from "@/types";
import {
  ChartNoAxesColumn,
  ChartNoAxesGantt,
  Pencil,
  PanelLeft,
} from "lucide-react";
import { useState } from "react";

export function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const isMobile = useIsMobile();

  function handleTabChange(tab: "create" | "tasks" | "analytics") {
    setActiveTab(tab);
    if (isMobile) setIsOpen(false);
  }

  return (
    <>
      {isMobile ? (
        <>
          {isOpen && (
            <div
              className="fixed inset-0 bg-black/50 z-5"
              onClick={() => setIsOpen(false)}
            />
          )}

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="absolute top-4 left-4"
            title={isOpen ? "Fechar Menu" : "Abrir Menu"}
          >
            <PanelLeft className="size-6 text-white hover:opacity-75 transition-opacity" />
          </button>

          <aside
            className={`h-screen overflow-hidden text-white transition-transform duration-300 fixed top-0 left-0 z-10 w-[250px] bg-black p-6
            ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
          >
            <nav className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <PanelLeft className="size-6 text-white" />

                <span>Dashboard</span>
              </div>

              <button
                onClick={() => handleTabChange("create")}
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
                onClick={() => handleTabChange("tasks")}
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
                onClick={() => handleTabChange("analytics")}
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
        </>
      ) : (
        <aside
          className={`relative h-screen overflow-hidden bg-white/5 text-white p-6 w-full transition-all duration-300 ${
            isOpen ? "max-w-64" : "max-w-20"
          }`}
        >
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="mb-6 p-2 rounded-md flex items-center gap-2 cursor-pointer bg-white/10 hover:bg-white/20 transition"
            title={isOpen ? "Fechar Menu" : "Abrir Menu"}
          >
            <PanelLeft className="size-5" />
          </button>

          <h1
            className={`text-2xl font-bold mb-6 transition-opacity ${
              isOpen ? "opacity-100" : "opacity-0"
            }`}
          >
            Dashboard
          </h1>

          <nav className="flex flex-col gap-4">
            <button
              onClick={() => setActiveTab("create")}
              className={`flex items-center gap-4 p-2 cursor-pointer rounded-md transition-all ${
                activeTab === "create"
                  ? "bg-white text-black"
                  : "hover:bg-white hover:text-black"
              }`}
              title={!isOpen ? "Criar Tarefas" : ""}
            >
              <Pencil className="size-4" />
              {isOpen ? "Criar Tarefas" : ""}
            </button>

            <button
              onClick={() => setActiveTab("tasks")}
              className={`flex items-center gap-4 p-2 cursor-pointer rounded-md transition-all ${
                activeTab === "tasks"
                  ? "bg-white text-black"
                  : "hover:bg-white hover:text-black"
              }`}
              title={!isOpen ? "Gerenciar Tarefas" : ""}
            >
              <ChartNoAxesGantt className="size-4" />
              {isOpen && "Gerenciar Tarefas"}
            </button>

            <button
              onClick={() => setActiveTab("analytics")}
              className={`flex items-center gap-4 p-2 cursor-pointer rounded-md transition-all ${
                activeTab === "analytics"
                  ? "bg-white text-black"
                  : "hover:bg-white hover:text-black"
              }`}
              title={!isOpen ? "Analytics" : ""}
            >
              <ChartNoAxesColumn className="size-4" />
              {isOpen && "Analytics"}
            </button>
          </nav>
        </aside>
      )}
    </>
  );
}
