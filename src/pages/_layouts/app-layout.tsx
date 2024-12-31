import { authUser } from '@/utils/auth-user'
import { useEffect, useRef } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { toast } from 'sonner'


export function AppLayout() {
  const isAuthenticated = authUser()
  const hasShownToast = useRef(false)

  useEffect(() => {
    if (!isAuthenticated && !hasShownToast.current) {
      toast.warning('Você ainda não está cadastrado no sistema.')
      hasShownToast.current = true
    }
  }, [isAuthenticated])

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" />
  }

  return (
    <div>
      <Outlet />
    </div>
  )
}