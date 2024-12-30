import { Field } from "@/components/ui/field";
import { Radio, RadioGroup } from "@/components/ui/radio";
import { SegmentedControl } from "@/components/ui/segmented-control";
import { Box, Button, Fieldset, Flex, HStack, Input } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Text } from "@chakra-ui/react";
import { IconSelector } from "./components/icon-selector";
import { z } from "zod";
import { ColorPicker } from "./components/color-picker";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { todoListService } from "@/service/todo-list-service";

const scopes = [
  { label: "Trabalho", value: "work" },
  { label: "Estudo", value: "study" },
  { label: "Pessoal", value: "personal" },
  { label: "Casa", value: "household" },
  { label: "Social", value: "social" },
];

const priorityMap = {
  Baixa: "low",
  Média: "medium",
  Alta: "high",
} as const;

type PriorityKey = keyof typeof priorityMap;


const createTodoListSchema = z.object({
  title: z.string().min(1, { message: "O campo título é obrigatório" }).max(100),
  subtitle: z.string().optional(),
  scope: z.enum(["work", "study", "personal", "household", "social"], { message: "Escolha um escopo para o todo list" }),
  icon: z.string().optional().default("default-icon"),
  color: z
    .string({ message: "Você deve selecionar uma cor" })
    .refine(
      (value) => /^rgba\((\d{1,3}), (\d{1,3}), (\d{1,3}), (0|1|0?\.\d+)\)$/.test(value),
      { message: "Formato inválido" }
    )
    .transform((value) => {
      const rgba = value.match(/^rgba\((\d{1,3}), (\d{1,3}), (\d{1,3}), (0|1|0?\.\d+)\)$/);
      if (!rgba) return "#ffffff";

      const r = parseInt(rgba[1]).toString(16).padStart(2, "0");
      const g = parseInt(rgba[2]).toString(16).padStart(2, "0");
      const b = parseInt(rgba[3]).toString(16).padStart(2, "0");

      return `#${r}${g}${b}`;
    }),
  priority: z.enum(["low", "medium", "high"]).optional().default("medium"),
});

export type CreateTodoListForm = z.infer<typeof createTodoListSchema>;

export function CreateTodoList() {
  const [isFormSubmitting, setFormSubmitting] = useState(false);

  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors }, control } = useForm<CreateTodoListForm>({
    resolver: zodResolver(createTodoListSchema),
    defaultValues: {
      color: "rgba(255, 255, 255, 1)"
    }
  });

  async function handleCreateTodoList(data: CreateTodoListForm) {
    try {
      setFormSubmitting(true)
      await todoListService.create(data) 
      navigate("/"); 
    } catch (error) {
      console.error("Erro ao criar a Todo List:", error)
    } finally {
      setFormSubmitting(false)
    }
  }

  return (
    <Box
      as="main"
      mt="6rem"
      mb="1rem"
      mx="auto"
      maxW="50rem"
      boxShadow="sm"
      p="2rem"
      background="gray.950"
      borderRadius="md"
    >
      <Text textStyle="3xl" fontWeight="semibold" textAlign="center" mb="3rem">
        Crie Uma Todo List
      </Text>

      <form onSubmit={handleSubmit(handleCreateTodoList)}>
        <Flex direction="column" gap="1.5rem" mb="1rem">
          <Field 
            invalid={!!errors.title}
            errorText={errors.title?.message}
          >
            <Input
              placeholder="Título da todo List"
              {...register("title")}
            />
          </Field>
          <Input placeholder="Subtítulo da todo list (opcional)" {...register("subtitle")} />

          <Fieldset.Root invalid={!!errors.scope}>
            <Fieldset.Legend>Selecione o escopo</Fieldset.Legend>
            <Controller
              name="scope"
              control={control}
              render={({ field }) => (
                <RadioGroup
                  name={field.name}
                  value={field.value}
                  size="sm"
                  onValueChange={({ value }) => {
                    field.onChange(value);
                  }}
                >
                  <HStack gap="6">
                    {scopes.map((scope) => (
                      <Radio
                        key={scope.value}
                        value={scope.value}
                        inputProps={{ onBlur: field.onBlur }}
                      >
                        {scope.label}
                      </Radio>
                    ))}
                  </HStack>
                </RadioGroup>
              )}
            />
            {errors.scope && (
              <Fieldset.ErrorText>{errors.scope?.message}</Fieldset.ErrorText>
            )}
          </Fieldset.Root>

          <Controller
            control={control}
            name="priority"
            render={({ field }) => (
              <Field
                label="Prioridade"
                invalid={!!errors.priority}
                errorText={errors.priority?.message}
              >
                <SegmentedControl
                  mt="0.5rem"
                  onBlur={field.onBlur}
                  name={field.name}
                  value={Object.keys(priorityMap).find(
                    (key) => priorityMap[key as PriorityKey] === field.value
                  ) || "Média"}
                  items={["Baixa", "Média", "Alta"]}
                  onValueChange={({ value }) =>
                    field.onChange(priorityMap[value as PriorityKey])
                  }
                />
              </Field>
            )}
          />

          <Controller
            control={control}
            name="icon"
            render={({ field }) => (
              <IconSelector value={field.value} onChange={field.onChange} />
            )}
          />

          <Controller
            control={control}
            name="color"
            render={({ field }) => (
              <Field
                label="Selecine uma cor"
                invalid={!!errors.color}
                errorText={errors.color?.message}
              >
                <ColorPicker value={field.value} onChange={field.onChange} />
              </Field>
            )}
          />
        </Flex>

        <Flex justify="flex-end">
          <Button type="submit" colorPalette="blue" variant="surface" disabled={isFormSubmitting}>
            Criar todo list
          </Button>
        </Flex>
      </form>
    </Box>
  );
}
