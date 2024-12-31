import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Text
} from "@chakra-ui/react"
import Cookies from 'js-cookie'
import { Field } from "@/components/ui/field"
import { zodResolver } from "@hookform/resolvers/zod"
import { Helmet } from "react-helmet-async"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { authService } from "@/service/auth-service"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"

const signInFormSchema = z.object({
  email: z.string().email("Por favor, insira um e-mail válido."),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres."),
})

export type SignInForm = z.infer<typeof signInFormSchema>

export function SignIn() {
  const navigate = useNavigate();
  const [error, setError] = useState(false)


  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<SignInForm>({
    resolver: zodResolver(signInFormSchema),
  })

  async function handleSignIn(data: SignInForm) {
    try {
      const response = await authService.signIn(data)
      console.log("Login bem-sucedido:", response)

      const token = response.token
      const expirationDate = new Date(
        new Date().getTime() + 60 * 60 * 24000 * 7,
      ) // 7 dias
      Cookies.set('authToken', token, { expires: expirationDate })

      navigate("/")
    } catch (error) {
      console.error("Erro ao fazer login:", error)
      setError(true)
    }
  }
  return (
    <>
      <Helmet title="Login" />
      <Box
        p={8}
        bg="gray.950"
        borderRadius="xl"
      >
        <Flex
          flexDirection="column"
          spaceY={6}
          w={{ base: "full", sm: "md" }}
          mx="auto"
          p={6}
        >

          <Box spaceY={1}>

            <Heading as="h1" size="2xl" fontWeight="bold" textAlign="center" color="blue.600">
              Acessar todo lists
            </Heading>
            <Text fontSize="lg" color="gray.300" textAlign="center" fontWeight="medium">
              Gerencia suas tarefas do dia a dia!
            </Text>

          </Box>


          <form onSubmit={handleSubmit(handleSignIn)}>
            <Box spaceY="6" w="full" >
              <Field
                label="E-mail"
                invalid={!!errors.email}
                errorText={errors.email?.message}
                required 
              >
                <Input
                  id="email"
                  type="email"
                  placeholder="fulano@example.com"
                  {...register("email")}
                />
              </Field>

              <Field
                label="E-mail"
                invalid={!!errors.password}
                errorText={errors.password?.message}
                required 
              >
                <Input
                  id="password"
                  type="password"
                  placeholder="Sua senha"
                  {...register("password")}
                />
              </Field>

              <Button
                type="submit"
                w="full"
                colorPalette="blue"
                variant="surface"
                disabled={isSubmitting}
              >
                Acessar todo lists
              </Button>
            </Box>
          </form>

          {error &&
            <Text
              fontSize="sm"
              color="red.600"
              textAlign="right"
              fontWeight="medium"
            >
              E-mail ou senha inválido.
            </Text>
          }

          <Text fontSize="md" color="gray.400" textAlign="right" fontWeight="medium">
            <Link to="/sign-up">
              <Text
                display="inline"
                color="blue.600"
                fontWeight="semibold"
                _hover={{ textDecoration: "underline" }}
              >
                Clique aqui
              </Text>
            </Link> para se cadastrar
          </Text>
        </Flex>
      </Box>
    </>
  )
}
