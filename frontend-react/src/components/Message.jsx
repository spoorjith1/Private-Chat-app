import React from 'react'

function Message({ message, isMine }) {
  return (
    <div className={`message-row ${isMine ? 'mine' : 'other'}`}>
      <div className={`message-bubble ${isMine ? 'mine' : 'other'}`}>
        {message.message}
      </div>
    </div>
  )
}

export default Message