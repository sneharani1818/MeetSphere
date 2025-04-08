import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './components/Home'
import RoomPage from './pages/Room'
import { SocketProvider } from './providers/Socket'
import { PeerProvider } from './providers/Peer'

function App() {

  return (
    <>
      <Router>
        <PeerProvider>
          <SocketProvider>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/room/:roomId" element={<RoomPage />} />
            </Routes>
          </SocketProvider>
        </PeerProvider>
      </Router>

    </>
  )
}

export default App
