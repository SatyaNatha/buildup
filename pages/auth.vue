<!-- pages/auth.vue -->
<template>
    <div>
      <h2>{{ isRegistering ? 'Register' : 'Login' }}</h2>
      <form @submit.prevent="handleSubmit">
        <input type="email" v-model="email" placeholder="Email" required />
        <input type="password" v-model="password" placeholder="Password" required />
        <button type="submit">{{ isRegistering ? 'Register' : 'Login' }}</button>
      </form>
      <button @click="toggleAuthMode">
        {{ isRegistering ? 'Switch to Login' : 'Switch to Register' }}
      </button>
    </div>
  </template>
  
  <script>
  import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
  
  export default {
    data() {
      return {
        email: '',
        password: '',
        isRegistering: false
      }
    },
    methods: {
      toggleAuthMode() {
        this.isRegistering = !this.isRegistering;
      },
      handleSubmit() {
        const auth = getAuth();
        if (this.isRegistering) {
          createUserWithEmailAndPassword(auth, this.email, this.password)
            .then(userCredential => {
              console.log('User registered:', userCredential.user);
              this.$router.push('/');
            })
            .catch(error => {
              console.error('Error registering:', error);
            });
        } else {
          signInWithEmailAndPassword(auth, this.email, this.password)
            .then(userCredential => {
              console.log('User logged in:', userCredential.user);
              this.$router.push('/');
            })
            .catch(error => {
              console.error('Error logging in:', error);
            });
        }
      }
    }
  }
  </script>
  