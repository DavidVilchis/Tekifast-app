import firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDxJhQ-qNpnN-3RmDQEdFcDML35mXSxYaI",
    authDomain: "tekifast-bd.firebaseapp.com",
    projectId: "tekifast-bd",
    storageBucket: "tekifast-bd.appspot.com",
    messagingSenderId: "386106870388",
    appId: "1:386106870388:web:b81b919469d5e4a3fddf21"
  };

let app;
if (firebase.apps.length === 0){
    app = firebase.initializeApp(firebaseConfig);
}
else{
    app = firebase.app();
}
const db = firebase.firestore();
const auth = firebase.auth();

export{firebase, db, auth}