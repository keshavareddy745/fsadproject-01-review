import { useState } from 'react'
import { usePlatform } from '../state/PlatformContext.jsx'

export default function Citizen() {
  const { submitIssue, submitFeedback, updates, issues } = usePlatform()
  const [nameIssue, setNameIssue] = useState('')
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [nameFeedback, setNameFeedback] = useState('')
  const [message, setMessage] = useState('')

  const onIssue = (e) => {
    e.preventDefault()
    if (!nameIssue || !title || !desc) return
    submitIssue(nameIssue, title, desc)
    setNameIssue(''); setTitle(''); setDesc('')
  }

  const onFeedback = (e) => {
    e.preventDefault()
    if (!nameFeedback || !message) return
    submitFeedback(nameFeedback, message)
    setNameFeedback(''); setMessage('')
  }

  const solved = issues.filter(i => i.status === 'solved')

  return (
    <section className="section">
      <h1>Citizen Portal</h1>
      <div className="cards">
        <div className="card">
          <h2 className="card-title">Report an Issue</h2>
          <form className="form" onSubmit={onIssue}>
            <input placeholder="Your name" value={nameIssue} onChange={(e)=>setNameIssue(e.target.value)} />
            <input placeholder="Title" value={title} onChange={(e)=>setTitle(e.target.value)} />
            <textarea placeholder="Description" rows="4" value={desc} onChange={(e)=>setDesc(e.target.value)} />
            <button className="btn wide" type="submit">Submit Issue</button>
          </form>
        </div>

        <div className="card">
          <h2 className="card-title">Provide Feedback</h2>
          <form className="form" onSubmit={onFeedback}>
            <input placeholder="Your name" value={nameFeedback} onChange={(e)=>setNameFeedback(e.target.value)} />
            <textarea placeholder="Message" rows="4" value={message} onChange={(e)=>setMessage(e.target.value)} />
            <button className="btn wide" type="submit">Submit Feedback</button>
          </form>
        </div>

        <div className="card">
          <h2 className="card-title">Latest Updates from Politicians</h2>
          {updates.length === 0 ? (
            <p className="muted">No updates yet.</p>
          ) : (
            <ul className="list">
              {updates.map(u => (
                <li key={u.id}><strong>{u.author}</strong>: {u.message}</li>
              ))}
            </ul>
          )}
        </div>

        <div className="card">
          <h2 className="card-title">Solved Issues</h2>
          {solved.length === 0 ? (
            <p className="muted">No solved issues yet.</p>
          ) : (
            <ul className="list">
              {solved.map(i => (
                <li key={i.id}>
                  <strong>{i.title}</strong> — {i.description} — done ({i.solvedBy})
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  )
}
