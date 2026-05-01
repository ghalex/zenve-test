import { Navigate, Route, Routes } from 'react-router'
import HomePage from '@/pages/home'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
