import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../state/AuthContext.jsx'

export default function ProtectedRoute({ allowed, children }) {
  const { role } = useAuth()
  const location = useLocation()
  if (!role) return <Navigate to="/login" state={{ from: location }} replace />
  if (allowed && !allowed.includes(role)) return <Navigate to="/" replace />
  return children
}
