<template>
  <div class="register-container">
    <h1>Register</h1>
    <form @submit.prevent="register">
      <input v-model="fullName" type="text" placeholder="Full Name" required />
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit">Register</button>
    </form>
    <p>Already have an account? <nuxt-link to="/login">Login here</nuxt-link></p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useNuxtApp } from '#app';
import { createUserWithEmailAndPassword } from 'firebase/auth'; // Import modul yang benar dari Firebase
import { doc, setDoc } from 'firebase/firestore'; // Import fungsi Firestore

const fullName = ref('');
const email = ref('');
const password = ref('');
const router = useRouter();
const { $firebase } = useNuxtApp();

const register = async () => {
  try {
    const auth = $firebase.auth;
    const db = $firebase.db;

    // Buat user baru dengan email dan password
    const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value);
    const user = userCredential.user;

    if (user) {
      // Simpan informasi user ke Firestore
      await setDoc(doc(db, 'users', user.uid), {
        fullName: fullName.value,
        email: email.value,
        createdAt: new Date().toISOString() // Timestamp untuk pendaftaran
      });

      // Redirect ke halaman login setelah berhasil register
      router.push('/login');
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
.register-container {
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
