import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../App.css'

type TestCase = {
  id: number
  input: string
  output: string
}

function AuthorPage() {
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [constraints, setConstraints] = useState('')
  const [testCases, setTestCases] = useState<TestCase[]>([
    { id: 1, input: '', output: '' },
  ])
  const [saved, setSaved] = useState(false)
  const [nextId, setNextId] = useState(2)

  const updateTestCase = (id: number, field: 'input' | 'output', value: string) => {
    setTestCases((cases) =>
      cases.map((tc) => (tc.id === id ? { ...tc, [field]: value } : tc)),
    )
  }

  const addTestCase = () => {
    setTestCases((cases) => [...cases, { id: nextId, input: '', output: '' }])
    setNextId((id) => id + 1)
  }

  const removeTestCase = (id: number) => {
    setTestCases((cases) =>
      cases.length === 1 ? cases : cases.filter((tc) => tc.id !== id),
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSaved(true)
  }

  const handleReset = () => {
    setTitle('')
    setDescription('')
    setConstraints('')
    setTestCases([{ id: 1, input: '', output: '' }])
    setNextId(2)
    setSaved(false)
  }

  return (
    <div className="author">
      <header className="author-header">
        <p className="profile-label">Author studio</p>
        <h1 className="profile-title">Add a problem</h1>
        <p className="author-subtitle">
          Create a problem with a description, constraints, and test cases.
        </p>
      </header>

      {saved ? (
        <div className="author-success">
          <h2>Problem ready</h2>
          <p>
            <strong>{title || 'Untitled'}</strong> with {testCases.length} test
            case{testCases.length === 1 ? '' : 's'} is prepared in memory.
          </p>
          <div className="author-actions">
            <button type="button" className="profile-btn profile-btn-primary" onClick={handleReset}>
              Add another
            </button>
            <button
              type="button"
              className="profile-btn profile-btn-secondary"
              onClick={() => navigate('/profile')}
            >
              Back to profile
            </button>
          </div>
        </div>
      ) : (
        <form className="author-form" onSubmit={handleSubmit}>
          <label className="profile-field">
            <span>Title</span>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Two Sum"
              required
            />
          </label>

          <label className="profile-field">
            <span>Description</span>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Explain the problem clearly..."
              rows={5}
              required
            />
          </label>

          <label className="profile-field">
            <span>Constraints</span>
            <textarea
              value={constraints}
              onChange={(e) => setConstraints(e.target.value)}
              placeholder="e.g. 1 ≤ n ≤ 10^5"
              rows={3}
              required
            />
          </label>

          <section className="author-tests">
            <div className="author-tests-header">
              <h2>Test cases</h2>
              <button
                type="button"
                className="profile-btn profile-btn-secondary"
                onClick={addTestCase}
              >
                + Add case
              </button>
            </div>

            {testCases.map((tc, index) => (
              <div key={tc.id} className="author-test-card">
                <div className="author-test-top">
                  <span>Case {index + 1}</span>
                  <button
                    type="button"
                    className="author-remove"
                    onClick={() => removeTestCase(tc.id)}
                    disabled={testCases.length === 1}
                  >
                    Remove
                  </button>
                </div>
                <label className="profile-field">
                  <span>Input</span>
                  <textarea
                    value={tc.input}
                    onChange={(e) => updateTestCase(tc.id, 'input', e.target.value)}
                    placeholder="Sample input"
                    rows={3}
                    required
                  />
                </label>
                <label className="profile-field">
                  <span>Expected output</span>
                  <textarea
                    value={tc.output}
                    onChange={(e) => updateTestCase(tc.id, 'output', e.target.value)}
                    placeholder="Expected output"
                    rows={2}
                    required
                  />
                </label>
              </div>
            ))}
          </section>

          <div className="author-actions">
            <button type="submit" className="profile-btn profile-btn-primary">
              Save problem
            </button>
            <button
              type="button"
              className="profile-btn profile-btn-secondary"
              onClick={() => navigate('/profile')}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  )
}

export default AuthorPage
