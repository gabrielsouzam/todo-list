import { CaretDown } from "@phosphor-icons/react";
import {
  createListCollection,
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "@chakra-ui/react";

const priority = createListCollection({
  items: [
    { label: "Todas", value: "" },
    { label: "Baixa", value: "low" },
    { label: "Média", value: "medium" },
    { label: "Alta", value: "high" },
  ],
});

interface SelectPriorityProps {
  onSelect: (value: string) => void;
}

export function SelectPriority({ onSelect }: SelectPriorityProps) {
  return (
    <SelectRoot
      collection={priority}
      size="lg"
      width="20rem"
      onValueChange={({ value }) => onSelect(value[0])}
      style={{ position: "relative"}}
    >
      <SelectTrigger
        cursor="pointer"
        height="3rem"
        bg="gray.950"
        borderRadius="md"
        border="1px solid"
        borderColor="gray.800"
        _hover={{ borderColor: "gray.700" }}
      >
        <SelectValueText placeholder="Filtre por prioridade" />
        <CaretDown size={16} />
      </SelectTrigger>
      <SelectContent
        position="absolute"
        top="120%"
        left="0"
        bg="white"
        background="gray.950"
        border="1px solid"
        borderColor="gray.900"
        boxShadow="md"
        zIndex={10}
        width="100%"
      >
        {priority.items.map((priority) => (
          <SelectItem item={priority} key={priority.value} cursor="pointer" _hover={{ bg: "gray.700" }}>
            {priority.label}
          </SelectItem>
        ))}
      </SelectContent>
    </SelectRoot>
  );
}
