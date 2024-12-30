import { Button } from "@/components/ui/button"
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"
import { Field } from "@/components/ui/field"
import { SegmentedControl } from "@/components/ui/segmented-control"
import { convertToIsoFormat } from "@/utils/convert-to-iso-format"
import { CreateTaskPayload, taskService } from "@/service/task-service"
import { Flex, Input } from "@chakra-ui/react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"

interface CreateTaskModalProps {
  todoListId: string
  onTaskCreated: () => Promise<void>
}

const priorityMap = {
  Baixa: "low",
  Média: "medium",
  Alta: "high",
} as const

type PriorityKey = keyof typeof priorityMap

const createTaskSchema = z.object({
  title: z.string().min(1, { message: "O campo título é obrigatório" }).max(100),
  description: z.string().min(1, { message: "O campo descrição é obrigatório" }).max(100),
  priority: z.enum(["low", "medium", "high"]).optional().default("medium"),
  date: z.string(),
  time: z.string(),
  todoListId: z.string(),
})

export type CreateTaskForm = z.infer<typeof createTaskSchema>

export function CreateTaskModal({ todoListId, onTaskCreated }: CreateTaskModalProps) {
  const [minTime, setMinTime] = useState("")
  const [isFormSubmitting, setFormSubmitting] = useState(false)

  useEffect(() => {
    const now = new Date()
    const hours = String(now.getHours()).padStart(2, "0")
    const minutes = String(now.getMinutes()).padStart(2, "0")
    setMinTime(`${hours}:${minutes}`)
  }, [])

  const { register, handleSubmit, formState: { errors }, reset, control } = useForm<CreateTaskForm>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      todoListId
    }
  })

  async function onCreateTask(data: CreateTaskForm) {
    try {
      setFormSubmitting(true)

      const deadline = convertToIsoFormat(data.date, data.time)

      const payload: CreateTaskPayload = {
        title: data.title,
        description: data.description,
        priority: data.priority,
        deadline,
        todo_list_id: data.todoListId,
      }

      await taskService.create(payload)
      reset()
      await onTaskCreated()
    } catch (error) {
      console.error("Erro ao criar a task:", error)
    } finally {
      setFormSubmitting(false)
    }
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Adicionar Task</DialogTitle>
      </DialogHeader>
      <form onSubmit={handleSubmit(onCreateTask)}>
        <DialogBody>
          <Flex flexDirection="column" gap="1rem">
            <Field
              invalid={!!errors.title}
              errorText={errors.title?.message}
            >
              <Input
                placeholder="Título da task"
                {...register("title")}
              />
            </Field>

            <Field
              invalid={!!errors.description}
              errorText={errors.description?.message}
            >
              <Input
                placeholder="Descrição da task"
                {...register("description")}
              />
            </Field>

            <Field
              invalid={!!errors.date}
              errorText={errors.date?.message}
            >
              <Input
                type="date"
                min={new Date().toISOString().split("T")[0]}
                placeholder="Descrição da task"
                {...register("date")}
              />
            </Field>
            <Field
              invalid={!!errors.time}
              errorText={errors.time?.message}
            >
              <Input
                type="time"
                min={minTime}
                placeholder="Descrição da task"
                {...register("time")}
              />
            </Field>

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
          </Flex>

        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogActionTrigger>
          <DialogActionTrigger asChild>
            <Button type="submit" colorPalette="blue" disabled={isFormSubmitting}>
              Criar task
            </Button>
          </DialogActionTrigger>
        </DialogFooter>
      </form>
      <DialogCloseTrigger />
    </DialogContent>
  )
}

