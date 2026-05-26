import React from 'react'
import { useNavigate } from 'react-router-dom'
import FriendRequest from './FriendRequest'


function User({ user }) {
  const navigate = useNavigate()
  return (
    <div className='others-box'>
      <div className='others-first-box'>
        <img src={user.profile_pic} alt='profile pic' className='others-profile-pic' onClick={()=> navigate(`/user/${user.id}`)} />
        <div className='others-name-box' onClick={()=> navigate(`/user/${user.id}`)} >
          <p className='others-username'>{user.username}</p>
          <p className='others-fullname'>{user.first_name} {user.last_name}</p>
        </div>
      </div>
        <FriendRequest userId={user.id} />
    </div>
  )
}

export default User
