import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "./pages/_layouts/app-layout";
import { Home } from "./pages/app/home/home";
import { CreateTodoList } from "./pages/app/create-todo-list/create-todo-list";
import { TodoList } from "./pages/app/todo-list/todo-list";

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