import { Button } from "@/components/ui/button"
import {
  DialogActionTrigger,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"
import { todoListService } from "@/service/todo-list-service"
import { Text } from "@chakra-ui/react"
import { useState } from "react"

interface DeleteTodoListModalProps {
  id: string
  title: string
  updateTodoLists: () => void
}

export function DeleteTodoListModal({ id, title, updateTodoLists }: DeleteTodoListModalProps) {
  const [isFormSubmitting, setFormSubmitting] = useState(false)

  async function handleDeleteTask() {
    try {
      setFormSubmitting(true)
      await todoListService.delete(id)
      updateTodoLists()
    } catch (error) {
      console.error(error)
    } finally {
      setFormSubmitting(false)
    }
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>
          Deseja deletar todo list  <Text display="inline" color="red.500">{title}</Text>?
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