import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import { mockProblems } from '../data/problems';
import type { Problem } from '../types';

// JDoodle requires specific language codes and version indices
const JDOODLE_LANGUAGE_MAP: Record<string, { code: string; version: string }> = {
  javascript: { code: 'nodejs', version: '4' },
  python: { code: 'python3', version: '4' },
  cpp: { code: 'cpp', version: '5' },
  java: { code: 'java', version: '4' },
};

export default function ProblemPage() {
  const { id } = useParams();
  const [problem, setProblem] = useState<Problem | null>(null);
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState('function solve() {\n  // Write your code here\n\n}');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [output, setOutput] = useState<string>('');
  const [verdict, setVerdict] = useState<'idle' | 'running' | 'success' | 'error'>('idle');

  useEffect(() => {
    const foundProblem = mockProblems.find((p) => String(p.id) === id);
    setProblem(foundProblem || null);
    setLoading(false);
  }, [id]);

  const CLIENT_ID = "708b645cf53b9314faf4cdbc935db4ae";
  const CLIENT_SECRET = "56aafdb047831d8cf2d33516adacfadfb19025f1ed69bca80c19786b740129e2";

  const handleSubmit = async () => {
    if (!problem) return;
    
    setIsSubmitting(true);
    setVerdict('running');
    setOutput('Executing code via JDoodle API...\n');

    const jdoodleConfig = JDOODLE_LANGUAGE_MAP[language];

    const payload = {
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      script: code,
      stdin: problem.sample_input,
      language: jdoodleConfig.code,
      versionIndex: jdoodleConfig.version,
    };

    try {
      const response = await fetch('/jdoodle-api/v1/execute', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.error) {
        setVerdict('error');
        setOutput(`Error: ${data.error}`);
      } else {
        const cleanOutput = data.output?.trim();
        const cleanExpected = problem.sample_output.trim();

        if (cleanOutput === cleanExpected) {
          setVerdict('success');
          setOutput(`✅ Accepted!\n\nOutput:\n${cleanOutput}\n\nMemory: ${data.memory} bytes\nCPU Time: ${data.cpuTime}s`);
        } else {
          setVerdict('error');
          setOutput(`❌ Wrong Answer.\n\nExpected:\n${cleanExpected}\n\nGot:\n${cleanOutput}`);
        }
      }
    } catch (err) {
      setVerdict('error');
      setOutput("Failed to connect to JDoodle API.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <div style={{ padding: '40px', textAlign: 'center' }}>Loading...</div>;
  if (!problem) return <div style={{ padding: '40px', textAlign: 'center' }}>Problem not found</div>;

  return (
    <div style={{ display: 'flex', height: 'calc(100vh - 75px)', fontFamily: 'system-ui' }}>
      
      {/* LEFT PANEL: Problem Details (Unchanged) */}
      <div style={{ width: '50%', padding: '32px', overflowY: 'auto', boxSizing: 'border-box', borderRight: '1px solid #eaeaea' }}>
        <h1 style={{ margin: '0 0 16px 0' }}>{problem.title}</h1>
        <p style={{ lineHeight: '1.6', color: '#1f2937' }}>{problem.statement}</p>
        
        <h3 style={{ marginTop: '32px', marginBottom: '8px' }}>Sample Input</h3>
        <pre style={{ backgroundColor: '#f3f4f6', padding: '16px', borderRadius: '8px', margin: 0 }}>{problem.sample_input}</pre>
        
        <h3 style={{ marginTop: '24px', marginBottom: '8px' }}>Sample Output</h3>
        <pre style={{ backgroundColor: '#f3f4f6', padding: '16px', borderRadius: '8px', margin: 0 }}>{problem.sample_output}</pre>
      </div>

      {/* RIGHT PANEL: Editor + Console */}
      <div style={{ width: '50%', display: 'flex', flexDirection: 'column', boxSizing: 'border-box' }}>
        
        {/* Toolbar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 24px', backgroundColor: '#1e1e1e' }}>
          <select 
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            style={{ padding: '6px', borderRadius: '4px', backgroundColor: '#374151', color: 'white' }}
          >
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="cpp">C++</option>
            <option value="java">Java</option>
          </select>

          <button 
            onClick={handleSubmit}
            disabled={isSubmitting}
            style={{ 
              backgroundColor: isSubmitting ? '#4b5563' : '#16a34a', 
              color: 'white', border: 'none', padding: '8px 24px', borderRadius: '4px', 
              fontWeight: 'bold', cursor: isSubmitting ? 'not-allowed' : 'pointer' 
            }}
          >
            {isSubmitting ? 'Running...' : 'Submit'}
          </button>
        </div>

        {/* Editor (Takes up 65% of the right side) */}
        <div style={{ flex: '0 0 65%', width: '100%', borderBottom: '2px solid #333' }}>
          <Editor
            height="100%"
            language={language}
            theme="vs-dark"
            value={code}
            onChange={(value) => setCode(value || '')}
            options={{ minimap: { enabled: false } }}
          />
        </div>
        
        {/* OUTPUT CONSOLE (Takes up 35% of the right side) */}
        <div style={{ flex: '1', backgroundColor: '#000000', color: '#ffffff', padding: '16px', overflowY: 'auto', fontFamily: 'monospace' }}>
          <div style={{ marginBottom: '8px', color: '#888', fontSize: '12px', textTransform: 'uppercase' }}>Console Output</div>
          <div style={{ 
            color: verdict === 'success' ? '#4ade80' : verdict === 'error' ? '#f87171' : '#e5e7eb',
            whiteSpace: 'pre-wrap' 
          }}>
            {output || "Run your code to see the output here."}
          </div>
        </div>

      </div>
    </div>
  );
}