import React, { useEffect, useState, useContext, useRef } from 'react'
import { useParams } from 'react-router-dom'
import axiosInstance from '../axiosInstance'
import Message from '../components/Message'
import { AuthContext } from '../AuthProvider'
import { useNavigate } from 'react-router-dom'

function ChatPage() {
  const { id } = useParams()
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { user } = useContext(AuthContext)
  const [conversation, setConversation] = useState(null)
  const navigate = useNavigate()

  const fetchMessages = async () => {
    try {
      setLoading(true)
      const response = await axiosInstance.get(`/messages/${id}/`)
      setMessages(response.data.results)
    }
    catch (error) {
      setError('Failed to load messages')
    }
    finally {
      setLoading(false)
    }
  }

  const fetchConversation = async () => {
    const response = await axiosInstance.get(`/chat/details/${id}/`)
    setConversation(response.data)
  }

  useEffect(() => {
    fetchMessages()
    fetchConversation()
  }, [id])

  const sendMessage = async (e) => {
    e.preventDefault()
    if (!newMessage.trim()) {
      return
    }
    try {
      await axiosInstance.post(`/message/${id}/`, {message: newMessage})
      setNewMessage('')
      fetchMessages()
    }
    catch (error) {
      setError('Failed to send message')
    }
  }
  if (loading) {
    return <div className='page-container'>Loading...</div>
  }

  console.log(messages)
  return (
    <div className='page-container chat-page'>
      {error && <div>{error}</div>}

      <div className='chat-header' onClick={()=> navigate(`/user/${conversation.user_id}`)}>
        <img src={`http://127.0.0.1:8000${conversation?.profile_pic}`} alt='profile' className='chat-profile-pic'/>
        <h3 className='chat-username'>{conversation?.username}</h3>
      </div>

      <div className='messages-container'>
        {messages.length === 0 ? (
          <div className='no-messages-msg'>Say Hi 👋</div>
        ) : (
          messages.map((message) => (
              <Message key={message.id} message={message} isMine={ message.sender === user?.id }/>
          ))
        )}
      </div>

      <div className='type-chat-box'>
        <form onSubmit={sendMessage} className='chat-form'>
          <input type='text' value={newMessage} onChange={(e) =>setNewMessage(e.target.value)} placeholder='Type a message...' className='chat-input'/>
          <button type='submit' className='chat-send-btn'>Send</button>
        </form>
      </div>
    </div>
  )
}

export default ChatPage