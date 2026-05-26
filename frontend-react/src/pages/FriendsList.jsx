import React, { useEffect, useState } from 'react'
import axiosInstance from '../axiosInstance'
import { useNavigate } from 'react-router-dom'

function FriendsPage() {
  const [friends, setFriends] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const fetchFriends = async () => {
      setLoading(true)
      try {
        const response = await axiosInstance.get('/friends/list/')
        setFriends(response.data.results)
      }
      catch (error) {
        setError('Failed to load friends')
      }
      finally {
        setLoading(false)
      }
    }
    fetchFriends()
  }, [])

  if (loading) {
    return (
      <div className='page-container'>Loading...</div>
    )
  }
  return (
    <div className='page-container'>
      <h2 className='friends-title'>Friends</h2>
      {error && (<div>{error}</div>)}
      {friends.length === 0 ? (
        <p className='friends-empty'>No friends yet</p>
      ) : (
        <div className='friends-container'>
          {friends.map((friend) => (
            <div key={friend.id} className='friend-box' onClick={() => navigate(`/user/${friend.user_id}`)}>
              <img src={`http://127.0.0.1:8000${friend.profile_pic}`} alt='profile' className='friend-profile-pic'/>
              <h3 className='friend-username'>{friend.username}</h3>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default FriendsPage