import React from 'react'
import { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import axiosInstance from '../axiosInstance'
import { useNavigate } from 'react-router-dom'

function Register() {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [generalError, setGeneralError] = useState('')
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate()

  const handleRegister = async (e)=> {
    e.preventDefault();
    if (!email || !username || !password) {
      setGeneralError('Please fill all fields')
      setTimeout(() => { setGeneralError('') }, 3000)
      return
    }

    setLoading(true)

    const userData = {email, username, password}

    try {
      const response = await axiosInstance.post('/register/', userData)
      setErrors({})
      setSuccess(true)
      navigate('/login')
    }
    catch (error) {
      setErrors(error.response.data)
    }
    finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <label>Email : </label>
        <input type='email' placeholder='myemail@gmail.com' value={email} onChange={(e)=> setEmail(e.target.value)} />
        <small>{errors.email && <div className='text-danger'>{errors.email}</div>}</small>
        <br />
        <label>username : </label>
        <input type='text' placeholder='myname' value={username} onChange={(e)=> setUsername(e.target.value)} />
        <small>{errors.username && <div className='text-danger'>{errors.username}</div>}</small>
        <br />
        <label>password : </label>
        <input type='password' placeholder='password123#$%' value={password} onChange={(e)=> setPassword(e.target.value)} />
        <small>{errors.password && <div className='text-danger'>{errors.password}</div>}</small>
        {generalError && (<div className='text-danger'>{generalError}</div>)}
        <br />
        {loading ?
        (<button type='submit' disabled>Registering...</button>)
         : 
        (<button type='submit'>Register</button>)
        }
      </form>
      <div>Already have an account? <Link to='/login'>Login</Link></div>
    </div>
  )
}

export default Register
