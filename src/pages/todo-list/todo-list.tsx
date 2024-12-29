import { Button } from "@/components/ui/button";
import {
  DialogRoot,
  DialogTrigger
} from "@/components/ui/dialog";
import { mockTasks } from "@/data/mock-tasks";
import { mockTodoLists } from "@/data/mock-todolist";
import { useScrollToTop } from "@/utils/use-scrool-top";
import { Box, Flex, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { DynamicIcon } from "../home/components/dynamic-icon";
import { CreateTaskModal } from "./components/create-task-modal";
import { TaskCardsList } from "./components/tasks-cards-list";

export function TodoList() {
  useScrollToTop();
  
  const { id } = useParams();

  const todoList = mockTodoLists.find((todoList) => todoList.id === id);
  const task = mockTasks.find((task) => task.id === "2");

  if (!todoList) {
    return <div>Todo List não encontrada!</div>;
  }

  if (!task) {
    return <div>Todo List não encontrada!</div>;
  }

  return (
    <Box
      as="main"
      mt="6rem"
      mb="1rem"
      mx="auto"
      maxW="65rem"
      boxShadow="sm"
      p="2rem"
      background="gray.950"
      borderRadius="md"
    >
      <Flex justifyContent="space-between" alignItems="center" mb="2rem">

        <Flex gap="1rem" alignItems="center">
          <DynamicIcon icon={todoList.icon} color={todoList.color} size={32} />

          <Text textStyle="3xl" fontWeight="semibold" >
            {todoList.title}
          </Text>
        </Flex>

        <DialogRoot>
          <DialogTrigger asChild>
            <Button variant="outline" size="md" >
              Criar Task
            </Button>
          </DialogTrigger>
          <CreateTaskModal todoListId={todoList.id} />
        </DialogRoot>

      </Flex >

      <Flex justifyContent="space-between" mb="2rem">
        <Flex alignItems="center" gap="0.5rem">
          <Text fontWeight="bold" fontSize="sm" color={todoList.color}>
            Tarefas criadas
          </Text>
          <Flex
            background="gray.800"
            py="1"
            px="2"
            rounded="full"
            alignItems="center"
            justifyContent="center"
          >
            <Text fontWeight="bold" fontSize="sm">{todoList.task_count}</Text>
          </Flex>
        </Flex >

        <Flex alignItems="center" gap="0.5rem">
          <Text fontWeight="bold" fontSize="sm" color={todoList.color}>
            Tarefas concluídas
          </Text>
          <Flex
            background="gray.800"
            py="1"
            px="2"
            rounded="full"
            alignItems="center"
            justifyContent="center"
          >
            <Text fontWeight="bold" fontSize="sm">
              {todoList.tasks_done} de {todoList.task_count}
            </Text>
          </Flex>
        </Flex >
      </Flex>

      <TaskCardsList tasks={mockTasks} />


    </Box>
  )
}
