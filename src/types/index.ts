export type TaskStatus = "A Fazer" | "Em Andamento" | "Concluída";

export type TaskPriority = "Alta" | "Média" | "Baixa";

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  favorite: boolean;
  createdAt: Date;
}

export interface TaskContextProps {
  tasks: Task[];
  addTask: (task: Omit<Task, "id">) => void;
  updateTask: (id: string, data: Omit<Task, "id">) => void;
  deleteTask: (id: string) => void;
  toggleFavorite: (id: string) => void;
  duplicateTask: (id: string) => void;
}

export interface TaskListProps {
  tasks: Task[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onToggleFavorite: (id: string) => void;
  onDuplicate: (id: string) => void;
}


export interface TaskFormProps {
  initialData?: Task;
  onSubmit: (data: Omit<Task, "id">) => void;
}