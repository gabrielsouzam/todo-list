import { taskService } from "@/service/task-service"
import { Box, IconButton } from "@chakra-ui/react"
import { Check } from "@phosphor-icons/react"
import { useState } from "react"

interface CheckButtonProps {
   done: boolean
   taskId: string
   onTaskUpdated: () => Promise<void>
}

export function CheckButton({ done, taskId, onTaskUpdated }: CheckButtonProps) {
  const [isDone, setIsDone] = useState<boolean>(done)

  async function handleCompleteTask() {
    try {
      await taskService.updateStatus(taskId, !done)
      setIsDone(!done)
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
      bg={isDone ? "green.500" : "gray.700"}
      color="white"
      _hover={{
        bg: isDone ? "green.400" : "gray.400",
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
      {isDone ? <Check /> : <></>}
    </IconButton>
  )
}