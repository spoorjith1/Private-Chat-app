import React, { useEffect, useState } from 'react'
import axiosInstance from '../axiosInstance'
import { FaUserFriends } from "react-icons/fa";


function FriendRequest({ userId }) {
  const [friendshipStatus, setFriendshipStatus] = useState(null)
  const [loading, setloading] = useState(false)
  const [error, setError] = useState('')

  useEffect(()=> {
    const fetchfriendshipStatus = async ()=> {
      try {
        const response = await axiosInstance.get(`/friend/status/${userId}/`)
        setFriendshipStatus(response.data.status)
      }
      catch (error) {
        setError("Failed to load users data")
      }
    }
    fetchfriendshipStatus();
  }, [userId])

  const sendRequest = async ()=> {
    setloading(true)
    try {
      await axiosInstance.post(`/friend/request/${userId}/`)
      setFriendshipStatus('pending')
    }
    catch (error) {
      setError(error.response?.data?.non_field_errors?.[0] || 'Failed to send request')
      setTimeout(()=> {setError('')}, 3000)
    }
    finally {
      setloading(false)
    }
  }

  const friendButton = ()=> {
    if (friendshipStatus === null || friendshipStatus === 'rejected') {
      return (<button onClick={sendRequest} disabled={loading} className='frd-request frd-btn'>{loading ? 'Sending...' : 'Add Friend'}</button>)
    }
    if (friendshipStatus === 'pending') {
      return (<button disabled className='frd-sent frd-btn'>Request Sent</button>)
    }
    if (friendshipStatus === 'accepted') {
      return (<button disabled className='frds'>Friends <FaUserFriends size={15} /></button>)
    }
  }

  return (
    <div className='frd-main-container'>
      {friendButton()}
      {error && (<small className='frd-error'>{error}</small>)}
    </div>
  )
}

export default FriendRequest
