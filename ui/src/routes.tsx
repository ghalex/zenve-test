import { Navigate, Route, Routes } from 'react-router-dom'
import { PrivateRoute, PublicRoute } from '@/components/auth'
import AuthPage from '@/pages/auth'
import HomePage from '@/pages/home'
import PublicBookingPage from '@/pages/public-booking-page'
import TestPage from '@/pages/test'

export default function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute>
            <HomePage />
          </PrivateRoute>
        }
      />
      <Route
        path="/auth"
        element={
          <PublicRoute>
            <AuthPage />
          </PublicRoute>
        }
      />
      <Route path="/test" element={<TestPage />} />
      <Route path="/:workspaceSlug/:eventSlug" element={<PublicBookingPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
