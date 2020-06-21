import app from 'firebase';

const config = {
    apiKey: "AIzaSyBS1J2BWme3UyjG1F1XPaY1A4_eQ5d0oTg",
    authDomain: "fantasy-bet-football.firebaseapp.com",
    databaseURL: "https://fantasy-bet-football.firebaseio.com",
    projectId: "fantasy-bet-football",
    storageBucket: "fantasy-bet-football.appspot.com",
    messagingSenderId: "21574442594",
    appId: "1:21574442594:web:1579bb86a2e4251cb9bb3b",
    measurementId: "G-CZRVZKMQ15"
};

class Firebase {
    constructor() {
        app.initializeApp(config);
    }
}

export default Firebase;