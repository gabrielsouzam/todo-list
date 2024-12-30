import { TodoList } from "@/@types/TodoList"
import { ProgressBar } from "@/components/ui/progress"
import { Tag } from "@/components/ui/tag"
import { Box, Button, Flex, ProgressRoot, Text } from "@chakra-ui/react"
import { Trash } from "@phosphor-icons/react"
import { useNavigate } from "react-router-dom"
import { DynamicIcon } from "./dynamic-icon"

interface TodoListCardProps {
  todoList: TodoList
  onDelete: (id: string) => void
}

function getPriorityColor(priority: "low" | "medium" | "high") {
  switch (priority) {
    case "low":
      return "green"
    case "medium":
      return "yellow"
    case "high":
      return "red"
    default:
      return "gray"
  }
}

function getPriorityText(priority: "low" | "medium" | "high") {
  switch (priority) {
    case "low":
      return "Baixa"
    case "medium":
      return "Média"
    case "high":
      return "Alta"
  }
}

function getScopeText(scope: "work" | "study" | "personal" | "household" | "social") {
  switch (scope) {
    case "work":
      return "Trabalho";
    case "study":
      return "Estudo";
    case "personal":
      return "Pessoal";
    case "household":
      return "Casa";
    case "social":
      return "Social";
  }
}


export function TodoListCard({ todoList, onDelete }: TodoListCardProps) {
  const navigate = useNavigate()

  const completedPercentage = Math.round(
    (todoList.tasks_done / (todoList.task_count || 1)) * 100
  )

  function navigateToTodoList(id: string) {
    navigate(`/todo-list/${id}`)
  }

  return (
    <Flex
      width="100%"
      py="0.5rem"
      px="1rem"
      bg="gray.950"
      alignItems="center"
      gap="1rem"
      borderRadius="md"
      boxShadow="sm"
      borderWidth="1px"
      borderColor={completedPercentage === 100 ? "green.700" : "gray.900"}
      cursor="pointer"
      _hover={{ bg: "gray.900" }}
      onClick={() => navigateToTodoList(todoList.id)}
      position="relative"
    >
      <DynamicIcon icon={todoList.icon} color={todoList.color} size={32} />

      <Box textAlign="left" flex="1">
        <Text fontSize="lg" fontWeight="bold" color={todoList.color}>
          {todoList.title}
        </Text>
        <Text fontSize="sm" color="gray.400" mb="0.75rem">
          {todoList.subtitle}
        </Text>
        <Flex alignItems="center" gap="0.5rem" mb="1.5rem" >
          <Tag colorScheme="blue" size="sm">
            {getScopeText(todoList.scope)}
          </Tag>
          <Tag colorPalette={getPriorityColor(todoList.priority)} size="sm">
            {getPriorityText(todoList.priority)}
          </Tag>
        </Flex>
        <Box>
          <ProgressRoot
            value={completedPercentage}
            colorPalette={completedPercentage === 100 ? "green" : "gray"}
            variant="subtle"
          >
            <ProgressBar />
          </ProgressRoot>

          <Text fontSize="xs" color="gray.400" mt="0.75rem" textAlign="right">
            {completedPercentage}% concluído
          </Text>
        </Box>
      </Box>

      <Button
        onClick={(e) => {
          e.stopPropagation()
          onDelete(todoList.id)
        }}
        _hover={{ color: "red.500" }}
        size="sm"
        variant="ghost"
        colorScheme="red"
        position="absolute"
        top="0.5rem"
        right="0.5rem"
      >
        <Trash weight="bold" />
      </Button>
    </Flex>
  )
}


