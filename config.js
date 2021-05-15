import * as firebase from 'firebase'
require('@firebase/firestore')

 var firebaseConfig = {
    apiKey: "AIzaSyDKVtxz_IfZsigmA8orkMYShgQm6qIvSqw",
    authDomain: "willyapp-819f3.firebaseapp.com",
    databaseURL: "https://willyapp-819f3-default-rtdb.firebaseio.com",
    projectId: "willyapp-819f3",
    storageBucket: "willyapp-819f3.appspot.com",
    messagingSenderId: "226101201725",
    appId: "1:226101201725:web:82f3707ec8fdeaa84cd354"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);



export default firebase.firestore();