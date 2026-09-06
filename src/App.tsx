import { Routes, Route } from 'react-router-dom'
import Navbar from './components/NavBar'
import HomePage from './Pages/HomePage'
import Problems from './Pages/Problems'
import Profile from './Pages/Profile'
import AuthorPage from './Pages/AuthorPage'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/problems" element={<Problems />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/author" element={<AuthorPage />} />
        </Routes>
      </main>
    </>
  )
}
