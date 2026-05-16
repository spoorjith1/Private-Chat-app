import React, { useState } from 'react'
import Logout from '../components/Logout'
import axiosInstance from '../axiosInstance'
import { useNavigate } from 'react-router-dom'

function ProfileSettings() {
  const [showConfirm, setShowConfirm] = useState(false)
  const navigate = useNavigate()
  
  const handleDelete = async ()=> {
    try {
      await axiosInstance.delete('/profile/me/delete/')
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')

      navigate('/login')
    }
    catch (error) {
      alert('Failed to Delete Account')
    }
  }

  return (
    <div>
      <h2>Settings</h2>
      <Logout />
      {!showConfirm ? (
        <button onClick={()=> setShowConfirm(true)} className='delete-yes'>Delete Account</button>
      ) : (
        <div>
          <p>Are you sure you want to Delete your Account?</p>
          <button onClick={()=> navigate('/profile')} className='delete-no'>No</button>
          <button onClick={handleDelete} className='delete-yes'>Yes</button>
        </div>
      )}
    </div>
  )
}

export default ProfileSettings
