import React, { useEffect, useState } from 'react'
import axiosInstance from '../axiosInstance'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

function Home() {
  const [conversationsList, setConversationsList] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(()=> {
    const fetchConversations = async ()=> {
      setLoading(true)
      try {
        const response = await axiosInstance.get('/chats/')
        setConversationsList(response.data.results)
      }
      catch (error) {
        setError("Failed to load conversations")
      }
      finally {
        setLoading(false)
      }
    }
    fetchConversations();
  }, [])

  if (loading) {
    return (<div className='page-container'>Loading...</div>)
  }

  return (
    <div  className='page-container home-page'>
      {error && <div>{error}</div>}
      {conversationsList.length === 0 ? (
        <div className='no-chats-msg'>no converations! start a new conversation</div>
      ) : (
        <div className='chats-container'>
          {conversationsList.map((conversation) => (
            <div key={conversation.id} onClick={() => navigate(`/chat/${conversation.id}`)} className='chat-box'>
              <img src={`http://127.0.0.1:8000/${conversation.profile_pic}`} className='chats-profile-pic' />
              <h3 className='chats-usernames'>{conversation.username}</h3>
            </div>
          ))}
        </div>
      )}
      <div className='new-chat-btn'>
        <Link to='/friends/list' className='new-chat'>+</Link>
      </div>
    </div>
  )
}

export default Home
