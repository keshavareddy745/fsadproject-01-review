import React, { createContext, useContext, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [role, setRole] = useState(null)
  const navigate = useNavigate()

  const login = (email, password, selectedRole) => {
    setRole(selectedRole)
    const dest =
      selectedRole === 'citizen' ? '/citizen' :
      selectedRole === 'politician' ? '/politician' :
      selectedRole === 'moderator' ? '/moderator' :
      selectedRole === 'admin' ? '/admin' : '/'
    navigate(dest)
  }

  const logout = () => {
    setRole(null)
    navigate('/login')
  }

  const value = useMemo(() => ({ role, login, logout }), [role])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
