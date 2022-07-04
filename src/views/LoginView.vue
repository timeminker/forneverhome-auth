<template>
  <div class="login">
    <h3>Welcome to</h3>
    <h1>For Never Home</h1>
    <h3><i>A Forever Home for your pet in the afterlife.</i></h3>
    <div class="login-form">
      <form @submit.prevent="Login">
        <input type="text" placeholder="Email" v-model="email"/>
        <input type="password" placeholder="Password" v-model="password"/>
        <input type="submit" value="Login">
      </form>
    </div>
    <p>Need an account? <button @click="$router.push('/register')">Register Here</button></p>
  </div>
</template>

<script>
import {ref} from 'vue';
import firebase from 'firebase/compat/app';
import "firebase/compat/auth";

export default {
  setup() {
    const email = ref('');
    const password = ref('');

    const Login = () => {
      firebase
        .auth()
        .signInWithEmailAndPassword(email.value, password.value)
        .then(data => console.log(data))
        .catch(err => alert(err.message))
    }
    return {
      Login,
      email,
      password
    }
  }
}
</script>

<style>
@import '../assets/base.css';
</style>
