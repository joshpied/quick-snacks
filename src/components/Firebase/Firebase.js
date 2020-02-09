import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import firebaseConfig from './firebaseConfig';

class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);
    this.auth = app.auth();
    this.db = app.firestore();
    this.fieldValue = app.firestore.FieldValue;
  }

  /** Auth */
  createUser = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  signIn = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  signOut = () => this.auth.signOut();

  resetPassword = email => this.auth.sendPasswordResetEmail(email);

  updatePassword = password => this.auth.currentUser.updatePassword(password);

  /** Users */
  user = uid => this.db.doc(`users/${uid}`);

  users = () => this.db.doc('users');

  /** Recipes */
  // get recipes belonging to logged in user
  recipes = userId =>
    this.db.collection('recipes').where('userId', '==', userId);

  recipe = recipeId => this.db.doc(`recipes/${recipeId}`);
}

export default Firebase;
