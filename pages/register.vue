<template>
  <div class="page-container">
    <div class="container">
      <router-link to="/" class="logo">
        <img src="./Logo 2.png" alt="BuildUp Logo" />
      </router-link>
      <h2>Register/Sign Up here</h2>
      <form id="registerForm" @submit.prevent="register">
        <div class="form-group">
          <input type="email" v-model="email" placeholder="Email" required />
        </div>
        <div class="form-group">
          <input type="password" v-model="password" placeholder="Password" required />
        </div>
        <div class="form-group">
          <button type="submit">Register</button>
        </div>
      </form>
      <div class="login-link">
        <p>Already have an account? <router-link to="/login">Login.</router-link></p>
      </div>
      <div class="home-link">
        <p><router-link to="/">Back to Home</router-link></p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useNuxtApp } from '#app';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

const email = ref('');
const password = ref('');
const router = useRouter();
const { $firebase } = useNuxtApp();

const register = async () => {
  try {
    const auth = $firebase.auth;
    const db = $firebase.db;

    // Create a new user with email and password
    const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value);
    const user = userCredential.user;

    if (user) {
      // Save user information to Firestore
      await setDoc(doc(db, 'users', user.uid), {
        email: email.value,
        createdAt: new Date().toISOString()
      });

      // Redirect to the workout page after successful registration
      router.push('/workout');
    } else {
      alert('Failed to sign up. Please try again.');
    }
  } catch (error) {
    console.error('Signup error:', error);
    alert('Signup error: ' + error.message);
  }
};
</script>

<style scoped>
body, html {
  height: 100%;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
}

.page-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

.container {
  background-color: #af6f01; /* Sienna */
  width: 60%;
  max-width: 600px;
  padding: 50px;
  border-radius: 25px;
  border: 3px solid #5e93d3; /* SlateBlue */
  position: relative;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.container:before,
.container:after {
  content: "";
  position: absolute;
  top: -19px;
  left: -20px;
  right: -20px;
  bottom: -19px;
  border-radius: 25px;
  border: 10px solid #af6f01; /* SkyBlue */
  pointer-events: none;
}

.logo {
  display: flex;
  font-size: 25px;
  font-weight: bold;
  font-family: 'Abril Fatface';
  color: #ffffff;
  width: 230px;
  height: 115px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin: auto;
}

.logo img {
  max-width: 100%;
}

h2 {
  text-align: center;
  color: white;
}

.form-group {
  display: flex;
  margin-bottom: 15px;
  justify-content: center;
  align-items: center;
}

.form-group input {
  width: 50%;
  padding: 10px;
  border: none;
  border-radius: 5px;
}

.form-group button {
  width: 40%;
  padding: 10px;
  background-color: #4682b4; /* SteelBlue */
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.form-group button:hover {
  background-color: #4169e1; /* RoyalBlue */
}

.login-link {
  text-align: center;
  margin-top: 20px;
}

.login-link a {
  color: blue;
  text-decoration: none;
}

.login-link a:hover {
  text-decoration: underline;
}

.home-link {
  text-align: center;
  margin-top: 10px;
}

.home-link a {
  color: blue;
  text-decoration: none;
}

.home-link a:hover {
  text-decoration: underline;
}
</style>
