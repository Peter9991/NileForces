import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { mockProblems } from '../data/problems';
import ProblemCard from '../components/ProblemCard';
import type { Problem } from '../types';

export default function HomePage() {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // TODO: replace with fetch('/api/problems/') once backend is ready
    setProblems(mockProblems);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '60px', color: '#6b7280', fontFamily: 'system-ui' }}>
        <p>Loading problems...</p>
      </div>
    );
  }

  return (
    <div style={{ 
      maxWidth: '800px', 
      margin: '0 auto', 
      padding: '40px 20px',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <h1 style={{ 
        fontSize: '2rem', 
        color: '#111827', 
        marginBottom: '24px',
        fontWeight: 700 
      }}>
        Practice Problems
      </h1>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {problems.map((p) => (
          <Link 
            key={p.id} 
            to={`/problems/${p.id}`} 
            style={{ 
              textDecoration: 'none',
              color: 'inherit',       
              display: 'block'
            }}
          >
            <ProblemCard problem={p} />
          </Link>
        ))}
      </div>
    </div>
  );
}