import React, { createContext, useContext, useMemo, useState } from 'react'

const PlatformContext = createContext(null)

let nextId = 1

export function PlatformProvider({ children }) {
  const [issues, setIssues] = useState([])
  const [feedbacks, setFeedbacks] = useState([])
  const [updates, setUpdates] = useState([])
  const [flags, setFlags] = useState([])
  const [users, setUsers] = useState([{ id: nextId++, name: 'Admin', role: 'admin' }])

  const submitIssue = (name, title, description) => {
    const issue = { id: nextId++, name, title, description, status: 'open' }
    setIssues((prev) => [issue, ...prev])
  }

  const markIssueSolved = (id, solver = 'Politician') => {
    setIssues((prev) =>
      prev.map((i) => (i.id === id ? { ...i, status: 'solved', solvedBy: solver } : i))
    )
  }

  const submitFeedback = (name, message) => {
    const fb = { id: nextId++, name, message, date: new Date().toISOString() }
    setFeedbacks((prev) => [fb, ...prev])
  }

  const addUpdate = (message, author = 'Politician') => {
    const up = { id: nextId++, message, author, date: new Date().toISOString() }
    setUpdates((prev) => [up, ...prev])
  }

  const flagItem = (type, refId, reason, level = 'normal') => {
    const flag = { id: nextId++, type, refId, reason, level, time: new Date().toISOString() }
    setFlags((prev) => [flag, ...prev])
  }

  const clearFlag = (id) => setFlags((prev) => prev.filter(f => f.id !== id))

  const addUser = (name, role) => {
    if (!name || !role) return
    const user = { id: nextId++, name, role }
    setUsers((prev) => [user, ...prev])
  }

  const removeUser = (id) => setUsers((prev) => prev.filter(u => u.id !== id))

  const clearPlatformData = () => {
    setIssues([]); setFeedbacks([]); setUpdates([]); setFlags([])
  }

  const value = useMemo(
    () => ({
      issues,
      feedbacks,
      updates,
      flags,
      users,
      getFlagFor: (type, refId) => flags.find(f => f.type === type && f.refId === refId) || null,
      submitIssue,
      submitFeedback,
      addUpdate,
      markIssueSolved,
      flagItem,
      clearFlag,
      addUser,
      removeUser,
      clearPlatformData
    }),
    [issues, feedbacks, updates, flags, users]
  )

  return <PlatformContext.Provider value={value}>{children}</PlatformContext.Provider>
}

export function usePlatform() {
  const ctx = useContext(PlatformContext)
  if (!ctx) throw new Error('usePlatform must be used within PlatformProvider')
  return ctx
}
