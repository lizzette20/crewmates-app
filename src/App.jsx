import './App.css'
import { Routes, Route, Link } from 'react-router-dom'
import CreateCrewmate from './CreateCrewmate'
import CrewmateList from './CrewmateList'
import CrewmateDetail from './CrewmateDetail'
import EditCrewmate from './EditCrewmate'

function App() {
  return (
    <div className="app-container">
      <aside className="sidebar">
        <nav>
          <h2>✨ Crewmate Creator ✨</h2>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/create">Create</Link></li>
            <li><Link to="/gallery">Gallery</Link></li>
          </ul>
        </nav>
      </aside>

      <main className="main-content">
        <Routes>
          <Route path="/" element={
            <div className="welcome">
              <h1>Welcome to the Crewmate Creator!</h1>
              <p>Create your dream crew before they board their mission 🪐</p>
              <img src="/crew-banner.png" alt="Cute Crewmates" style={{ width: '500%', borderRadius: '1rem', marginBottom: '1rem', height: '250px' }} />
            </div>
          } />
          <Route path="/create" element={<CreateCrewmate />} />
          <Route path="/gallery" element={<CrewmateList />} />
          <Route path="/crewmate/:id" element={<CrewmateDetail />} />
          <Route path="/crewmate/:id/edit" element={<EditCrewmate />} />
          <Route path="*" element={<p>Page not found 🚫</p>} />
        </Routes>
      </main>
    </div>
  )
}

export default App






