import { TaskList } from "./task-list";
import { Container } from "@/components/Container";

export function Task() {
  return (
    <section className="w-full flex flex-col">
      <Container>
        <TaskList />
      </Container>
    </section>
  );
}
