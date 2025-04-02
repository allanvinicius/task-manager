import { TaskList } from "./task-list";
import { Container } from "@/components/Container";

export function TaskPage() {
  return (
    <section className="flex flex-col w-full">
      <Container>
        <TaskList />
      </Container>
    </section>
  );
}
