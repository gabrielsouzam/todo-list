import { Task } from "@/@types/Task"
import { formatDeadline } from "@/utils/format-deadline"
import { Box, Flex, IconButton, Text } from "@chakra-ui/react"
import { Pencil, Trash } from "@phosphor-icons/react"
import { CheckButton } from "./check-button"
import { DialogRoot, DialogTrigger } from "@/components/ui/dialog"
import { DeleteTaskModal } from "./delete-task-modal"
import { UpdateTaskModal } from "./update-task-modal"

interface TaskCardProps {
  task: Task
  onTaskUpdated: () => Promise<void>
}

export function TaskCard({ task, onTaskUpdated }: TaskCardProps) {
  return (
    <Flex
      width="100%"
      py="1.25rem"
      px="1rem"
      bg="gray.900"
      alignItems="center"
      justifyContent="space-between"
      gap="1rem"
      borderRadius="md"
      boxShadow="sm"
      borderWidth="1px"
      borderColor="gray.900"
    >

      <Flex alignItems="center" gap="1rem">
        <CheckButton
          done={task.done}
          taskId={task.id}
          onTaskUpdated={onTaskUpdated}
        />
        <Box>
          <Text fontSize="lg" fontWeight="bold" mb="0.25rem">
            {task.title}
          </Text>
          <Text fontSize="sm" color="gray.400" >
            {task.description}
          </Text>
        </Box>
      </Flex>


      <Flex flexDir="column" alignItems="end" gap="0.75rem">
        <Flex alignItems="center" justifyContent="center">


          <DialogRoot>
            <DialogTrigger asChild>
              <IconButton
                onClick={(e) => {
                  e.stopPropagation()
                }}
                _hover={{ color: "gray.500", background: "gray.900" }}
                size="md"
                variant="ghost"
              >
                <Pencil weight="bold" />
              </IconButton>
            </DialogTrigger>
            <UpdateTaskModal task={task} onTaskUpdated={onTaskUpdated} />
          </DialogRoot>
          
          <DialogRoot>
            <DialogTrigger asChild>
              <IconButton
                onClick={(e) => {
                  e.stopPropagation()
                }}
                _hover={{ color: "red.500", background: "gray.900" }}
                size="md"
                variant="ghost"
              >
                <Trash weight="bold" />
              </IconButton>
            </DialogTrigger>
            <DeleteTaskModal title={task.title} id={task.id} updateTasks={onTaskUpdated} />
          </DialogRoot>

        </Flex>

        {task.done ? <Text fontSize="sm" color="gray.400">Tarefa completada!</Text> :
          <Text fontSize="sm" color="gray.400">
            {task.deadline ? formatDeadline(task.deadline) : "Sem prazo"}
          </Text>
        }


      </Flex >


    </Flex >
  )
}