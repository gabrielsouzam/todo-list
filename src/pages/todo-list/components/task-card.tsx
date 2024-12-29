import { Task } from "@/@types/Task";
import { Box, Flex, IconButton, Text } from "@chakra-ui/react";
import { Check, X } from "@phosphor-icons/react";

interface TaskCardProps {
  task: Task
}

export function TaskCard({ task }: TaskCardProps) {
  return (
    <Flex
      width="100%"
      py="0.5rem"
      px="1rem"
      bg="gray.900"
      alignItems="center"
      gap="1rem"
      borderRadius="md"
      boxShadow="sm"
      borderWidth="1px"
      borderColor="gray.900"
      cursor="pointer"
      position="relative"
      _hover={{ bg: "gray.800" }}
    >
      <Box>
        <Text fontSize="lg" fontWeight="bold" mb="0.25rem">
          {task.title}
        </Text>
        <Text fontSize="sm" color="gray.400" >
          {task.description}
        </Text>
      </Box>

      <IconButton
        aria-label="Mark as done"
        onClick={(e) => {
          e.stopPropagation();
        }}
        size="xs"
        bg={task.done ? "green.500" : "red.500"}
        color="white"
        _hover={{ bg: task.done ? "green.400" : "red.400" }}
        position="absolute"
        top="0.5rem"
        right="0.5rem"
      >
        {task.done ? <Check size={16} /> : <X size={16} />}
      </IconButton>
    </Flex>
  )
}