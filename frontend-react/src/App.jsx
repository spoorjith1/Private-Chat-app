import React, { useContext } from 'react';
import './styles/global.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AuthProvider, { AuthContext } from './AuthProvider';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './pages/Login';
import Register from './pages/Register';
import UserProfile from './pages/UserProfile';
import Home from './pages/Home'
import Search from './pages/Search'
import Notifications from './pages/Notifications'
import ProfileEdit from './pages/ProfileEdit'
import ProfileSettings from './pages/ProfileSettings'
import FriendsList from './pages/FriendsList'
import OthersProfile from './pages/OthersProfile'
import ChatPage from './pages/ChatPage'

function AppRoutes() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <>
    {isLoggedIn && <Navbar />}
    <main className='main-content'>
    <Routes>
      <Route path="/" element={isLoggedIn ? <Navigate to="/home" /> : <Navigate to="/login" />} />
      <Route path="/register" element={ <PublicRoute><Register /></PublicRoute> } />
      <Route path="/login" element={ <PublicRoute><Login /></PublicRoute>} />
      <Route path="/home" element={ <PrivateRoute><Home /></PrivateRoute>} />
      <Route path="/profile" element={<PrivateRoute><UserProfile /></PrivateRoute>} />
      <Route path="/search" element={<PrivateRoute><Search /></PrivateRoute>} />
      <Route path="/notifications" element={<PrivateRoute><Notifications /></PrivateRoute>} />
      <Route path="/profile/edit" element={<PrivateRoute><ProfileEdit /></PrivateRoute>} />
      <Route path="/profile/settings" element={<PrivateRoute><ProfileSettings /></PrivateRoute>} />
      <Route path="/friends/list" element={<PrivateRoute><FriendsList /></PrivateRoute>} />
      <Route path="/user/:id" element={<PrivateRoute><OthersProfile /></PrivateRoute>} />
      <Route path="chat/:id" element={<PrivateRoute><ChatPage /></PrivateRoute>} />
    </Routes>
    <Footer />
    </main>
    </>
  )
}

function App() {
  return (
    <>
    <AuthProvider>
      <BrowserRouter>
      <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
    </>
  )
}

export default App
