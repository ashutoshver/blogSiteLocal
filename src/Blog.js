import React, { useState, useEffect } from 'react';

const Blog = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [posts, setPosts] = useState(JSON.parse(localStorage.getItem('posts')) || []);
  const [newPost, setNewPost] = useState('');
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    const storedUserName = localStorage.getItem('userName');
    if (storedUserName) {
      setIsLoggedIn(true);
      setUserName(storedUserName);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('userName', userName);
    localStorage.setItem('posts', JSON.stringify(posts));
  }, [userName, posts]);

  const handleLogin = (event) => {
    event.preventDefault();
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName('');
  };

  const handleNewPost = (event) => {
    event.preventDefault();
    const newPosts = [...posts, { userName, post: newPost, comments: [] }];
    setPosts(newPosts);
    setNewPost('');
  };

  const handleNewComment = (event, index) => {
    event.preventDefault();
    const newComments = [...posts[index].comments, { userName, comment: newComment }];
    const updatedPosts = [...posts];
    updatedPosts[index] = { ...updatedPosts[index], comments: newComments };
    setPosts(updatedPosts);
    setNewComment('');
  };

  return (
    <div>
      {isLoggedIn ? (
        <div className='mainPage'>
          <div className='header'>
            <header>
              <h2>Welcome, {userName}!</h2>
              <button onClick={handleLogout}>Logout</button>
            </header>
          </div>

          <form onSubmit={handleNewPost}>
            <div className='addpost'>
              <textarea placeholder='write post...' value={newPost} onChange={(event) => setNewPost(event.target.value)} required/>
              <button type="submit">Add Post</button>
            </div>
          </form>
          <hr />
          <h2>Posts</h2>

          {posts.map((post, index) => (
            <div className='post' key={index}>
              <div className='name'>
                <h5>{post.userName}:</h5>
                <p>{post.post}</p>
              </div>
              <form onSubmit={(event) => handleNewComment(event, index)}>
                <textarea placeholder='write a comments...' value={newComment} onChange={(event) => setNewComment(event.target.value)} required/>
                <button type="submit">Add Comment</button>
              </form>
              <div className='allComments'>
                <h4>Comments</h4>
                
                {post.comments.map((comment, commentIndex) => (
                  <div className='comment' key={commentIndex}>
                  
                    <h5>{comment.userName}:</h5>
                    <p>{comment.comment}</p>
                    
                  </div>

                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className='loginpage'>
          <h1>Login</h1>
          <form onSubmit={handleLogin}>
            <label htmlFor="username">Enter Your Username</label>
            <input placeholder='Enter your name...' type="text" name="username" value={userName} onChange={(event) => setUserName(event.target.value)} required/>
            <button type="submit">Login</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Blog;