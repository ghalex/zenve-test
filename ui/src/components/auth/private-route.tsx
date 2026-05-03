import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { selectIsAuthenticated, selectIsAuthInitialized } from '@/store/auth'
import { useAppSelector } from '@/store/hooks'

interface PrivateRouteProps {
  children: ReactNode
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const isAuthInitialized = useAppSelector(selectIsAuthInitialized)

  const renderLoading = () => (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="editorial-panel w-full max-w-md px-6 py-8 text-center">
        <p className="editorial-eyebrow">auth</p>
        <p className="mt-3 font-editorial text-2xl text-foreground">Checking your session...</p>
      </div>
    </div>
  )

  const renderMain = () => {
    if (!isAuthInitialized) {
      return renderLoading()
    }

    if (!isAuthenticated) {
      return <Navigate to="/auth" replace />
    }

    return children
  }

  return renderMain()
}
