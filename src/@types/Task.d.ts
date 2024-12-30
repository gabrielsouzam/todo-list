export interface Task {
  id: string
  title: string
  description?: string
  priority: "low" | "medium" | "high"
  done: boolean
  deadline?: string
  created_at: string
  updated_at: string
  todo_list_id: string
}
