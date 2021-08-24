import firebase from 'firebase/app'

import "firebase/auth";
import "firebase/database";

// Initialize Firebase
const config = {
  apiKey: "AIzaSyD4Dp_4UZ8dU7owrpRWvwcOB3yxqvu1HRw",
  authDomain: "expo-realtime-firebase-map.firebaseapp.com",
  projectId: "expo-realtime-firebase-map",
  storageBucket: "expo-realtime-firebase-map.appspot.com",
  messagingSenderId: "80840279392",
  appId: "1:80840279392:web:156f01ba10ccb45a35ca05",
  measurementId: "G-6WPVK531MH",
  databaseURL: "https://expo-realtime-firebase-map-default-rtdb.firebaseio.com/",
};

const firebaseApp = firebase.initializeApp(config);
export default firebaseApp;
