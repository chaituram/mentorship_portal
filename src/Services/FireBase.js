import firebase from 'firebase';
import 'firebase/firestore';

firebase.initializeApp({
    apiKey: "AIzaSyACrZJeMBxIm9A1sjFQwInyd8fqq9WdMkg",
    authDomain: "mentor-ship-portal-3c07a.firebaseapp.com",
    databaseURL: "https://mentor-ship-portal-3c07a.firebaseio.com",
    projectId: "mentor-ship-portal-3c07a",
    storageBucket: "mentor-ship-portal-3c07a.appspot.com",
    messagingSenderId: "802136624919",
    appId: "1:802136624919:web:ee58bf3d116c186a197152"
});
// Initialize Firebase
let db = firebase.firestore();


export default {
    firebase, db
}