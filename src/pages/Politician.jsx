import { useState } from 'react'
import { usePlatform } from '../state/PlatformContext.jsx'
import PoliticiansBar from '../components/PoliticiansBar.jsx'

export default function Politician() {
  const { issues, addUpdate, markIssueSolved, getFlagFor } = usePlatform()
  const [updateMsg, setUpdateMsg] = useState('')

  const onPublish = (e) => {
    e.preventDefault()
    if (!updateMsg) return
    addUpdate(updateMsg, 'Politician')
    setUpdateMsg('')
  }

  const openIssues = issues.filter(i => i.status === 'open')

  return (
    <section className="section">
      <h1>Politician</h1>
      <PoliticiansBar />
      <div className="cards">
        <div className="card">
          <h2 className="card-title">Post an Update</h2>
          <form className="form" onSubmit={onPublish}>
            <textarea placeholder="Write a short update..." rows="4" value={updateMsg} onChange={(e)=>setUpdateMsg(e.target.value)} />
            <button className="btn wide" type="submit">Publish</button>
          </form>
        </div>
        <div className="card">
          <h2 className="card-title">Open Citizen Issues</h2>
          {openIssues.length === 0 ? (
            <p className="muted">No open issues.</p>
          ) : (
            <ul className="list">
              {openIssues.map(i => {
                const fl = getFlagFor('issue', i.id)
                const cls = fl ? 'flagged' : ''
                return (
                  <li key={i.id} className={cls}>
                    <strong>{i.title}</strong> — {i.description}
                    {fl && <em style={{marginLeft:8}}>(flag: {fl.level})</em>}
                    <div style={{marginTop:8}}>
                      <button className="btn" onClick={() => markIssueSolved(i.id, 'Politician')}>Mark Solved</button>
                    </div>
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>
    </section>
  )
}
