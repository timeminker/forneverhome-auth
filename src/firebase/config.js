import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

//The config we copied from firebase(Replace with your config)
const firebaseConfig = {
  apiKey: "AIzaSyCZzlFmYZKjmTfbuhzNhbu7-GTdGb76QOE",
  authDomain: "fornever-home.firebaseapp.com",
  databaseURL: "https://fornever-home-default-rtdb.firebaseio.com",
  projectId: "fornever-home",
  storageBucket: "fornever-home.appspot.com",
  messagingSenderId: "921152193556",
  appId: "1:921152193556:web:5bfad8c5c23151729dd301"
};

//initialize the firebase app
initializeApp(firebaseConfig)

//initialize firebase auth
const auth = getAuth()

//export the auth object
export { auth }
