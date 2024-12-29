import { TodoList } from "@/@types/TodoList";
import { VStack } from "@chakra-ui/react";
import { TodoListCard } from "./todo-list-card";

type TodoListCardsProps = {
  todoLists: TodoList[];
};

export function TodoListCards({ todoLists }: TodoListCardsProps) {
  return (
    <VStack width="100%" as="div">
      {todoLists.map((todoList) => (
        <TodoListCard
          onDelete={() => {}}
          key={todoList.id}
          todoList={todoList}
        />
      ))}
    </VStack>
  );
}
