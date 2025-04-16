import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import VideoCall from './pages/VideoCall/VideoCall'
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import LobbyScreen from './pages/LobbyScreen';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />
    },
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/signup",
      element: <Signup />
    },
    { path: "/dashboard", element: <Dashboard /> },
    { path: "/meeting/:meetingId", element: <LobbyScreen /> }, // VideoCall route
  ])
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
