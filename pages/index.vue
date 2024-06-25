<!-- pages/index.vue -->
<template>
  <div class="home-page">
    <h1>Selamat Datang di Aplikasi Olahraga di Rumah</h1>
    <p>Silakan pilih untuk mendaftar atau masuk ke akun Anda:</p>
    <div class="buttons">
      <button @click="navigateTo('register')">Register</button>
      <button @click="navigateTo('login')">Login</button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    navigateTo(page) {
      this.$router.push(`/${page}`);
    }
  }
}
</script>

<style scoped>
.home-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
}

.buttons {
  display: flex;
  gap: 20px;
  margin-top: 20px;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}
</style>
