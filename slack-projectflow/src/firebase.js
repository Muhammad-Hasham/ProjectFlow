import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDSxMnmhukNHljEA9T-NYWhbPiBB_Jufuk",
    authDomain: "slack-projectflow.firebaseapp.com",
    projectId: "slack-projectflow",
    storageBucket: "slack-projectflow.appspot.com",
    messagingSenderId: "858789895868",
    appId: "1:858789895868:web:628351af4150e6ae667ab9",
    measurementId: "G-RTF2P2W9EZ"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export { auth, provider, db };