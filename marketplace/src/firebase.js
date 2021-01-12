import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyAohgZBgN8KMNlAh_59okiN3uzqZZTmqlU",
    authDomain: "creeando-marketplace.firebaseapp.com",
    databaseURL: "https://creeando-marketplace.firebaseio.com",
    projectId: "creeando-marketplace",
    storageBucket: "creeando-marketplace.appspot.com",
    messagingSenderId: "376383756584",
    appId: "1:376383756584:web:603f7eaa51d1306a1dd81d",
    measurementId: "G-RR1QE9G4RC"
  };

  firebase.initializeApp(firebaseConfig);


  export const auth = firebase.auth();
  export const googleAuthProvider = new firebase.auth.GoogleAuthProvider(); 