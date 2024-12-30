import { Task } from "@/@types/Task"
import { TodoList as TodoListType } from "@/@types/TodoList"
import { Button } from "@/components/ui/button"
import {
  DialogRoot,
  DialogTrigger
} from "@/components/ui/dialog"
import {
  ProgressCircleRing,
  ProgressCircleRoot,
} from "@/components/ui/progress-circle"
import { taskService } from "@/service/task-service"
import { todoListService } from "@/service/todo-list-service"
import { useScrollToTop } from "@/utils/use-scrool-top"
import { Box, Flex, Text } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { DynamicIcon } from "../home/components/dynamic-icon"
import { CreateTaskModal } from "./components/create-task-modal"
import { TaskCardsList } from "./components/tasks-cards-list"

export function TodoList() {
  useScrollToTop()

  const { id } = useParams()
  const [todoList, setTodoList] = useState<TodoListType>()
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  async function updateTasks() {
    if (id) {
      const tasks = await taskService.getByTodoList(id)
      const todoList = await todoListService.getById(id)

      setTasks(tasks)
      setTodoList(todoList)
    }
  }

  useEffect(() => {
    async function getAllTaskForTodoList() {
      if (id !== undefined) {
        try {
          setLoading(true)
          const tasks = await taskService.getByTodoList(id)
          const todoList = await todoListService.getById(id)

          setTasks(tasks)
          setTodoList(todoList)
          setLoading(false)
        } catch {
          setLoading(false)
        }
      }
    }

    getAllTaskForTodoList()
  }, [id])

  if (!todoList || loading) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100vh"
        bg="gray.950"
      >
        <ProgressCircleRoot value={null} size="lg" color="blue.500">
          <ProgressCircleRing cap="round" />
        </ProgressCircleRoot>

        <Text fontSize="xl" fontWeight="bold" color="blue.400" mt="1rem">
          Buscando Tasks...
        </Text>
        <Text fontSize="md" color="gray.400">
          Por favor, aguarde enquanto carregamos os dados.
        </Text>
      </Box>
    )
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
              Criar Tarefa
            </Button>
          </DialogTrigger>
          <CreateTaskModal todoListId={todoList.id} onTaskCreated={updateTasks} />
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

      <TaskCardsList tasks={tasks} onTaskUpdated={updateTasks} />

    </Box>
  )
}
