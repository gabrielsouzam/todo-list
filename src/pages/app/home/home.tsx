import { TodoList } from "@/@types/TodoList"
import { ProgressCircleRing, ProgressCircleRoot } from "@/components/ui/progress-circle"
import { todoListService } from "@/service/todo-list-service"
import { Box, Flex, Input, Text } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { SelectPriority } from "./components/select-priority"
import { TodoListCards } from "./components/todo-lists-cards"
import { getUserIdFromToken } from "@/utils/get-user-id-from-token"
import { AppHeader } from "@/pages/_layouts/components/app-header"

export function Home() {
  const [todoLists, setTodoLists] = useState<TodoList[]>([])
  const [filteredTodoLists, setFilteredTodoLists] = useState<TodoList[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const [searchQuery, setSearchQuery] = useState<string>("")
  const [priorityFilter, setPriorityFilter] = useState<string>("")

  useEffect(() => {
    async function fetchTodoLists() {
      const userId = getUserIdFromToken()

      if (!userId) {
        return
      }

      try {
        setLoading(true)
        const data = await todoListService.getAllByUserId(userId)
        setTodoLists(data.todo_lists)
        setFilteredTodoLists(data.todo_lists)
        setLoading(false)
      } catch {
        setError("Não foi possível carregar as TodoLists.")
        setLoading(false)
      }
    }

    fetchTodoLists()
  }, [])

  useEffect(() => {
    const filteredList = todoLists.filter((todoList) => {
      const matchesPriority = priorityFilter === "" || todoList.priority === priorityFilter
      const matchesSearch = todoList.title.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesPriority && matchesSearch
    })
    setFilteredTodoLists(filteredList)
  }, [priorityFilter, searchQuery, todoLists])

  function filterUndeletedTask(id: string) {
    const filteredList = filteredTodoLists.filter((todoList) => {
      return todoList.id !== id
    })

    setFilteredTodoLists(filteredList)
  }

  if (loading) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100vh"
      >
        <ProgressCircleRoot value={null} size="lg" color="gray.500">
          <ProgressCircleRing cap="round" />
        </ProgressCircleRoot>

        <Text fontSize="xl" fontWeight="bold" color="blue.400" mt="1rem">
          Buscando Todo Lists...
        </Text>
        <Text fontSize="md" color="gray.400">
          Por favor, aguarde enquanto carregamos os dados.
        </Text>
      </Box>
    )
  }

  if (error) {
    return (
      <Box as="main" mt="6rem" mx="auto" maxW="1200px" textAlign="center">
        <Text fontSize="2xl" fontWeight="bold" color="red.500">
          {error}
        </Text>
      </Box>
    )
  }

  return (
    <>

      <AppHeader />
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
          <Input
            placeholder="Busque por uma todo list"
            size="lg"
            height="3rem"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <SelectPriority onSelect={(value) => setPriorityFilter(value)} />
        </Flex>

        <TodoListCards 
          todoLists={filteredTodoLists} 
          filterUndeletedTask={filterUndeletedTask} 
        />
      </Box>
    </>


  )
}
