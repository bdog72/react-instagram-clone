//
//
import React, { useState, useEffect } from 'react';
import './App.css';

import Post from './Post';
import { makeStyles } from '@material-ui/core/styles';

import { db } from './firebase';
import { Modal, Button, Input } from '@material-ui/core';

import { auth } from './firebase';
import ImageUpload from './ImageUpload';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [posts, setPosts] = useState([]);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // console.log(authUser);
        setUser(authUser);
      } else {
        setUser(null);
      }
    });
    return () => {
      unsubscribe();
    };
  }, [user, username]);

  useEffect(() => {
    db.collection('posts').onSnapshot((snapshot) => {
      setPosts(snapshot.docs.map((doc) => ({ id: doc.id, post: doc.data() })));
    });
  }, []);

  const signUp = (event) => {
    event.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username,
        });
      })
      .catch((error) => alert(error.message));

    setOpen(false);
  };

  const signIn = (event) => {
    event.preventDefault();

    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message));

    setOpenSignIn(false);
  };

  return (
    <div className='app'>
      <ImageUpload />

      {/* ***** - Modal - ***** */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className='app__signup'>
            <center>
              <img
                className='app__headerImage'
                src='https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png'
                alt='instagram'
              />
            </center>
            <Input
              placeholder='username'
              type='text'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              placeholder='email'
              type='text'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder='password'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type='submit' onClick={signUp}>
              Sign Up
            </Button>
          </form>
        </div>
      </Modal>
      {/* ***** - End Of Modal - ***** */}

      {/* ***** - Modal - ***** */}
      <Modal open={openSignIn} onClose={() => setOpenSignIn(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className='app__signup'>
            <center>
              <img
                className='app__headerImage'
                src='https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png'
                alt='instagram'
              />
            </center>

            <Input
              placeholder='email'
              type='text'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder='password'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type='submit' onClick={signIn}>
              Sign In
            </Button>
          </form>
        </div>
      </Modal>
      {/* ***** - End Of Modal - ***** */}

      {/* ////////// */}
      <div className='app__header'>
        <img
          className='app__headerImage'
          src='https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png'
          alt='instagram'
        />
      </div>
      <center>
        <p>test1</p>
        <p>test1@gmail.com</p>
        <p>test1234</p>
        <p>---------------</p>
      </center>
      <center>
        <p>test2</p>
        <p>test2@gmail.com</p>
        <p>test1234</p>
      </center>

      {user ? (
        <Button onClick={() => auth.signOut()}>Logout</Button>
      ) : (
        <div className='app__loginContainer'>
          <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
          <Button onClick={() => setOpen(true)}>Sign Up</Button>
        </div>
      )}

      {/* ////////// */}

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
