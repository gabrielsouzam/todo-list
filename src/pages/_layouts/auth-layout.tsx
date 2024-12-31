import appLogo from "@/assets/todo-logo.svg";
import { Flex, Text } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

export function AuthLayout() {
  return (
    <Flex minH="100vh" direction={{ base: "column", md: "row" }}>
      <Flex
        direction="column"
        justify="space-between"
        p="6"
        borderRight="1px solid"
        borderColor="gray.800"
        w={{ base: "full", md: "100%" }}
      >
        <Flex align="center" gap="3" mb="4">
          <img src={appLogo} alt="Logo da aplicação" />
        </Flex>

        <Text fontSize="sm" color="gray.600" textAlign="center">
          TodoList &copy; {new Date().getFullYear()}
        </Text>
      </Flex>

      <Flex
        w="full"
        justify="center"
        align="center"
        p="8"
        bg="gray.950"
      >
        <Outlet />
      </Flex>
    </Flex>
  );
}
