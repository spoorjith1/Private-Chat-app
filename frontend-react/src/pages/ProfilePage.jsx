import React, { useEffect, useState } from 'react'
import axiosInstance from '../axiosInstance'
import { Link } from 'react-router-dom'

function ProfilePage() {
  const [loading, setLoading] = useState(false)
  const [profileData, setProfileData] = useState(null)
  const [error, setError] = useState('')
  const [postMenu, setPostMenu] = useState(null)

  useEffect(()=> {
    const fetchProfileData = async ()=> {
      setLoading(true)
      try {
        const response = await axiosInstance.get('/profile/me/')
        setProfileData(response.data)
      }
      catch (error) {
        setError("Failed to fetch Data")
      }
      finally {
        setLoading(false)
      }
    }
    fetchProfileData();
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      {error && <div>{error}</div>}

      {profileData && (
        <>
        <img src={profileData.profile_pic} alt='profile_pic' width='120' className='profile-pic' />
        <h3>{profileData.username}</h3>
        <p>{profileData.first_name}</p>
        <p>{profileData.last_name}</p>
        <Link to='/profile/edit' className=' btn btn-info'>Edit Profile</Link>
        <br />
        <Link to='/profile/settings' className=' btn btn-danger'>Settings</Link>
        </>
      )}
    </div>
  )
}

export default ProfilePage;
