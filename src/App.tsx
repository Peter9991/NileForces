import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ProblemPage from './pages/ProblemPage'; 

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/problems/:id" element={<ProblemPage />} />
          
        </Routes>
      </main>
    </>
  );
}