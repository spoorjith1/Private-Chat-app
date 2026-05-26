import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axiosInstance from '../axiosInstance'

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
      {error && <div>{error}</div>}
      {userData && (
        <div>
          <h3 className='ms-3'>{userData.username}</h3>
          <img src={userData.profile_pic} alt='profile_pic' width='120' className='profile-pic ms-3' />
          <p className='full-name ms-3'>{userData.first_name} {userData.last_name}</p>
          {/*<FriendRequest userId={userData.id} />*/}
          <hr />
          {userData.posts?.map((post) => (
          <div key={post.id} className='single-post-container'>
            <img src={post.image} alt='post' width='300' className='profile-posts' />
            <div className='post-content'>
              <div className='post-top'>
                <p className='post-caption'><b>@{post.username} </b>{post.caption}<br /></p>
                <p className='post-date'>{new Date(post.created_at).toLocaleDateString('en-GB')}</p>
              </div>
            </div>
          </div>
          ))}
          {userData.posts?.length === 0 && (
            <div className='no-posts-message'>
              <p>"No posts"</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default OthersProfile
