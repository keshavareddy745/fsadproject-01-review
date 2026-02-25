export default function PoliticiansBar() {
  const names = [
    'Y. S. Jagan Mohan Reddy'
  ]
  return (
    <div className="pol-bar">
      {names.map((n, i) => (
        <span key={i} className="pol-tag">{n}</span>
      ))}
    </div>
  )
}
