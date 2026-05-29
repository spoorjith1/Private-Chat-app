import React, { useState, createContext, useEffect } from 'react'
import axiosInstance from './axiosInstance'

const AuthContext = createContext()
const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const loadUser = async () => {
      try {
        const response = await axiosInstance.get('/profile/me/')
        setUser(response.data)
      }
      catch (error) {
      }
    }
    const token = localStorage.getItem('accessToken')
    if (token) {
      setIsLoggedIn(true)
      loadUser()
    }
  }, [])

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, user, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
export { AuthContext }