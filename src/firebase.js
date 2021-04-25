import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyAiE0BgnHPoEQBzQnmMhrIOoSlVjkwaBuU",
    authDomain: "anime-recommendation-c040c.firebaseapp.com",
    projectId: "anime-recommendation-c040c",
    storageBucket: "anime-recommendation-c040c.appspot.com",
    messagingSenderId: "213865176281",
    appId: "1:213865176281:web:4109f9796070b8209a72c8",
    measurementId: "G-1EYR5SNTEP"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig)

const auth = firebaseApp.auth();

const storage = firebase.storage();

export {auth,storage}