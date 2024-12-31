import { Button } from "@/components/ui/button"
import {
  DialogActionTrigger,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"
import { Text } from "@chakra-ui/react"
import { taskService } from "@/service/task-service"
import { useState } from "react"

interface DeleteTaskModalProps {
  id: string
  title: string
  updateTasks: () => Promise<void>
}



export function DeleteTaskModal({ id, title, updateTasks }: DeleteTaskModalProps) {
  const [isFormSubmitting, setFormSubmitting] = useState(false)

  async function handleDeleteTask() {
    try {
      setFormSubmitting(true)
      await taskService.delete(id)
      updateTasks()
    } catch (error) {
      console.error(error)
    } finally {
      setFormSubmitting(false)
    }
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Deseja deletar a task
          {" "}<Text display="inline" color="red.500">{title}</Text>?
        </DialogTitle>
      </DialogHeader>
      <DialogFooter>
        <DialogActionTrigger asChild>
          <Button variant="outline">Cancelar</Button>
        </DialogActionTrigger>
        <DialogActionTrigger asChild>
          <Button
            variant="solid"
            colorPalette="red"
            onClick={handleDeleteTask}
            disabled={isFormSubmitting}
          >
            Confirmar
          </Button>
        </DialogActionTrigger>
      </DialogFooter>
      <DialogCloseTrigger />
    </DialogContent>
  )


}