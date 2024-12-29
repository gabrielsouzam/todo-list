import { useEffect, useState } from "react";
import { Box, Flex, Input, Text } from "@chakra-ui/react";
import { EmptyState } from "@/components/ui/empty-state"
import { SelectPriority } from "./components/select-priority";
import { TodoList } from "@/@types/TodoList";
import { todoListService } from "@/service/todo-list-service";
import { TodoListCards } from "./components/todo-lists-cards";
import { MagnifyingGlass } from "@phosphor-icons/react";

export function Home() {
  const [todoLists, setTodoLists] = useState<TodoList[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTodoLists = async () => {
      try {
        setLoading(true);
        const data = await todoListService.getAll();
        setTodoLists(data.todo_lists);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar TodoLists:", error);
        setError("Não foi possível carregar as TodoLists.");
        setLoading(false);
      }
    };

    fetchTodoLists();
  }, []);

  if (loading) {
    return (
      <EmptyState
        icon={<MagnifyingGlass />}
        title="Buscando todo-list"
        description="Aguarde... "
      />
    );
  }

  if (error) {
    return (
      <Box as="main" mt="6rem" mx="auto" maxW="1200px" textAlign="center">
        <Text fontSize="2xl" fontWeight="bold" color="red.500">
          {error}
        </Text>
      </Box>
    );
  }

  return (
    <Box
      as="main"
      mt="6rem"
      mx="auto"
      maxW="1200px"
      textAlign="center"
    >
      <Text fontSize="2xl" fontWeight="bold">
        Bem-vindo ao todo list!
      </Text>
      <Text mt="4" mb="2rem" fontSize="lg" color="gray.600">
        Organize suas tarefas do dia a dia.
      </Text>

      <Flex gap="0.25rem" align="baseline" mb="3rem">
        <Input placeholder="Busque por uma todo list" size="lg" height="3rem" />
        <SelectPriority />
      </Flex>

      <TodoListCards todoLists={todoLists} />
    </Box>
  );
}
