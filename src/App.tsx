// App.tsx
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
// import ProfilePage from './pages/ProfilePage'; // You'll need this soon!

export default function App() {
  return (
    <>
      {/* Navbar sits outside Routes so it stays permanently at the top */}
      <Navbar />
      
      {/* The main page content will render below the Navbar */}
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* <Route path="/profile" element={<ProfilePage />} /> */}
        </Routes>
      </main>
    </>
  );
}