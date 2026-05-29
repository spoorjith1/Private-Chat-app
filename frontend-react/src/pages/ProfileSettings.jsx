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
    <div className='page-container'>
      <h2 className='conf-title'>Settings</h2>
      <hr />
      <Logout />
      <br />
      {!showConfirm ? (
        <div className='conf-box'>
          <button onClick={()=> setShowConfirm(true)} className='conf-delete-acc'>Delete Account</button>
        </div>
      ) : (
        <div className='delete-acc-confirm'>
          <p className='confirm-text'>Are you sure you want to Delete your Account?</p>
          <div className='confirm-note-box'>
            <p className='confirm-note-text'><b>NOTE :</b> Once you delete your account. all you account data will permanently deleted, you cannot access your account anymore and you cannot retrieve the account.</p>
          </div>
          <div className='confirm-btn-box'>
            <button onClick={()=> navigate('/profile')} className='confirmation-btns no'>No, cancel</button>
            <button onClick={handleDelete} className='confirmation-btns yes'>Yes, delete</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProfileSettings
