import { useMemo } from 'react'
import { usePlatform } from '../state/PlatformContext.jsx'

export default function Home() {
  const { issues, updates, users } = usePlatform()
  const solved = issues.filter(i => i.status === 'solved')
  const politicians = users.filter(u => u.role === 'politician')

  const trending = useMemo(() => {
    const counts = new Map()
    issues.forEach(i => {
      const key = (i.title || 'General').trim().toLowerCase()
      counts.set(key, (counts.get(key) || 0) + 1)
    })
    return [...counts.entries()]
      .sort((a,b)=>b[1]-a[1])
      .slice(0,3)
      .map(([k,v]) => ({ name: k.replace(/\b\w/g, c=>c.toUpperCase()), count: v }))
  }, [issues])

  const recent = useMemo(() => {
    const items = [
      ...issues.slice(0,5).map(i => ({ type: 'Issue', text: `${i.title} — ${i.description}` })),
      ...updates.slice(0,5).map(u => ({ type: 'Update', text: `${u.author}: ${u.message}` }))
    ]
    return items.slice(0,5)
  }, [issues, updates])

  return (
    <section className="section">
      <div className="hero">
        <h1>Welcome to CitizenConnect</h1>
        <p>Empowering citizens to engage with their elected representatives for transparent and responsive governance.</p>
        <div className="stats">
          <div className="stat">
            <div className="num">{issues.length}</div>
            <div className="muted">Issues Reported</div>
          </div>
          <div className="stat">
            <div className="num">{solved.length}</div>
            <div className="muted">Issues Resolved</div>
          </div>
          <div className="stat">
            <div className="num">{politicians.length}</div>
            <div className="muted">Active Representatives</div>
          </div>
        </div>
      </div>

      <div className="two-col">
        <div className="card">
          <h2 className="card-title">Recent Activity</h2>
          {recent.length === 0 ? <p className="muted">No activity yet.</p> : (
            <ul className="list">
              {recent.map((r, idx) => (
                <li key={idx}><strong>{r.type}</strong> — {r.text}</li>
              ))}
            </ul>
          )}
        </div>
        <div className="card">
          <h2 className="card-title">Trending Issues</h2>
          {trending.length === 0 ? <p className="muted">No trends yet.</p> : (
            <ul className="list">
              {trending.map((t, idx) => (
                <li key={idx}>
                  {t.name}
                  <span style={{marginLeft:8, background:'#ffe8ea', border:'1px solid #ff9ca8', borderRadius:12, padding:'2px 8px', fontWeight:700}}>
                    {t.count} reports
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  )
}
