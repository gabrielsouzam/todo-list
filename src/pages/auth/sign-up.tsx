import { Field } from "@/components/ui/field";
import { authService } from "@/service/auth-service";
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Text
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

const signUpFormSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório."),
  email: z.string().email("Por favor, insira um e-mail válido."),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres."),
  confirmPassword: z.string().min(6, "A senha deve ter pelo menos 6 caracteres."),
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem.",
  path: ["confirmPassword"], 
});

export type SignUpForm = z.infer<typeof signUpFormSchema>;

export function SignUp() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors }
  } = useForm<SignUpForm>({
    resolver: zodResolver(signUpFormSchema)
  });

  async function handleSignUp(data: SignUpForm) {
    try {
      const response = await authService.signUp(data);

      console.log(response)

      navigate("/sign-in");
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
      alert("Falha no cadastro. Verifique os dados informados.");
    }
  }

  return (
    <>
      <Box
        p={8}
        bg="gray.950"
        borderRadius="xl"
      >
        <Flex flexDirection="column"  p={6} gap={6} w={{ base: "full", sm: "md" }}>
          <Box textAlign="center">
            <Heading as="h1" size="2xl" fontWeight="bold" color="blue.600">
              Criar Conta
            </Heading>
            <Text fontSize="lg" color="gray.300">
              Gerencie suas tarefas do dia a dia!
            </Text>
          </Box>

          <form onSubmit={handleSubmit(handleSignUp)}>
            <Box gap={6} display="flex" flexDirection="column">
              <Field
                label="Nome"
                invalid={!!errors.name}
                errorText={errors.name?.message}
                required
              >
                <Input
                  id="name"
                  type="text"
                  placeholder="Seu nome"
                  {...register("name")}
                />
              </Field>

              <Field
                label="Email"
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
                label="Senha"
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

              <Field
                label="Confirmar Senha"
                invalid={!!errors.confirmPassword}
                errorText={errors.confirmPassword?.message}
                required
              >
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirme sua senha"
                  {...register("confirmPassword")}
                />
              </Field>

              <Button
                type="submit"
                w="full"
                colorPalette="blue"
                variant="surface"
                disabled={isSubmitting}
              >
                Cadastrar
              </Button>
            </Box>
          </form>
        </Flex>
      </Box>
    </>
  );
}
