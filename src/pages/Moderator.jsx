import { useState } from 'react'
import { usePlatform } from '../state/PlatformContext.jsx'

export default function Moderator() {
  const { issues, feedbacks, updates, flags, flagItem, clearFlag, getFlagFor } = usePlatform()
  const [reason, setReason] = useState('')

  const onFlag = (type, id, lvl='normal') => {
    if (!reason.trim()) return
    flagItem(type, id, reason.trim(), lvl)
    setReason('')
  }

  const openIssues = issues.filter(i => i.status === 'open')
  const solvedIssues = issues.filter(i => i.status === 'solved')

  return (
    <section className="section">
      <h1>Moderator Dashboard</h1>
      <div className="card" style={{marginBottom:16}}>
        <input
          className="input"
          placeholder="Reason"
          value={reason}
          onChange={(e)=>setReason(e.target.value)}
        />
      </div>
      <div className="cards">
        <div className="card">
          <h2 className="card-title">Reports</h2>
          {openIssues.length === 0 ? <p className="muted">No open reports.</p> : (
            <ul className="list">
              {openIssues.map(r => {
                const fl = getFlagFor('issue', r.id)
                const cls = fl ? 'flagged' : ''
                return (
                  <li key={r.id} className={cls}>
                    <strong>{r.title}</strong> — {r.description}
                    {fl && <em style={{marginLeft:8}}>(flagged {fl.level})</em>}
                    <div style={{marginTop:8, display:'flex', gap:8}}>
                      <button className="btn" onClick={()=>onFlag('issue', r.id, 'emergency')}>Flag</button>
                    </div>
                  </li>
                )
              })}
            </ul>
          )}
        </div>

        <div className="card">
          <h2 className="card-title">Feedback</h2>
          {feedbacks.length === 0 ? <p className="muted">No feedback.</p> : (
            <ul className="list">
              {feedbacks.map(f => (
                <li key={f.id}>
                  <strong>{f.name}</strong>: {f.message}
                  <div style={{marginTop:8}}>
                    <button className="btn" onClick={()=>onFlag('feedback', f.id)}>Flag</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="card">
          <h2 className="card-title">Updates</h2>
          {updates.length === 0 ? <p className="muted">No updates.</p> : (
            <ul className="list">
              {updates.map(u => (
                <li key={u.id}>
                  <strong>{u.author}</strong>: {u.message}
                  <div style={{marginTop:8}}>
                    <button className="btn" onClick={()=>onFlag('update', u.id)}>Flag</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="card">
          <h2 className="card-title">Responses</h2>
          {solvedIssues.length === 0 ? <p className="muted">No responses.</p> : (
            <ul className="list">
              {solvedIssues.map(i => (
                <li key={i.id}>
                  <strong>{i.title}</strong> — done ({i.solvedBy})
                  <div style={{marginTop:8}}>
                    <button className="btn" onClick={()=>onFlag('response', i.id)}>Flag</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className="card" style={{marginTop:16}}>
        <h2 className="card-title">Flags</h2>
        {flags.length === 0 ? <p className="muted">No flags.</p> : (
          <ul className="list">
            {flags.map(fl => (
              <li key={fl.id}>
                <strong>{fl.level.toUpperCase()}</strong> {fl.type} #{fl.refId} — {fl.reason}
                <div style={{marginTop:8}}>
                  <button className="btn" onClick={()=>clearFlag(fl.id)}>Clear</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
