import { FormEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { TaskFormProps } from "@/types";

export function TaskForm({ initialData, onSubmit }: TaskFormProps) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [status, setStatus] = useState(initialData?.status || "TODO");
  const [priority, setPriority] = useState(initialData?.priority || "MEDIUM");

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    onSubmit({ title, status, priority });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Título"
      />
      <Select
        options={[
          { value: "TODO", label: "A Fazer" },
          { value: "IN_PROGRESS", label: "Em Andamento" },
          { value: "DONE", label: "Concluída" },
        ]}
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      />
      <Select
        options={[
          { value: "LOW", label: "Baixa" },
          { value: "MEDIUM", label: "Média" },
          { value: "HIGH", label: "Alta" },
        ]}
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      />
      <Button type="submit">Salvar</Button>
    </form>
  );
}
