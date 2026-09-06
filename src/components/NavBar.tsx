import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '16px 32px',
      borderBottom: '1px solid #eaeaea',
      backgroundColor: '#ffffff',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      {/* Left side: Logo Image + Brand Text */}
      <Link 
        to="/" 
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '12px', // Space between image and text
          textDecoration: 'none', 
          color: '#111827', 
        }}
      >
        <img 
          src="https://ui-avatars.com/api/?name=CP&background=2563eb&color=fff&rounded=true" // Replace with your logo path
          alt="NileForces Logo" 
          style={{ width: '32px', height: '32px', objectFit: 'contain' }}
        />
        <span style={{ fontSize: '1.25rem', fontWeight: 700 }}>
          NileForces
        </span>
      </Link>

      {/* Right side: Profile Button */}
      <Link 
        to="/profile" 
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          backgroundColor: '#2563eb',
          color: '#ffffff',
          textDecoration: 'none',
          fontWeight: 600,
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}
        title="View Profile"
      >
        JD
      </Link>
    </nav>
  );
}