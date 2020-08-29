//
//

import React from 'react';
import './App.css';
import Post from './Post';

function App() {
  return (
    <div className='app'>
      <div className='app__header'>
        <img
          className='app__headerImage'
          src='https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png'
          alt='instagram'
        />
      </div>
      <Post
        username='Bozo Boy'
        caption='WOW it works'
        imageURL='https://images.pexels.com/photos/879788/pexels-photo-879788.jpeg?cs=srgb&dl=pexels-artem-beliaikin-879788.jpg&fm=jpg'
      />
      <Post
        username='Bozo Dog'
        caption='What up Dog'
        imageURL='https://images.pexels.com/photos/879788/pexels-photo-879788.jpeg?cs=srgb&dl=pexels-artem-beliaikin-879788.jpg&fm=jpg'
      />
      <Post
        username='Bozo Girl'
        caption='What Up Girl'
        imageURL='https://images.pexels.com/photos/879788/pexels-photo-879788.jpeg?cs=srgb&dl=pexels-artem-beliaikin-879788.jpg&fm=jpg'
      />
    </div>
  );
}

export default App;
