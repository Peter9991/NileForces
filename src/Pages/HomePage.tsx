import logo from '../assets/logo.png'
import '../App.css'
import { useNavigate } from 'react-router-dom'

function HomePage() {
  const navigate = useNavigate()

  return (
    <div className="home">
      <img src={logo} alt="NileForces" className="home-logo" />
      <h1>NileForces</h1>
      <p className="home-text">NileForces is a platform for Problem Solving For Nile University Students.</p>
      <button onClick={() => navigate('/profile')} style={{backgroundColor: '#507FA9', color: 'white', padding: '10px 20px', borderRadius: '5px', border: 'none', cursor: 'pointer', marginTop: '20px'}}>
        Get Started
    </button>
    </div>
  )
}

export default HomePage