// App.tsx
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import Profile from './pages/Profile';
import Problems from './pages/Problems';
import ProblemPage from './pages/ProblemPage';

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/problems" element={<Problems />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/problems/:id" element={<ProblemPage />} />
        </Routes>
      </main>
    </>
  )
}
