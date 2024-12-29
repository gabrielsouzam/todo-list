import { iconMap } from "@/utils/icon-map";
import { Box, Grid, IconButton, Text } from "@chakra-ui/react";

export function IconSelector({
  value,
  onChange,
}: {
  value: string | null;
  onChange: (selectedIcon: string) => void;
}) {
  return (
    <Box
      w="100%"
      mx="auto"
      p="1rem"
      background="gray.900"
      borderRadius="md"
      boxShadow="md"
    >
      <Text fontSize="lg" fontWeight="bold" color="white" mb="1rem" textAlign="center">
        Selecione um ícone
      </Text>
      <Grid templateColumns="repeat(auto-fill, minmax(3rem, 1fr))" gap="1rem">
        {Object.entries(iconMap).map(([key, Icon]) => (
          <IconButton
            key={key}
            aria-label={key}
            onClick={() => onChange(key)}
            bg={value === key ? "blue.700" : "gray.700"}
            color="white"
            _hover={{ bg: "blue.600" }}
          >
            <Icon size={24} />
          </IconButton>
        ))}
      </Grid>
    </Box>
  );
}
