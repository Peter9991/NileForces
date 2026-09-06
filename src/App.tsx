import { Routes, Route } from 'react-router-dom'
import Navbar from './components/NavBar'
import HomePage from './Pages/HomePage'
import Profile from './Pages/Profile'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>
    </>
  )
}
