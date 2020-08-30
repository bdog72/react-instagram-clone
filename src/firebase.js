//
//

import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyCy25tBU0XNp0ZvE53SK5SpHFMSTGGEk2A',
  authDomain: 'instagram-clone-react-4620b.firebaseapp.com',
  databaseURL: 'https://instagram-clone-react-4620b.firebaseio.com',
  projectId: 'instagram-clone-react-4620b',
  storageBucket: 'instagram-clone-react-4620b.appspot.com',
  messagingSenderId: '842084517723',
  appId: '1:842084517723:web:e774fb5c5d4667fd267c7e',
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
