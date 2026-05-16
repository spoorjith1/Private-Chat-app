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
import Home from './pages/Home';
import ProfilePage from './pages/ProfilePage';
import Friends from './pages/Friends';
import Search from './pages/Search';
import Requests from './pages/Requests';
import ProfileEdit from './pages/ProfileEdit';
import ProfileSettings from './pages/ProfileSettings';

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
      <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
      <Route path="/friends" element={<PrivateRoute><Friends /></PrivateRoute>} />
      <Route path="/search" element={<PrivateRoute><Search /></PrivateRoute>} />
      <Route path="/requests" element={<PrivateRoute><Requests /></PrivateRoute>} />
      <Route path='/profile/edit' element={ <PrivateRoute><ProfileEdit /></PrivateRoute> } />
      <Route path='/profile/settings' element={ <PrivateRoute><ProfileSettings /></PrivateRoute> } />
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
