import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyD0Z7BakF15-0fjMF4kVQqoeN38JTOftk8",
    authDomain: "crwn-db-b19de.firebaseapp.com",
    databaseURL: "https://crwn-db-b19de.firebaseio.com",
    projectId: "crwn-db-b19de",
    storageBucket: "crwn-db-b19de.appspot.com",
    messagingSenderId: "180832326281",
    appId: "1:180832326281:web:30eef72059a15d09c56c58",
    measurementId: "G-RPC1FDXDHH"
  };

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if(!snapShot.exists) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();

      try {
        await userRef.set({
            displayName,
            email,
            createdAt,
            ...additionalData
          })
        } catch(error) {
          console.log('error creating user', error.message);
        }

    }

    return userRef;
  }

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;