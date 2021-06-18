import firebase from "firebase";

var firebaseConfig = {
    apiKey: "AIzaSyCMb0GZJ4eKqHZCPiSeu4vIQw460nRyOAw",
    authDomain: "test12-873e4.firebaseapp.com",
    projectId: "test12-873e4",
    storageBucket: "test12-873e4.appspot.com",
    messagingSenderId: "141332525524",
    appId: "1:141332525524:web:98baa52a51251b225ae641"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export { firebase };