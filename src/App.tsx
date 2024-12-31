import { Helmet, HelmetProvider } from "react-helmet-async"
import { RouterProvider } from "react-router-dom"
import { router } from "./routes"
import { Toaster } from 'sonner'

export function App() {

  return (
    <HelmetProvider>
      <Toaster richColors theme="dark" />
      <Helmet titleTemplate="%s | Todo list" />
      <RouterProvider router={router} />
    </HelmetProvider>
  )
}

