/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "@/lib/axios"

export interface CreateTaskPayload {
  title: string
  description?: string
  priority: "low" | "medium" | "high"
  deadline: string 
  todo_list_id: string 
}

export const taskService = {
  create: async (taskData: CreateTaskPayload) => {
    try {
      const response = await api.post("/tasks", {
        task: taskData,
      })
      return response.data
    } catch (error) {
      console.error("Erro ao criar a Task:", error)
      throw error
    }
  },

  update: async (taskId: string, taskData: Record<string, any>) => {
    try {
      const response = await api.put(`/tasks/${taskId}`, {
        task: taskData, 
      })
      return response.data
    } catch (error) {
      console.error("Erro ao atualizar a Task:", error)
      throw error
    }
  },

  delete: async (taskId: string) => {
    try {
      const response = await api.delete(`/tasks/${taskId}`)
      return response.data
    } catch (error) {
      console.error("Erro ao deletar a Task:", error)
      throw error
    }
  },

  getByTodoList: async (todoListId: string) => {
    try {
      const response = await api.get(`/todo_lists/${todoListId}/tasks`)
      return response.data.tasks 
    } catch (error) {
      console.error("Erro ao buscar as Tasks da Todo List:", error)
      throw error
    }
  },

  updateStatus: async (taskId: string, done: boolean): Promise<void> => {
    try {
      const response = await api.patch(`/tasks/${taskId}/update_status`, { "done": done })
      console.log(`Task status atualizado com sucesso:`, response.data)
    } catch (error) {
      console.error(`Erro ao atualizar o status da Task:`, error)
      throw error
    }
  },
  
}
