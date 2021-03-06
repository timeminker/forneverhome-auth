import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCZzlFmYZKjmTfbuhzNhbu7-GTdGb76QOE",
  authDomain: "fornever-home.firebaseapp.com",
  databaseURL: "https://fornever-home-default-rtdb.firebaseio.com",
  projectId: "fornever-home",
  storageBucket: "fornever-home.appspot.com",
  messagingSenderId: "921152193556",
  appId: "1:921152193556:web:5bfad8c5c23151729dd301"
};

firebase.initializeApp(firebaseConfig)

createApp(App).use(router).mount('#app')
