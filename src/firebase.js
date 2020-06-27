// import * as firebase from "firebase"

// // Your web app's Firebase configuration
// var firebaseConfig = {
//     apiKey: "AIzaSyAZ-vMZkB-kcZ9mBWi0pBbXdBCXQSgPD7c",
//     authDomain: "fantasy-bet-football-c2676.firebaseapp.com",
//     databaseURL: "https://fantasy-bet-football-c2676.firebaseio.com",
//     projectId: "fantasy-bet-football-c2676",
//     storageBucket: "fantasy-bet-football-c2676.appspot.com",
//     messagingSenderId: "699773943172",
//     appId: "1:699773943172:web:42c5e08c67b85768f131d1"
// };
// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);


// export default firebase

const firebase = require("firebase");
require("firebase/firestore");
//required for sideeffects

firebase.initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: "fantasy-bet-football-c2676",
    storageBucket: "fantasy-bet-football-c2676.appspot.com",
    messagingSenderId: "699773943172",
    appId: "1:699773943172:web:42c5e08c67b85768f131d1"
});

var db = firebase.firestore();

export default db;
