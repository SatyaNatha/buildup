<template>
  <div class="container">
    <a href="login.vue" class="logo">
      <img src="Logo 2.png" alt="BuildUp Logo" />
    </a>
    <h2>Register/Sign Up here</h2>
    <form id="registerForm" @submit.prevent="handleSubmit">
      <div class="form-group">
        <input type="text" v-model="username" placeholder="Username" required />
      </div>
      <div class="form-group">
        <input type="password" v-model="password" placeholder="Password" required />
      </div>
      <div class="form-group">
        <input type="password" v-model="confirmPassword" placeholder="Confirm Password" required />
      </div>
      <div class="form-group">
        <button type="submit">Register</button>
      </div>
    </form>
    <div class="login-link">
      <p>Already have an account? <a href="login.vue">Login.</a></p>
    </div>
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
body {
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
}
.container {
  background-color: #af6f01; /* Sienna */
  width: 60%;
  height: 70%;
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
  pointer-events: none; /* Tambahkan baris ini */
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
</style>
