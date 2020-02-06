import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Firebase, { FirebaseContext } from './components/Firebase';
import * as serviceWorker from './serviceWorker';

// import firebaseConfig from './components/Firebase/firebaseConfig';
// const firebase = require('firebase');
// require('firebase/firestore');
// require('firebase/auth');

// firebase.initializeApp(firebaseConfig);
// firebase.analytics();

ReactDOM.render(
  <FirebaseContext.Provider value={new Firebase()}>
    <App />
  </FirebaseContext.Provider>,
  document.getElementById('quick-recipes-container')
);

serviceWorker.unregister();
