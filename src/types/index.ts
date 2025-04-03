export interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export interface SidebarProps {
  activeTab: "create" | "tasks" | "analytics";
  setActiveTab: (tab: "create" | "tasks" | "analytics") => void;
}

export type TaskStatus = "A Fazer" | "Em Andamento" | "Concluída" | "Vazio";

export type TaskPriority = "Baixa" | "Média" | "Alta" | "Vazio";

export interface Subtask {
  id: string;
  title: string;
  completed: boolean;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  favorite: boolean;
  createdAt?: Date;
  subtasks?: Subtask[];
}

export interface TaskContextProps {
  tasks: Task[];
  addTask: (task: Task) => void;
  updateTask: (task: Task) => void;
  deleteTask: (id: string) => void;
  toggleFavorite: (id: string) => void;
  duplicateTask: (id: string) => void;
  expandedTaskId: string | null;
  setExpandedTaskId: (id: string | null) => void;
  // addSubtask: (taskId: string, title: string) => void;
  // toggleSubtaskCompletion: (taskId: string, subtaskIndex: number) => void;
  // updateSubtaskTitle: (
  //   taskId: string,
  //   subtaskIndex: number,
  //   newTitle: string
  // ) => void;
  // deleteSubtask: (taskId: string, subtaskIndex: number) => void;
  // duplicateSubtask: (taskId: string, subtaskIndex: number) => void;
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
