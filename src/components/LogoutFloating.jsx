import { useAuth } from '../state/AuthContext.jsx'

export default function LogoutFloating() {
  const { role, logout } = useAuth()
  if (!role) return null
  return (
    <button className="logout-fab" onClick={logout} title="Logout">
      Logout
    </button>
  )
}
