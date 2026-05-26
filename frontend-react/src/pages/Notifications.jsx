import React, { useEffect, useState } from 'react'
import axiosInstance from '../axiosInstance'
import { FaUserFriends } from 'react-icons/fa'


function Notifications() {
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true)
      try {
        const response = await axiosInstance.get('/friends/requests/')
        setRequests(response.data.results)
      }
      catch (error) {
        setError('Failed to load requests')
      }
      finally {
        setLoading(false)
      }
    }
    fetchRequests()
  }, [])

  const acceptRequest = async (id) => {
    try {
      await axiosInstance.patch(`/friend/request/accept/${id}/`)
      setRequests((prevRequests) =>
        prevRequests.map((request) =>
          request.id === id
            ? { ...request, status: 'accepted' }
            : request
        )
      )
    }
    catch (error) {
      alert('Failed to accept request')
    }
  }

  const rejectRequest = async (id) => {
    try {
      await axiosInstance.patch(`/friend/request/reject/${id}/`)
      setRequests((prevRequests) =>
        prevRequests.filter(
          (request) => request.id !== id
        )
      )
    }
    catch (error) {
      alert('Failed to reject request')
    }
  }

  if (loading) {
    return (
      <div className='page-container notifications-page'>Loading...</div>)
  }

  return (
    <div className='page-container notifications-page'>
      <h2 className='notifications-title'>Notifications</h2>
      {error && (
        <div className='notifications-error'>{error}</div>
      )}

      {requests.length === 0 ? (
        <p className='notifications-empty'>No pending requests</p>
      ) : (
        <div className='notifications-container'>
          {requests.map((request) => (
            <div key={request.id} className='notification-box'>
              <div className='notification-left'>
                <img src={request.profile_pic} alt='profile' className='notification-profile-pic'/>
                <div className='notification-user-info'>
                  <h3 className='notification-username'>{request.username}</h3>
                  <p className='notification-text'>sent you a friend request</p>
                </div>
              </div>
              <div className='notification-actions'>
                {request.status === 'pending' ? (
                  <>
                  <button onClick={() => rejectRequest(request.id)} className='btn-reject notification-btn'>Reject</button>
                  <button onClick={() => acceptRequest(request.id)} className='btn-accept notification-btn'>Accept</button>
                  </>
                ) : (
                  <button disabled className='frds'>Friends <FaUserFriends size={15} /></button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Notifications