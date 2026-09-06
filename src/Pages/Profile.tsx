import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../App.css'

const quotes = [
  'Every problem you solve makes the next one easier.',
  'Consistency beats intensity.',
  'One more problem today is progress.',
]

function Profile() {
  const navigate = useNavigate()
  const [name, setName] = useState('Nile Student')
  const [solved, setSolved] = useState(0)
  const quote = useMemo(
    () => quotes[Math.floor(Math.random() * quotes.length)],
    [],
  )

  const initials = useMemo(() => {
    const parts = name.trim().split(/\s+/).filter(Boolean)
    if (parts.length === 0) return '?'
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
    return (parts[0][0] + parts[1][0]).toUpperCase()
  }, [name])

  return (
    <div className="profile">
      <header className="profile-header">
        <div className="profile-avatar" aria-hidden="true">
          {initials}
        </div>
        <div className="profile-header-text">
          <p className="profile-label">Your profile</p>
          <h1 className="profile-title">{name || 'Anonymous'}</h1>
        </div>
      </header>

      <label className="profile-field">
        <span>Display name</span>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
        />
      </label>

      <section className="profile-stat">
        <p className="profile-stat-label">Problems solved</p>
        <p className="profile-stat-value">{solved}</p>
        <button
          type="button"
          className="profile-btn profile-btn-primary"
          onClick={() => setSolved((n) => n + 1)}
        >
          Mark one solved
        </button>
      </section>

      <blockquote className="profile-quote">
        <p>“{quote}”</p>
      </blockquote>

      <div className="profile-actions">
        <button
          type="button"
          className="profile-btn profile-btn-primary"
          onClick={() => navigate('/author')}
        >
          Become an author
        </button>
        <button
          type="button"
          className="profile-btn profile-btn-secondary"
          onClick={() => navigate('/problems')}
        >
          Back to problems
        </button>
      </div>
    </div>
  )
}

export default Profile
