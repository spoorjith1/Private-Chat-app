import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axiosInstance from '../axiosInstance'
import FriendRequest from '../components/FriendRequest'

function OthersProfile() {
  const { id } = useParams()
  const [userData, setUserData] = useState(null)
  const [error, setError] = useState('')

  useEffect(()=> {
    const fetchUserData = async () => {
      try {
        const Data = await axiosInstance.get(`/user/${id}/`)
        setUserData(Data.data)
      }
      catch (error) {
        setError("Failed to fetch User")
      }
    }
    fetchUserData()
  }, [id])
  return (
    <div className='page-container'>
      {error && <div className='other-profile-error'>{error}</div>}
      {userData && (
        <div className='other-user-container'>
          <div className='other-user-box'>
            <div>
              <img src={userData.profile_pic} alt='profile_pic' width='120' className='others-page-profile-pic' />
            </div>
            <div className='other-user-middle'>
              <div className='other-user-names'>
                <h3 className='other-user-username'>{userData.username}</h3>
                <p className='other-user-fullname'>{userData.first_name} {userData.last_name}</p>
              </div>
              <FriendRequest userId={userData.id} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default OthersProfile
