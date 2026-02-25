import { Routes, Route, Navigate } from 'react-router-dom'
import NavBar from './components/NavBar.jsx'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Citizen from './pages/Citizen.jsx'
import Politician from './pages/Politician.jsx'
import Moderator from './pages/Moderator.jsx'
import Admin from './pages/Admin.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import LogoutFloating from './components/LogoutFloating.jsx'

export default function App() {
  return (
    <div className="container">
      <NavBar />
      <LogoutFloating />
      <main className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />

          <Route
            path="/citizen"
            element={
              <ProtectedRoute allowed={['citizen', 'moderator', 'admin']}>
                <Citizen />
              </ProtectedRoute>
            }
          />
          <Route
            path="/politician"
            element={
              <ProtectedRoute allowed={['politician', 'moderator', 'admin']}>
                <Politician />
              </ProtectedRoute>
            }
          />
          <Route
            path="/moderator"
            element={
              <ProtectedRoute allowed={['moderator', 'admin']}>
                <Moderator />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowed={['admin']}>
                <Admin />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </div>
  )
}
