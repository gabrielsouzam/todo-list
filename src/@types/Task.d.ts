export interface Task {
  id: string
  title: string
  description?: string
  priority: "low" | "medium" | "high"
  done: boolean
  deadline?: string
  position: number
  createdAt: string
  updatedAt: string
  todoListId: string
}
