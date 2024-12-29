import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "./pages/_layouts/app-layout";
import { Home } from "./pages/home/home";
import { CreateTodoList } from "./pages/create-todo-list/create-todo-list";
import { TodoList } from "./pages/todo-list/todo-list";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { path: '/', element: <Home /> }
    ]
  },
  {
    path: "/create-todo-list",
    element: <CreateTodoList />
  },
  {
    path: "/todo-list/:id",
    element: <TodoList />
  },
])