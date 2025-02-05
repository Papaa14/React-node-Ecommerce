import React, { useState } from 'react';
import axios from '../components/axios';
import './../styles/message.css';

function CreateMessage({ onMessageCreated }) {
  const [message, setMessage] = useState('');
  const user = JSON.parse(localStorage.getItem("user")) || {};
 

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/messages', {
      name: user.username,
      email: user.email,
      messageContent: message
    },{
      headers: {
          'Content-Type': 'application/json',
      },
  })
      .then(res => {
        onMessageCreated(res.data);
        setMessage('');
      })
      .catch(console.error);
  };

  return (
    <form onSubmit={handleSubmit} className="create-message-form">
      <textarea
        placeholder="Write your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
      />
      <button type="submit">Send Message</button>
    </form>
  );
}

export default CreateMessage;