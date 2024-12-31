import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "./pages/_layouts/app-layout";
import { Home } from "./pages/app/home/home";
import { CreateTodoList } from "./pages/app/create-todo-list/create-todo-list";
import { TaskTodoList } from "./pages/app/todo-list/tasks-todo-list";
import { AuthLayout } from "./pages/_layouts/auth-layout";
import { SignIn } from "./pages/auth/sign-in";
import { SignUp } from "./pages/auth/sign-up";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/create-todo-list', element: <CreateTodoList /> },
      { path: '/todo-list/:id', element: <TaskTodoList /> }
    ]
  },

  {
    path: "/",
    element: <AuthLayout />,
    children: [
      { path: '/sign-in', element: <SignIn /> },
      { path: '/sign-up', element: <SignUp /> }
    ]
  },
])