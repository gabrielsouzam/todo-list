import { Task } from "@/@types/Task";
import { Box, Text, Stack } from "@chakra-ui/react";
import { TaskCard } from "./task-card";

interface TaskCardsListProps {
  tasks: Task[];
  onTaskUpdated: () => Promise<void>
}

export function TaskCardsList({ tasks, onTaskUpdated }: TaskCardsListProps) {
  const priorities = {
    high: { label: "Prioridade alta", color: "red.500" },
    medium: { label: "Prioridade média", color: "blue.500" },
    low: { label: "Prioridade baixa", color: "green.500" },
  };

  return (
    <Box>
      {Object.entries(priorities).map(([priority, { label, color }]) => {
        const filteredTasks = tasks.filter((task) => task.priority === priority);

        if (filteredTasks.length === 0) return null;

        return (
          <Box key={priority} mb="2rem">
            <Text fontSize="xl" fontWeight="bold" mb="1rem" color={color}>
              {label}
            </Text>
            <Stack spaceY="1rem">
              {filteredTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onTaskUpdated={onTaskUpdated}
                />
              ))}
            </Stack>
          </Box>
        );
      })}
    </Box>
  );
}
