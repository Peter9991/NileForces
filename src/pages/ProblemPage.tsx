import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import { mockProblems } from '../data/problems';
import type { Problem } from '../types';

export default function ProblemPage() {
  const { id } = useParams();
  const [problem, setProblem] = useState<Problem | null>(null);
  const [loading, setLoading] = useState(true);
  
  // 1. New state for the editor's language
  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState('function solve() {\n  // Write your code here\n\n}');

  useEffect(() => {
    const foundProblem = mockProblems.find((p) => String(p.id) === id);
    setProblem(foundProblem || null);
    setLoading(false);
  }, [id]);

  const handleSubmit = () => {
    const submissionPayload = {
      problemId: id,
      language: language,
      sourceCode: code
    };

    console.log("Sending to backend:", submissionPayload);
    alert(`Submitted! Check your console.\n\nLanguage: ${language}\nProblem ID: ${id}`);
    
    // Future backend call:
    // fetch('http://your-backend-api.com/submit', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(submissionPayload)
    // });
  };

  if (loading) return <div style={{ padding: '40px', textAlign: 'center', fontFamily: 'sans-serif' }}>Loading problem...</div>;
  if (!problem) return (
    <div style={{ padding: '40px', textAlign: 'center', fontFamily: 'sans-serif' }}>
      <h2>Problem not found</h2>
      <Link to="/">Go back home</Link>
    </div>
  );

  return (
    <div style={{ display: 'flex', height: 'calc(100vh - 75px)', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      
      {/* LEFT PANEL */}
      <div style={{ width: '50%', padding: '32px', overflowY: 'auto', boxSizing: 'border-box', borderRight: '1px solid #eaeaea' }}>
        <Link to="/problems" style={{ display: 'inline-block', marginBottom: '24px', textDecoration: 'none', color: '#2563eb' }}>
          ← Back to Problems
        </Link>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
          <h1 style={{ margin: 0 }}>{problem.title}</h1>
          <span style={{ backgroundColor: '#dcfce7', color: '#166534', padding: '4px 12px', borderRadius: '999px', fontSize: '14px', fontWeight: 'bold' }}>
            {problem.difficulty}
          </span>
        </div>

        <div style={{ display: 'flex', gap: '16px', color: '#4b5563', fontSize: '14px', marginBottom: '24px', paddingBottom: '16px', borderBottom: '1px solid #f3f4f6' }}>
          <span>⏱️ Time Limit: <strong>{problem.timelimit}s</strong></span>
          <span>💾 Memory Limit: <strong>{problem.memorylimit} MB</strong></span>
        </div>

        <p style={{ lineHeight: '1.6', color: '#1f2937' }}>{problem.statement}</p>

        <h3 style={{ marginTop: '32px', marginBottom: '8px' }}>Sample Input</h3>
        <pre style={{ backgroundColor: '#f3f4f6', padding: '16px', borderRadius: '8px', overflowX: 'auto', margin: 0 }}>
          {problem.sample_input}
        </pre>
        
        <h3 style={{ marginTop: '24px', marginBottom: '8px' }}>Sample Output</h3>
        <pre style={{ backgroundColor: '#f3f4f6', padding: '16px', borderRadius: '8px', overflowX: 'auto', margin: 0 }}>
          {problem.sample_output}
        </pre>
      </div>

      {/* RIGHT PANEL */}
      <div style={{ width: '50%', display: 'flex', flexDirection: 'column', boxSizing: 'border-box' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 24px', backgroundColor: '#1e1e1e', borderBottom: '1px solid #333' }}>
          <select 
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            style={{ padding: '6px', borderRadius: '4px', backgroundColor: '#374151', color: 'white', border: '1px solid #4b5563', outline: 'none', cursor: 'pointer' }}
          >
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="cpp">C++</option>
            <option value="java">Java</option>
          </select>

          <button 
            onClick={handleSubmit}
            style={{ backgroundColor: '#16a34a', color: 'white', border: 'none', padding: '8px 24px', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}
          >
            Submit
          </button>
        </div>

        <div style={{ flex: 1, width: '100%' }}>
          <Editor
            height="100%"
            language={language} 
            theme="vs-dark"
            value={code}
            onChange={(value: string | undefined) => setCode(value || '')}
            options={{ minimap: { enabled: false }, fontSize: 14 }}
          />
        </div>
        
      </div>
    </div>
  );
}