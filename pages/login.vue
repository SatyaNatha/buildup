<template>
  <div class="login-container">
    <h1>Login</h1>
    <form @submit.prevent="login">
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
    <p>Don't have an account? <nuxt-link to="/register">Register here</nuxt-link></p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
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
    if (!validateEmail(email.value) || !validatePassword(password.value)) {
      alert('Invalid email or password (min. 6 characters)');
      return;
    }

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

const validateEmail = (email: string) => /^[^@]+@\w+(\.\w+)+\w$/.test(email);
const validatePassword = (password: string) => password.length >= 6;

// Check if user is already logged in (auto-login on page refresh)
onMounted(() => {
  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    const user = JSON.parse(storedUser);
    if (user && user.uid) {
      router.push('/workout');
    }
  }
});
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: auto;
  padding: 1rem;
  text-align: center;
}
form input {
  display: block;
  width: 100%;
  margin-bottom: 1rem;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}
form button {
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
form button:hover {
  background-color: #0056b3;
}
</style>
