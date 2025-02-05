import React, { useEffect, useState } from 'react';
import axios from '../components/axios';
import './../styles/messages.css';
import CreateMessage from './message';

function MessagesPage() {
  const [messages, setMessages] = useState([]);
  const [newReply, setNewReply] = useState('');
  const user = JSON.parse(localStorage.getItem("user")) || {};

  // Function to format date safely
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date) 
      ? date.toLocaleString()
      : 'Just now';
  };

  // Polling for real-time updates
  useEffect(() => {
    // Initial fetch
    fetchMessages();

    // Set up polling interval (every 5 seconds)
    const interval = setInterval(() => {
      fetchMessages();
    }, 5000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await axios.get('/messages');
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const handleReply = async (messageId) => {
    try {
      const response = await axios.post(`/messages/${messageId}/reply`, { 
        reply: newReply,
        reply_date: new Date().toISOString() // Ensure we send a properly formatted date
      });

      // Update the messages state with the response from the server
      setMessages(messages.map(msg =>
        msg.id === messageId 
          ? { 
              ...msg, 
              reply: newReply,
              reply_date: new Date().toISOString()
            } 
          : msg
      ));
      setNewReply('');
      
      // Fetch latest messages to ensure synchronization
      fetchMessages();
    } catch (error) {
      console.error('Error sending reply:', error);
    }
  };

  const handleNewMessage = (newMessage) => {
    // Add created_at if it's not provided by the server
    const messageWithDate = {
      ...newMessage,
      created_at: newMessage.created_at || new Date().toISOString()
    };
    
    // Add the new message to the beginning of the list
    setMessages(prevMessages => [messageWithDate, ...prevMessages]);
    
    // Fetch latest messages to ensure synchronization
    fetchMessages();
  };

  return (
    <div className="page-container">
      <div className="messages-section">
        <h2>Messages</h2>
        <div className="messages-container">
          {messages.map(message => (
            <div key={message.id} className="message-card">
              <div className="message-header">
               
                <small>{formatDate(message.created_at)}</small>
              </div>
              <p>{message.message}</p>
              {message.reply && (
                <div className="admin-reply">
                  <strong>Admin Response:</strong>
                  <p>{message.reply}</p>
                  <small>{formatDate(message.reply_date)}</small>
                </div>
              )}
              {user.type === 'admin' && !message.reply && (
                <div className="reply-section">
                  <textarea
                    value={newReply}
                    onChange={(e) => setNewReply(e.target.value)}
                    placeholder="Write a reply..."
                  />
                  <button onClick={() => handleReply(message.id)}>
                    Send Reply
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="create-message-section">
        <CreateMessage onMessageCreated={handleNewMessage} />
      </div>
    </div>
  );
}

export default MessagesPage;