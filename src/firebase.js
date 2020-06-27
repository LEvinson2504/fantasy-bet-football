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
