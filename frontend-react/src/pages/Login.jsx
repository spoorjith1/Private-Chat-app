import React from 'react'
import { useState, useContext } from 'react'
import axiosInstance from '../axiosInstance'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../AuthProvider'
import { Link } from 'react-router-dom'

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const {isLoggedIn, setIsLoggedIn} = useContext(AuthContext)

  const handleLogin = async (e)=> {
    e.preventDefault();
    if (!username) {
      setError('Please Enter username')
      setTimeout(()=> {setError('')}, 3000 )
      return
    }
    if (!password) {
      setError('Please Enter password')
      setTimeout(()=> {setError('')}, 3000 )
      return
    }

    setLoading(true)

    const userData = {username, password}

    try {
      const response = await axiosInstance.post('/token/', userData)
      localStorage.setItem('accessToken', response.data.access)
      localStorage.setItem('refreshToken', response.data.refresh)
      setIsLoggedIn(true)
      setError('')
      navigate('/home')
    }
    catch (error) {
      setError('InValid username or password')
      setTimeout(()=> {setError('')}, 3000 )
      setUsername('')
      setPassword('')
    }
    finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label>username : </label>
        <input type='text' placeholder='username' value={username} onChange={(e)=> setUsername(e.target.value)} />
        <br />
        <label>Password : </label>
        <input type='password' placeholder='password123#$%' value={password} onChange={(e)=> setPassword(e.target.value)} />
        <br />
        {error && <div className='text-danger'>{error}</div>}
        <br />
        {loading ? 
        (<button type='submit' disabled>Logging In...</button>) 
        : 
        (<button type='submit'>Login</button>)
        }
      </form>
      <div>New to Chat App? <Link to='/register'>Register</Link></div>
    </div>
  )
}

export default Login
