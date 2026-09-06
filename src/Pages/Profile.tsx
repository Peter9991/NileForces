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

  return (
    <div className="home">
      <h1>Profile</h1>
      <p>
        Name:{' '}
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ padding: '6px 8px', borderRadius: '4px', border: '1px solid #003c73' }}
        />
      </p>
      <p style={{ marginTop: '16px' }}>Problems solved: {solved}</p>
      <button
        type="button"
        onClick={() => setSolved((n) => n + 1)}
        style={{
          backgroundColor: '#0096dc',
          color: 'white',
          padding: '8px 16px',
          borderRadius: '5px',
          border: 'none',
          cursor: 'pointer',
          marginTop: '8px',
        }}
      >
        +1 Solved
      </button>
      <p style={{ marginTop: '24px', fontStyle: 'italic', color: '#003c73' }}>
        "{quote}"
      </p>
      <button
        type="button"
        onClick={() => navigate('/')}
        style={{
          backgroundColor: '#507FA9',
          color: 'white',
          padding: '8px 16px',
          borderRadius: '5px',
          border: 'none',
          cursor: 'pointer',
          marginTop: '24px',
        }}
      >
        Back Home
      </button>
    </div>
  )
}

export default Profile
