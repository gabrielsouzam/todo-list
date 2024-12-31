 
import { api } from "@/lib/axios"
import { CreateTodoListForm } from "@/pages/app/create-todo-list/create-todo-list"
import { UpdateTodoListForm } from "@/pages/app/home/components/update-todo-list-modal";

export const todoListService = {
  getAllByUserId: async (userId: string) => {
    try {
      const response = await api.get("/todo_lists", {
        params: { user_id: userId },
      });
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar as TodoLists:", error);
      throw error;
    }
  },
  

  getById: async (id: string) => {
    try {
      const response = await api.get(`/todo_lists/${id}`)
      return response.data.todo_list
    } catch (error) {
      console.error(`Erro ao buscar a TodoList com ID ${id}:`, error)
      throw error
    }
  },

  create: async (todoListData: CreateTodoListForm) => {
    try {
      const response = await api.post("/todo_lists", {
        todo_list: todoListData, 
      })
      return response.data
    } catch (error) {
      console.error("Erro ao criar a Todo List:", error)
      throw error
    }
  },

  update: async (id: string, todoListData: UpdateTodoListForm) => {
    try {
      const response = await api.put(`/todo_lists/${id}`, todoListData)
      return response.data
    } catch (error) {
      console.error(`Erro ao atualizar a TodoList com ID ${id}:`, error)
      throw error
    }
  },

  delete: async (id: string) => {
    try {
      await api.delete(`/todo_lists/${id}`)
    } catch (error) {
      console.error(`Erro ao excluir a TodoList com ID ${id}:`, error)
      throw error
    }
  },
}
