import { TodoList } from "@/@types/TodoList"
import { VStack } from "@chakra-ui/react"
import { TodoListCard } from "./todo-list-card"

type TodoListCardsProps = {
  todoLists: TodoList[]
  filterUndeletedTodoList: (id: string) => void
  updateTodoList: (todoList: TodoList) => void
}

export function TodoListCards({ todoLists, filterUndeletedTodoList, updateTodoList }: TodoListCardsProps) {
  return (
    <VStack width="100%" as="div" mb="4rem">
      {todoLists.map((todoList) => (
        <TodoListCard
          updateTodoList={updateTodoList}
          key={todoList.id}
          todoList={todoList}
          filterUndeletedTodoList={filterUndeletedTodoList}
        />
      ))}
    </VStack>
  )
}
