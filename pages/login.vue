<template>
  <div class="page-container">
    <div class="container">
      <router-link to="/" class="logo">
        <img src="./Logo 2.png" alt="BuildUp Logo" />
      </router-link>
      <h2>Sign In here</h2>
      <form id="loginForm" @submit.prevent="login">
        <div class="form-group">
          <input type="text" v-model="email" placeholder="Email" required />
        </div>
        <div class="form-group">
          <input type="password" v-model="password" placeholder="Password" required />
        </div>
        <div class="form-group">
          <button type="submit">Sign In</button>
        </div>
      </form>
      <div class="register-link">
        <p>Don't have an account? <router-link to="/register">Sign Up.</router-link></p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useNuxtApp } from '#app';
import { signInWithEmailAndPassword } from 'firebase/auth'; // Import Firebase auth
import { doc, updateDoc } from 'firebase/firestore'; // Import Firestore functions

const email = ref('');
const password = ref('');
const router = useRouter();
const { $firebase } = useNuxtApp();

const login = async () => {
  try {
    // Log in user with email and password
    const auth = $firebase.auth;
    const db = $firebase.db;
    const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value);
    const user = userCredential.user;

    if (user) {
      // Update last login timestamp in Firestore
      await updateDoc(doc(db, 'users', user.uid), {
        lastLogin: new Date().toISOString()
      });

      // Store user data in localStorage to persist login
      localStorage.setItem('user', JSON.stringify(user));

      // Redirect to the workout page
      router.push('/workout');
    }
  } catch (error: any) {
    console.error('Login error:', error.message);
    alert('Login error: ' + error.message);
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
  flex-direction: column;
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

.register-link {
  text-align: center;
  margin-top: 20px;
}

.register-link a {
  color: blue;
  text-decoration: none;
}

.register-link a:hover {
  text-decoration: underline;
}
</style>
