import { useState } from 'react'
import { usePlatform } from '../state/PlatformContext.jsx'
import { useAuth } from '../state/AuthContext.jsx'

export default function Admin() {
  const { users, addUser, removeUser, clearPlatformData } = usePlatform()
  const { logout } = useAuth()
  const [name, setName] = useState('')
  const [role, setRole] = useState('citizen')

  const onAdd = (e) => {
    e.preventDefault()
    if (!name.trim()) return
    addUser(name.trim(), role)
    setName('')
  }

  return (
    <section className="section">
      <h1>Admin Console</h1>
      <div className="cards">
        <div className="card">
          <h2 className="card-title">Create User</h2>
          <form className="form" onSubmit={onAdd}>
            <input placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)} />
            <select value={role} onChange={(e)=>setRole(e.target.value)}>
              <option value="citizen">Citizen</option>
              <option value="politician">Politician</option>
              <option value="moderator">Moderator</option>
              <option value="admin">Admin</option>
            </select>
            <button className="btn wide" type="submit">Add</button>
          </form>
        </div>
        <div className="card">
          <h2 className="card-title">Users</h2>
          {users.length === 0 ? <p className="muted">No users.</p> : (
            <ul className="list">
              {users.map(u => (
                <li key={u.id} style={{display:'flex', justifyContent:'space-between', alignItems:'center', gap:8}}>
                  <span><strong>{u.name}</strong> — {u.role.charAt(0).toUpperCase()+u.role.slice(1)}</span>
                  <button className="btn" onClick={()=>removeUser(u.id)}>Remove</button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div style={{marginTop:16, display:'flex', gap:12, flexWrap:'wrap'}}>
        <button className="btn" onClick={clearPlatformData}>Clear Platform Data</button>
        <button className="btn" onClick={logout}>Logout</button>
      </div>
    </section>
  )
}
