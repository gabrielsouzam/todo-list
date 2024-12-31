import { api } from "@/lib/axios"
import { SignInForm } from "@/pages/auth/sign-in"
import { SignUpForm } from "@/pages/auth/sign-up"

export const authService = {
  signIn: async ({ email, password }: SignInForm) => {
    try {
      const response = await api.post("users/sign_in", {
        user: { email, password },
      }, {
        withCredentials: true, 
      })

      return response.data
    } catch (error) {
      console.error("Erro ao fazer login:", error)
      throw error
    }
  },

  signUp: async ({ name, email, password, confirmPassword }: SignUpForm) => {
    try {
      const response = await api.post("users", {
        user: { name, email, password, password_confirmation: confirmPassword },
      }, {
        withCredentials: true,
      });
  
      return response.data;
    } catch (error) {
      console.error("Erro ao realizar cadastro:", error);
      throw error;
    }
  },

  signOut: async () => {
    try {
      await api.delete("users/sign_out", {
        withCredentials: true,
      })
      return true
    } catch (error) {
      console.error("Erro ao fazer logout:", error)
      throw error
    }
  },

  getAuthenticatedUser: async () => {
    try {
      const response = await api.get("auth/user", {
        withCredentials: true,
      })
      return response.data
    } catch (error) {
      console.error("Erro ao obter usuário autenticado:", error)
      throw error
    }
  },
}
