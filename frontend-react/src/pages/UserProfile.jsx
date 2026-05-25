import React, { useEffect, useState } from 'react'
import axiosInstance from '../axiosInstance'
import { Link } from 'react-router-dom'
import { FaEdit, FaEllipsisV } from 'react-icons/fa'
import { IoMdSettings } from 'react-icons/io'

function UserProfile() {
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

  const deletePost = async (id)=> {
    try {
      await axiosInstance.delete(`/post/delete/${id}/`)

      setProfileData({
        ...profileData,
        posts: profileData.posts.filter((post)=> post.id !== id)
      })

      setPostMenu(null)
    }
    catch (error) {
      alert("Failed to delete Post. Try again")
    }
  }

  if (loading) {
    return <div className='page-container'>Loading...</div>
  }

  return (
    <div className='page-container'>
      {error && <div>{error}</div>}

      {profileData && (
        <>
        <h3 className='user-username'>{profileData.username}</h3>
        <div className='user-profile-top'>
          <img src={profileData.profile_pic} alt='profile_pic' width='120' className='user-profile-pic'/>
          <Link to='/friends/list' className='user-friends-count-box'>
            <p className='user-friends-count-number'>{profileData.friends_count}</p>
            <p className='user-friends-count-text'>Friends</p>
          </Link>
        </div>
        <p className='user-full-name'>{profileData.first_name} {profileData.last_name}</p>
        <div className='user-profile-configs'>
          <Link to='/profile/edit' className='user-conf-btns'>Edit Profile <FaEdit /></Link>
          <Link to='/profile/settings' className='user-conf-btns'>Settings<IoMdSettings /></Link>
        </div>
        </>
      )}
    </div>
  )
}

export default UserProfile;
