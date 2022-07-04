<template>
  <h2>Register</h2>
  <div class="register-form">
    <form @submit.prevent="Register">
      <input type="text" placeholder="Email" v-model="email"/>
      <input type="password" placeholder="Password" v-model="password"/>
      <input type="submit" value="Register">
      <p>Have an account? <button @click="$router.push('/login')">Login Here</button></p>
    </form>
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




    const Register = () => {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email.value, password.value)
        .then(user => {
          alert(user.email);
        })
        .catch(err => alert(err.message));
    }

    return {
      Register,
      email,
      password
    }
  }
}
</script>

<style>
</style>
