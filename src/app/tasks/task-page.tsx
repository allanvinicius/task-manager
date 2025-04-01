import { TaskList } from "./task-list";
import { ContainerGrid } from "@/components/container";

export function TaskPage() {
  return (
    <section className="flex flex-col w-full">
      <ContainerGrid>
        <TaskList />
      </ContainerGrid>
    </section>
  );
}
