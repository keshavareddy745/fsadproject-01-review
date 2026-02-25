import { Link } from 'react-router-dom'
import { useAuth } from '../state/AuthContext.jsx'

export default function NavBar() {
  const { role, logout } = useAuth()
  return (
    <header className="navbar simple">
      <nav className="links">
        <Link to="/">Home</Link>
        {!role && <Link to="/login">Login</Link>}
        {role && <button className="link-like" onClick={logout}>Logout</button>}
      </nav>
      {role && <div className="role-badge">{role.charAt(0).toUpperCase() + role.slice(1)}</div>}
    </header>
  )
}
