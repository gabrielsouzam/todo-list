import { TodoList } from "@/@types/TodoList"
import { Button } from "@/components/ui/button"
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Field } from "@/components/ui/field"
import { Radio, RadioGroup } from "@/components/ui/radio"
import { SegmentedControl } from "@/components/ui/segmented-control"
import { todoListService } from "@/service/todo-list-service"
import { Flex, HStack, Input } from "@chakra-ui/react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"
import { IconSelector } from "../../create-todo-list/components/icon-selector"

const scopes = [
  { label: "Trabalho", value: "work" },
  { label: "Estudo", value: "study" },
  { label: "Pessoal", value: "personal" },
  { label: "Casa", value: "household" },
  { label: "Social", value: "social" },
]

const priorityMap = {
  Baixa: "low",
  Média: "medium",
  Alta: "high",
} as const

type PriorityKey = keyof typeof priorityMap

const updateTodoListSchema = z.object({
  title: z.string().min(1, { message: "O campo título é obrigatório" }).max(100),
  subtitle: z.string().optional(),
  scope: z.enum(["work", "study", "personal", "household", "social"], { message: "Escolha um escopo para o todo list" }),
  icon: z.string().optional().default("default-icon"),
  priority: z.enum(["low", "medium", "high"]).optional().default("medium"),
})

export type UpdateTodoListForm = z.infer<typeof updateTodoListSchema>

interface UpdateTodoListModalProps {
  todoList: TodoList
  updateTodoList: (todoList: TodoList) => void
  permitNavigateToTasks: () => void
}

export function UpdateTodoListModal({ todoList, updateTodoList, permitNavigateToTasks }: UpdateTodoListModalProps) {
  const [isFormSubmitting, setFormSubmitting] = useState(false)

  const { register, handleSubmit, formState: { errors }, control } = useForm<UpdateTodoListForm>({
    resolver: zodResolver(updateTodoListSchema),
    defaultValues: {
      title: todoList.title,
      subtitle: todoList.subtitle || "",
      scope: todoList.scope,
      icon: todoList.icon || "default-icon",
      priority: todoList.priority,
    },
  })

  function uptadeTodoListObject(data: UpdateTodoListForm) {
    const updatedTodoList = {
      ...todoList,
      ...data,
    }

    updateTodoList(updatedTodoList)
  }

  async function onUpdateTodoList(data: UpdateTodoListForm) {
    try {
      setFormSubmitting(true)
      
      await todoListService.update(todoList.id, data)
      permitNavigateToTasks()
      uptadeTodoListObject(data)
    } catch (error) {
      console.error("Erro ao atualizar a Todo List:", error)
    } finally {
      setFormSubmitting(false)
    }
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Atualizar Todo List</DialogTitle>
      </DialogHeader>
      <form onSubmit={handleSubmit(onUpdateTodoList)}>
        <DialogBody>
          <Flex flexDirection="column" gap="1.5rem">
            <Field invalid={!!errors.title} errorText={errors.title?.message}>
              <Input placeholder="Título da todo list" {...register("title")} />
            </Field>

            <Input placeholder="Subtítulo da todo list (opcional)" {...register("subtitle")} />

            <Field label="Selecione o escopo" invalid={!!errors.scope} errorText={errors.scope?.message}>
              <Controller
                name="scope"
                control={control}
                render={({ field }) => (
                  <RadioGroup
                    name={field.name}
                    value={field.value}
                    size="sm"
                    onValueChange={({ value }) => {
                      field.onChange(value)
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
            </Field>

            <Controller
              name="priority"
              control={control}
              render={({ field }) => (
                <Field label="Prioridade" invalid={!!errors.priority} errorText={errors.priority?.message}>
                  <SegmentedControl
                    value={Object.keys(priorityMap).find(
                      key => priorityMap[key as PriorityKey] === field.value
                    ) || "Média"}
                    items={["Baixa", "Média", "Alta"]}
                    onValueChange={({ value }) => field.onChange(priorityMap[value as PriorityKey])}
                  />
                </Field>
              )}
            />

            <Controller
              name="icon"
              control={control}
              render={({ field }) => (
                <Field label="Ícone">
                  <IconSelector value={field.value} onChange={field.onChange} />
                </Field>
              )}
            />
          </Flex>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogActionTrigger>
          <DialogActionTrigger asChild>
            <Button type="submit" colorPalette="blue" disabled={isFormSubmitting}>
              Atualizar Todo List
            </Button>
          </DialogActionTrigger>
        </DialogFooter>
      </form>
      <DialogCloseTrigger />
    </DialogContent>
  )
}
