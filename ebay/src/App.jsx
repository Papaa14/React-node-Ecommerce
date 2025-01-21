import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Assuming you're using axios for API calls

function PostList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:9091/notes'); // Replace with your API endpoint
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <h1>Post List</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}> 
            <h3>{post.title}</h3> 
            <p>{post.contents}</p> 
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PostList;