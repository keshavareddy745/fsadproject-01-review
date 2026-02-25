import { useState } from 'react'
import { useAuth } from '../state/AuthContext.jsx'

export default function Login() {
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('citizen')

  const onSubmit = (e) => {
    e.preventDefault()
    login(email, password, role)
  }

  return (
    <section className="section center">
      <div className="card auth-card">
        <h1>Login</h1>
        <form onSubmit={onSubmit} className="form">
          <label>
            Email
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </label>
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <label>
            Role
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="citizen">Citizen</option>
              <option value="politician">Politician</option>
              <option value="moderator">Moderator</option>
              <option value="admin">Admin</option>
            </select>
          </label>
          <button className="btn wide" type="submit">Login</button>
        </form>
      </div>
    </section>
  )
}
