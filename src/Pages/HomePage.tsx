import { useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'
import '../App.css'

function HomePage() {
  const navigate = useNavigate()

  return (
    <div className="home">
      <div className="home-card">
        <img src={logo} alt="Nile University" className="home-logo" />
        <p className="home-label">Nile University</p>
        <h1 className="home-title">NileForces</h1>
        <p className="home-text">
          A platform for problem solving made for Nile University students.
          Practice, improve, and track your progress.
        </p>
        <button
          type="button"
          className="profile-btn profile-btn-primary home-cta"
          onClick={() => navigate('/problems')}
        >
          Get Started
        </button>
      </div>
    </div>
  )
}

export default HomePage
