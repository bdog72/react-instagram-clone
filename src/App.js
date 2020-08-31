//
//
import React, { useState, useEffect } from 'react';
import './App.css';

import Post from './Post';
import { db } from './firebase';

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    db.collection('posts').onSnapshot((snapshot) => {
      setPosts(snapshot.docs.map((doc) => ({ id: doc.id, post: doc.data() })));
    });
  }, []);

  return (
    <div className='app'>
      <div className='app__header'>
        <img
          className='app__headerImage'
          src='https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png'
          alt='instagram'
        />
      </div>
      {posts.map(({ post, id }) => (
        <Post
          username={post.username}
          caption={post.caption}
          imageUrl={post.imageUrl}
          alt={post.alt}
        />
      ))}
    </div>
  );
}

export default App;

// {
//   username: 'Test1',
//   caption: 'Beagle Pic 1',
//   imageUrl:
//     'https://images.pexels.com/photos/2305001/pexels-photo-2305001.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
//   alt: '1',
// },
// {
//   username: 'Test2',
//   caption: 'Beagle Pic 2',
//   imageUrl:
//     'https://images.pexels.com/photos/1031431/pexels-photo-1031431.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
//   alt: '2',
// },
// {
//   username: 'Test3',
//   caption: 'Beagle Pic 3',
//   imageUrl:
//     'https://images.pexels.com/photos/4084420/pexels-photo-4084420.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
//   alt: '3',
// },
