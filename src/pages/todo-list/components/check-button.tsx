import { taskService } from "@/service/task-service"
import { Box, IconButton } from "@chakra-ui/react"
import { Check } from "@phosphor-icons/react"

interface CheckButtonProps {
   done: boolean
   taskId: string
   onTaskUpdated: () => Promise<void>
}

export function CheckButton({ done, taskId, onTaskUpdated }: CheckButtonProps) {
  async function handleCompleteTask() {
    try {
      await taskService.updateStatus(taskId, !done)
      onTaskUpdated()
    } catch (error) {
      console.error("Erro ao marcar a task como concluída:", error)
    }
  }

  return (
    <IconButton
      aria-label="Mark as done"
      onClick={(e) => {
        e.stopPropagation()
        handleCompleteTask()
      }}
      variant="solid"
      size="xs"
      borderRadius="full"
      bg={done ? "green.500" : "gray.700"}
      color="white"
      _hover={{
        bg: done ? "green.400" : "gray.400",
      }}
      position="relative"
    >
      <Box
        as="span"
        position="absolute"
        inset="0"
        display="flex"
        alignItems="center"
        justifyContent="center"
        opacity={0} 
        _hover={{
          opacity: 1, 
        }}
      >
        <Check />
      </Box>
      {done ? <Check /> : <></>}
    </IconButton>
  )
}