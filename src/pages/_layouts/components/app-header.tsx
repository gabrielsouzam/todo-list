import appLogo from "@/assets/todo-logo.svg";
import { Button, Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export function AppHeader() {
  const navigate = useNavigate();

  function navigateToCreateTodoList() {
    navigate("/create-todo-list")
  }

  return (
    <Flex justify="space-between" align="center" px="7.5rem" py="3rem" bg="gray.950">
      <img src={appLogo} alt="Logo da aplicação" />
      <Button
        variant="surface"
        colorPalette="blue"
        onClick={navigateToCreateTodoList}
      >
        Criar todo list
      </Button>
    </Flex>
  );
}
