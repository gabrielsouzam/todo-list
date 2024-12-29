import { CaretDown } from "@phosphor-icons/react";
import {
  createListCollection,
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText
} from "@chakra-ui/react";

const priority = createListCollection({
  items: [
    { label: "Baixa", value: "baixa" },
    { label: "Média", value: "media" },
    { label: "Alta", value: "alta" },
  ],
});

export function SelectPriority() {
  return (
    <SelectRoot collection={priority} size="lg" width="20rem" style={{ position: "relative" }}>
      <SelectTrigger cursor="pointer" height="1rem"  >
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
          <SelectItem item={priority} key={priority.value} cursor="pointer">
            {priority.label}
          </SelectItem>
        ))}
      </SelectContent>
    </SelectRoot>
  );
}
