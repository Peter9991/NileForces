import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'
import '../App.css'

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        <img src={logo} alt="Nile University" className="navbar-logo" />
        <span>NileForces</span>
      </Link>

      <div className="navbar-links">
        <Link to="/problems" className="navbar-link">
          Problems
        </Link>
        <Link to="/profile" className="navbar-link navbar-profile">
          Profile
        </Link>
      </div>
    </nav>
  )
}
